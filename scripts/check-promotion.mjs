import assert from 'node:assert/strict';
import { parseDay, periodChoices, periodPrice, normalizeRates, topicAvailability, todayDay } from '../app/cabinet/events/promotion/calculations.mjs';
import { createPreviewData } from '../app/cabinet/events/promotion/previewData.mjs';
import { allowsDevelopmentFeatures } from '../lib/developmentFeatures.js';

const today = parseDay('26.11.2026');
assert.equal(parseDay('2026-11-26'), today);
assert.equal(parseDay('31.02.2026'), null);
assert.equal(parseDay(''), null);
assert.equal(todayDay(new Date('2026-11-25T22:00:00Z')), today);
for (const [remaining, expected] of [
  [0, []], [-2, []], [5, [5]], [7, [7]], [10, [7, 10]],
  [14, [7, 14]], [18, [7, 14, 18]], [28, [7, 14, 21, 28]], [40, [7, 14, 21, 28]],
]) assert.deepEqual(periodChoices(today, today + remaining), expected);

const rates = normalizeRates({ cost_7: { old: 1000, new: 1000 }, cost_14: { old: 2000, new: 1800 }, cost_21: { old: 3000, new: 2400 }, cost_28: { old: 4000, new: 2800 } });
for (const [days, price, packageDays] of [[5, 1000, 7], [7, 1000, 7], [10, 1800, 14], [14, 1800, 14], [18, 2400, 21], [28, 2800, 28]]) {
  assert.equal(periodPrice(days, rates).price, price);
  assert.equal(periodPrice(days, rates).packageDays, packageDays);
}
assert.equal(periodPrice(0, rates), null);
assert.equal(periodPrice(29, rates), null);
assert.equal(periodPrice(7, normalizeRates({})), null);
assert.deepEqual(topicAvailability({ occupied: 1 }, today), { selectable: true, free: 2, next: null, start: today });
assert.equal(topicAvailability({ occupied: 3 }, today).selectable, false);
assert.equal(topicAvailability({}, today).selectable, false);
const renewal = topicAvailability({ occupied: 3, active_until: '2026-12-01' }, today);
assert.equal(renewal.renewal, true);
assert.equal(renewal.start, today + 5);
assert.deepEqual(periodChoices(renewal.start, today + 10), [5]);
assert.equal(topicAvailability({ occupied: 3, active_until: '2026-11-25' }, today).selectable, false);
const single = createPreviewData({ date_start: '2026-12-06', subject: [{ id: 9, name: 'Одна тематика' }] }, today);
assert.equal(single.topics.length, 1);
assert.equal(single.topics[0].primary, true);
assert.equal(single.eventDay, today + 10);
assert.equal(createPreviewData({ date_start: '2026-11-25' }, today).eventDay, today - 1);
for (const host of ['localhost:3000', '127.0.0.1:3086', '[::1]:3000', 'dev.goconf.ru']) assert.equal(allowsDevelopmentFeatures(host), true);
for (const host of ['', 'goconf.ru', 'www.goconf.ru', 'example.com', 'dev.example.com']) assert.equal(allowsDevelopmentFeatures(host), false);
assert.equal(allowsDevelopmentFeatures('dev.goconf.ru', 'goconf.ru'), false);
console.log('Promotion checks passed: date limits, package prices/discounts, renewal, capacity, single topic, host gate.');
