/** ========== CONFIG ==========
 * 1) Встав свій ID родинного календаря (Family)
 *   Google Calendar → Settings → Family → Integrate → Calendar ID
 *   вигляд: family_xxxxx@group.calendar.google.com
 * 2) Один раз задай токен у властивостях скрипта (див. setTokenOnce()).
 */
const FAMILY_CAL_ID = 'REDUCTED@group.calendar.google.com';
const DEFAULT_DAYS_AHEAD = 7;           // скільки днів показувати
const TZ = 'Europe/Kyiv';                // таймзона для форматування
const CACHE_TTL_SECONDS = 60;            // кэш на хвилину для стабільності

// ===== WEATHER CONFIG =====
const LAT = 49.8419;     // Lviv example — set your coords
const LON = 24.0315;
const WEATHER_TZ = TZ;   // reuse 'Europe/Kyiv'
const WEATHER_CACHE_TTL_SECONDS = 300; // 5 min cache


/** Одноразово виконай це, щоб зберегти секрет у PropertiesService */
function setTokenOnce() {
  const token = 'REDUCTED'; // згенеруй сам
  PropertiesService.getScriptProperties().setProperty('WEB_TOKEN', token);
  Logger.log('WEB_TOKEN set. Use ?token=' + token + ' у URL');
}

/** Точка входу веб-додатка */
function doGet(e) {
  // 1) Перевірка токена
  const ok = validateToken_(e);
  if (!ok) return HtmlService.createHtmlOutput('<h1>403 Forbidden</h1>');

  // 2) Параметри (напр. ?days=21)
  const days = Math.max(1, parseInt(e.parameter.days || DEFAULT_DAYS_AHEAD, 10));

  // 3) Кеш
  const cacheKey = 'view:' + days;
  const cache = CacheService.getScriptCache();
  const cached = cache.get(cacheKey);
  if (cached) return HtmlService.createHtmlOutput(cached).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  // 4) Дані подій
  const model = buildViewModel_(days);

  // 4.1) Погода: "зараз" + наступні 10 годин
  model.weatherHourly = fetchNextHoursWeather_(10);

  // (якщо хочеш — залишай і картку "сьогодні":)
  model.weatherToday = fetchTodayWeather_();

  // 5) Рендеримо шаблон
  const tpl = HtmlService.createTemplateFromFile('Index');
  tpl.model = model;
  const html = tpl.evaluate()
    .setTitle('Family Calendar')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .getContent();

  cache.put(cacheKey, html, CACHE_TTL_SECONDS);
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Перевірка секрету в URL */
function validateToken_(e) {
  const tokenProvided = (e && e.parameter && e.parameter.token) || '';
  const tokenExpected = PropertiesService.getScriptProperties().getProperty('WEB_TOKEN') || '';
  return tokenProvided && tokenExpected && tokenProvided === tokenExpected;
}

/** Готуємо плоский масив подій і зручну групацію по днях */
function buildViewModel_(days) {
  const cal = CalendarApp.getCalendarById(FAMILY_CAL_ID);
  if (!cal) throw new Error('Family calendar not found or no access.');

  const now = new Date();
  const start = beginningOfDay_(now);
  const end = addDays_(start, days);

  const events = cal.getEvents(start, end);
  // Мапимо до простих об’єктів
  const items = events.map(ev => {
    const isAllDay = ev.isAllDayEvent();
    const startDt = isAllDay ? ev.getAllDayStartDate() : ev.getStartTime();
    const endDt = isAllDay ? ev.getAllDayEndDate()   : ev.getEndTime();

    return {
      title: ev.getTitle(),
      location: ev.getLocation() || '',
      isAllDay,
      startISO: startDt.toISOString(),
      endISO: endDt.toISOString(),
      dayKey: Utilities.formatDate(startDt, TZ, 'yyyy-MM-dd'),
      // Людяні рядки
      dayLabel: Utilities.formatDate(startDt, TZ, 'EEE, d MMM'),
      timeLabel: isAllDay
        ? 'Весь день'
        : Utilities.formatDate(startDt, TZ, 'HH:mm') + '–' + Utilities.formatDate(endDt, TZ, 'HH:mm')
    };
  }).sort((a, b) => a.startISO.localeCompare(b.startISO));

  // Групація по дню
  const byDay = {};
  for (const it of items) {
    byDay[it.dayKey] = byDay[it.dayKey] || { dayKey: it.dayKey, dayLabel: it.dayLabel, events: [] };
    byDay[it.dayKey].events.push(it);
  }

  // Масив днів у хронології
  const daysArr = Object.values(byDay).sort((a, b) => a.dayKey.localeCompare(b.dayKey));

  return {
    generatedAt: Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm'),
    tz: TZ,
    rangeLabel: Utilities.formatDate(start, TZ, 'd MMM') + ' → ' + Utilities.formatDate(addDays_(start, days - 1), TZ, 'd MMM'),
    days: daysArr
  };
}

/** Helpers */
function beginningOfDay_(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays_(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** (Опційно) список календарів — для дебагу */
function listCalendars_() {
  const cals = CalendarApp.getAllCalendars();
  cals.forEach(c => Logger.log(`${c.getName()} → ${c.getId()}`));
}

// Weather
function fetchTodayWeather_() {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'weather:today:' + Utilities.formatDate(new Date(), WEATHER_TZ, 'yyyy-MM-dd');
  const cached = cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + encodeURIComponent(LAT)
    + '&longitude=' + encodeURIComponent(LON)
    + '&timezone=' + encodeURIComponent(WEATHER_TZ)
    + '&current=temperature_2m,weather_code,wind_speed_10m'
    + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max';

  try {
    const res = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    if (res.getResponseCode() !== 200) throw new Error('Weather HTTP ' + res.getResponseCode());
    const data = JSON.parse(res.getContentText());

    // find "today" index in the daily arrays
    const todayKey = Utilities.formatDate(new Date(), WEATHER_TZ, 'yyyy-MM-dd');
    const idx = (data.daily?.time || []).indexOf(todayKey);
    if (idx < 0) throw new Error('No today index in daily weather');

    const w = {
      when: todayKey,
      tempNow: round1_(data.current?.temperature_2m),
      windNow: round1_(data.current?.wind_speed_10m),
      codeNow: data.current?.weather_code,
      tempMax: round1_(data.daily?.temperature_2m_max?.[idx]),
      tempMin: round1_(data.daily?.temperature_2m_min?.[idx]),
      precipMm: round1_(data.daily?.precipitation_sum?.[idx]),
      popMax: data.daily?.precipitation_probability_max?.[idx] ?? null,
      uvMax: round1_(data.daily?.uv_index_max?.[idx]),
      icon: weatherCodeToIcon_(data.current?.weather_code),
      label: weatherCodeToText_(data.current?.weather_code)
    };

    cache.put(cacheKey, JSON.stringify(w), WEATHER_CACHE_TTL_SECONDS);
    return w;
  } catch (err) {
    // Fail-soft: return null, UI will hide card
    console.warn('Weather error:', err);
    return null;
  }
}

function round1_(x) { return (typeof x === 'number') ? Math.round(x * 10) / 10 : null; }

// Minimal WMO code mapping
function weatherCodeToIcon_(code) {
  const m = {
    0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
    45:'🌫️', 48:'🌫️',
    51:'🌦️', 53:'🌦️', 55:'🌦️',
    61:'🌧️', 63:'🌧️', 65:'🌧️',
    66:'🌧️', 67:'🌧️',
    71:'🌨️', 73:'🌨️', 75:'🌨️',
    77:'❄️',
    80:'🌧️', 81:'🌧️', 82:'🌧️',
    85:'🌨️', 86:'🌨️',
    95:'⛈️', 96:'⛈️', 99:'⛈️'
  };
  return m[code] ?? '🌡️';
}

function weatherCodeToText_(code) {
  const m = {
    0:'Ясно', 1:'Переважно ясно', 2:'Мінлива хмарність', 3:'Хмарно',
    45:'Туман', 48:'Туман',
    51:'Мряка', 53:'Мряка', 55:'Мряка',
    61:'Дощ', 63:'Дощ', 65:'Сильний дощ',
    66:'Крижаний дощ', 67:'Крижаний дощ',
    71:'Сніг', 73:'Сніг', 75:'Сильний сніг',
    77:'Сніжинки',
    80:'Зливи', 81:'Зливи', 82:'Сильні зливи',
    85:'Снігопад', 86:'Сильний снігопад',
    95:'Гроза', 96:'Гроза', 99:'Гроза'
  };
  return m[code] ?? 'Погода';
}


function fetchNextHoursWeather_(hoursAhead) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'weather:hourly:' + hoursAhead + ':' + Utilities.formatDate(new Date(), WEATHER_TZ, 'yyyyMMddHH'); // оновл. раз на годину
  const cached = cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + encodeURIComponent(LAT)
    + '&longitude=' + encodeURIComponent(LON)
    + '&timezone=' + encodeURIComponent(WEATHER_TZ)
    + '&hourly=temperature_2m,precipitation_probability,precipitation,wind_speed_10m,weather_code'
    + '&current=temperature_2m,weather_code';

  try {
    const res = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    if (res.getResponseCode() !== 200) throw new Error('Weather hourly HTTP ' + res.getResponseCode());
    const data = JSON.parse(res.getContentText());

    const times = data.hourly?.time || [];
    const tNow = new Date(); // локальний час аккаунта, але Open-Meteo вже віддає у WEATHER_TZ
    // Знаходимо перший індекс >= зараз
    let startIdx = 0;
    for (let i = 0; i < times.length; i++) {
      const ti = new Date(times[i]);
      if (ti >= tNow) { startIdx = i; break; }
    }

    const out = [];
    for (let k = 0; k < hoursAhead && (startIdx + k) < times.length; k++) {
      const i = startIdx + k;
      const ti = new Date(times[i]);
      const code = data.hourly.weather_code?.[i];
      out.push({
        timeISO: ti.toISOString(),
        hourLabel: Utilities.formatDate(ti, WEATHER_TZ, 'HH:mm'),
        temp: round1_(data.hourly.temperature_2m?.[i]),
        pop: data.hourly.precipitation_probability?.[i] ?? null, // %
        precip: round1_(data.hourly.precipitation?.[i]),         // мм
        wind: round1_(data.hourly.wind_speed_10m?.[i]),          // м/с
        icon: weatherCodeToIcon_(code),
        label: weatherCodeToText_(code)
      });
    }

    cache.put(cacheKey, JSON.stringify(out), 300); // кеш 5 хв.
    return out;
  } catch (e) {
    console.warn('Hourly weather error:', e);
    return null;
  }
}


