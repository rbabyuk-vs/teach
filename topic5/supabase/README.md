# Safe API

This API runs as a Supabase Edge Function. It stores safes in a private Postgres schema. It does not require user accounts.

Use fictional messages. The three-digit code is a game, not strong security.

## 1. Create a Supabase project

1. Create a project in the [Supabase dashboard](https://supabase.com/dashboard).
2. Save the database password in a password manager.
3. Wait for the project to finish starting.

## 2. Create the database table

In **SQL Editor**, create a query and run:

```sql
create schema if not exists private;

create table private.safes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hint text,
  message text not null,
  code text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
```

In **Settings → Data API**, check that `private` is not in **Exposed schemas**. Do not add it there.

## 3. Create the API database role

Create a new password for this role and save it in a password manager. For these steps, use letters and numbers only. In **SQL Editor**, replace `YOUR_ROLE_PASSWORD` with that password and run:

```sql
create role safe_api with login password 'YOUR_ROLE_PASSWORD';

grant usage on schema private to safe_api;
grant select, insert, delete on table private.safes to safe_api;
grant update (id) on private.safes to safe_api;
```

The last grant lets the function lock a row while it checks an attempt. The function does not change the ID. The SQL Editor may retain the query with the password; do not share it.

## 4. Add the connection secret

1. Click **Connect** in the dashboard.
2. Select **URI** and the **shared transaction pooler**.
3. Copy the connection string into a private temporary note.
4. Change the username from `postgres.PROJECT_REF` to `safe_api.PROJECT_REF`. Keep your project reference.
5. Replace the password placeholder with the password for the `safe_api` role.
6. Make sure the database name at the end is `/postgres`.
7. In **Edge Functions → Secrets**, add the connection string as `SAFE_DATABASE_URL`.

The connection string has this shape:

```text
postgresql://safe_api.PROJECT_REF:ROLE_PASSWORD@POOLER_HOST:6543/postgres
```

Use the pooler host shown in your dashboard. Do not commit the connection string or share it in logs, screenshots, or messages. If the password contains special characters, percent-encode it in the URL.

## 5. Deploy the function

1. Open **Edge Functions → Deploy a new function → Via Editor**.
2. Name the function `safe-api`.
3. Replace the editor contents with the contents of [functions/safe-api/index.ts](functions/safe-api/index.ts).
4. Click **Deploy function**.
5. Open the function's **Details** tab and turn off **Verify JWT**. Save if prompted.

For later updates, copy the updated file into the dashboard editor and click **Deploy updates**. Keep the repository file as the source of truth; the dashboard editor does not provide version control.

## 6. Test the API

Replace `PROJECT_REF` in these examples with your project reference.

Check the function and database connection:

```bash
curl -i 'https://PROJECT_REF.supabase.co/functions/v1/safe-api/health'
```

Expected response: `200` and `{"status":"ok"}`.

Create a safe with a future deadline:

```bash
curl -i -X POST 'https://PROJECT_REF.supabase.co/functions/v1/safe-api/safes' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Test safe","message":"Hello from the safe","code":"047","hint":"A test","expiresAt":"2028-01-01T12:00:00Z"}'
```

The response includes the safe ID. It does not include the code or message. Use a future date if the example deadline has passed.

Read a safe, replacing `SAFE_ID` with that ID:

```bash
curl -i 'https://PROJECT_REF.supabase.co/functions/v1/safe-api/safes/SAFE_ID'
```

Submit a guess:

```bash
curl -i -X POST 'https://PROJECT_REF.supabase.co/functions/v1/safe-api/safes/SAFE_ID/attempts' \
  -H 'Content-Type: application/json' \
  -d '{"guess":"047"}'
```

A correct guess deletes the safe and returns its message once. A later request returns `404`. An expired safe is deleted on the first valid read or attempt after its deadline; that request returns `410`. There is no scheduled cleanup.

The full API contract is in [SPEC.md](../SPEC.md).
