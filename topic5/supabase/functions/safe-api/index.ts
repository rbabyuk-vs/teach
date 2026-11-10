import postgres from 'npm:postgres@3.4.7';

const databaseUrl = Deno.env.get('SAFE_DATABASE_URL');
const sql = databaseUrl ? postgres(databaseUrl, { max: 1, prepare: false }) : null;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, X-Client-Info',
  'Cache-Control': 'no-store',
};

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { ...headers, ...extra } });
}

function error(status: number, name: string, extra?: Record<string, string>) {
  return json({ error: name }, status, extra);
}

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const iso = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/i;
function validDate(value: string) {
  const parts = value.match(iso);
  if (!parts) return false;
  const [, y, m, d, h, min, sec, zone] = parts;
  const year = Number(y), month = Number(m), day = Number(d);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1] &&
    Number(h) <= 23 && Number(min) <= 59 && Number(sec) <= 59 &&
    (zone.toUpperCase() === 'Z' || (Number(zone.slice(1, 3)) <= 23 && Number(zone.slice(4)) <= 59)) &&
    Number.isFinite(Date.parse(value));
}
const validCode = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9]{3}$/.test(value) && new Set(value).size === 3;
const length = (value: string) => Array.from(value).length;

async function bodyObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body !== null && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  const path = new URL(request.url).pathname.replace(/^\/functions\/v1\/safe-api(?=\/|$)/, '').replace(/^\/safe-api(?=\/|$)/, '');
  const health = path === '/health';
  const collection = path === '/safes';
  const match = path.match(/^\/safes\/([^/]+)(\/attempts)?$/);
  if (!health && !collection && !match) return error(404, 'NOT_FOUND');
  const allowed = collection || match?.[2] ? 'POST' : 'GET';
  if (request.method !== allowed) return error(405, 'METHOD_NOT_ALLOWED', { Allow: `${allowed}, OPTIONS` });
  if (match && !uuid.test(match[1])) return error(400, 'INVALID_INPUT');

  try {
    if (health) console.log(`[safe-api] health: database secret ${databaseUrl ? 'present' : 'missing'}`);
    if (!sql) throw new Error('Database connection is not configured');
    if (health) {
      console.log('[safe-api] health: connecting to database');
      await sql`select 1`;
      console.log('[safe-api] health: database query succeeded');
      return json({ status: 'ok' });
    }
    if (collection) {
      const body = await bodyObject(request);
      if (!body || typeof body.title !== 'string' || typeof body.message !== 'string' ||
        !validCode(body.code) || typeof body.expiresAt !== 'string' ||
        !validDate(body.expiresAt) ||
        (body.hint !== undefined && typeof body.hint !== 'string')) return error(400, 'INVALID_INPUT');
      const title = body.title.trim();
      if (length(title) < 1 || length(title) > 80 || !body.message.trim() ||
        length(body.message) > 500 || (typeof body.hint === 'string' && length(body.hint) > 160)) {
        return error(400, 'INVALID_INPUT');
      }
      const rows = await sql`
          insert into private.safes (title, hint, message, code, expires_at)
          select ${title}, ${body.hint ?? null}, ${body.message}, ${body.code}, ${body.expiresAt}::timestamptz
          where ${body.expiresAt}::timestamptz > clock_timestamp()
          returning id, title, hint, expires_at`;
      if (!rows.length) return error(400, 'INVALID_INPUT');
      const row = rows[0];
      return json({ id: row.id, title: row.title, ...(row.hint !== null ? { hint: row.hint } : {}), expiresAt: row.expires_at.toISOString() }, 201);
    }

    let guess: string | undefined;
    if (match![2]) {
      const body = await bodyObject(request);
      if (!body || !validCode(body.guess)) return error(400, 'INVALID_INPUT');
      guess = body.guess;
    }

    const result = await sql.begin(async (tx) => {
      const rows = await tx`select id, title, hint, message, code, expires_at from private.safes where id = ${match![1]}::uuid for update`;
      if (!rows.length) return { status: 404, body: { error: 'NOT_FOUND' } };
      const row = rows[0];
      const [time] = await tx`select db_clock.now, db_clock.now >= safes.expires_at as expired
          from private.safes as safes cross join (select clock_timestamp() as now) as db_clock
          where safes.id = ${row.id}`;
      if (time.expired) {
        await tx`delete from private.safes where id = ${row.id}`;
        return { status: 410, body: { error: 'SAFE_BURNED' } };
      }
      if (guess === undefined) {
        return { status: 200, body: { id: row.id, title: row.title, ...(row.hint !== null ? { hint: row.hint } : {}), expiresAt: row.expires_at.toISOString(), serverNow: time.now.toISOString(), status: 'locked' } };
      }
      if (guess === row.code) {
        await tx`delete from private.safes where id = ${row.id}`;
        return { status: 200, body: { status: 'opened', message: row.message } };
      }
      const exact = [...guess].filter((digit, index) => digit === row.code[index]).length;
      const misplaced = [...guess].filter((digit) => row.code.includes(digit)).length - exact;
      return { status: 200, body: { status: 'locked', exact, misplaced } };
    });
    return json(result.body, result.status);
  } catch (cause) {
    const details = cause as { name?: unknown; code?: unknown } | null;
    const name = typeof details?.name === 'string' ? details.name : 'UnknownError';
    const code = typeof details?.code === 'string' ? details.code : 'none';
    console.error(`[safe-api] request failed: name=${name} code=${code}`);
    return error(500, 'INTERNAL_ERROR');
  }
});
