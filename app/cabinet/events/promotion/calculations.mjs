const DAY = 86400000;
export const PERIODS = [7, 14, 21, 28];

// Calendar dates, independent of the browser's timezone and daylight saving time.
export function parseDay(value) {
  if (typeof value !== 'string') return null;
  const parts = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);
  if (!parts && !iso) return null;
  const [y, m, d] = parts ? [+parts[3], +parts[2], +parts[1]] : [+iso[1], +iso[2], +iso[3]];
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
    ? date.getTime() / DAY : null;
}

export function todayDay(now = new Date()) {
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = type => date.find(item => item.type === type).value;
  return parseDay(`${part('year')}-${part('month')}-${part('day')}`);
}

export function formatDay(day) {
  return Number.isFinite(day) ? new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'UTC', day: 'numeric', month: 'long',
  }).format(new Date(day * DAY)) : '';
}

export function periodChoices(startDay, eventDay) {
  if (!Number.isFinite(startDay) || !Number.isFinite(eventDay)) return [];
  const maximum = Math.min(28, Math.max(0, eventDay - startDay));
  if (!maximum) return [];
  return [...new Set([...PERIODS.filter(days => days <= maximum), maximum])].sort((a, b) => a - b);
}

export function normalizeRates(raw, weeklyPrice) {
  return Object.fromEntries(PERIODS.map(days => {
    const item = raw?.[`cost_${days}`];
    const fallback = Number.isFinite(weeklyPrice) ? weeklyPrice * days / 7 : null;
    const old = Number(item?.old ?? fallback);
    const price = Number(item?.new ?? fallback);
    return [days, {
      old: Number.isFinite(old) && old > 0 ? old : null,
      price: Number.isFinite(price) && price > 0 ? price : null,
    }];
  }));
}

// Use package prices unchanged; a shortened period retains its package price.
export function periodPrice(days, rates) {
  if (!Number.isFinite(days) || days <= 0 || days > 28) return null;
  const packageDays = PERIODS.find(period => period >= days);
  return rates[packageDays]?.price == null ? null : { ...rates[packageDays], packageDays };
}

export function topicAvailability(topic, today) {
  const until = parseDay(topic.active_until);
  if (until != null && until > today) return { selectable: true, renewal: true, start: until };
  const occupied = topic.occupied;
  if (!Number.isInteger(occupied) || occupied < 0) return { selectable: false, unknown: true };
  return { selectable: occupied < 3, free: Math.max(0, 3 - occupied), next: parseDay(topic.next_available_at), start: today };
}
