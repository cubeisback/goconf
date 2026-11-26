import { parseDay, todayDay } from './calculations.mjs';

const iso = day => new Date(day * 86400000).toISOString().slice(0, 10);

export function createPreviewData(event, now = todayDay()) {
  const actualDay = parseDay(event.date_start);
  const eventDay = actualDay != null ? actualDay : now + 18;
  const source = Array.isArray(event.subject) && event.subject.length ? event.subject : [
    { id: 1, name: 'Маркетинг, реклама и PR' },
    { id: 2, name: 'Аналитика и большие данные' },
    { id: 3, name: 'Программирование и IT' },
    { id: 4, name: 'Бизнес-семинары' },
  ];
  return {
    eventDay,
    topics: source.map((topic, index) => ({
      id: String(topic.id ?? index), name: topic.name, primary: index === 0,
      occupied: [1, 3, 2, 3][index % 4],
      active_until: index === 1 ? iso(Math.min(now + 4, eventDay)) : null,
      next_available_at: iso(now + 5),
    })),
    pinningRates: {
      cost_7: { old: 1000, new: 1000 },
      cost_14: { old: 2000, new: 2000 },
      cost_21: { old: 3000, new: 3000 },
      cost_28: { old: 4000, new: 4000 },
    },
    sliderRates: {
      cost_7: { old: 2500, new: 2500 },
      cost_14: { old: 5000, new: 5000 },
      cost_21: { old: 7500, new: 7500 },
      cost_28: { old: 10000, new: 10000 },
    },
  };
}
