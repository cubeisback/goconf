'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import PlusIcon from '@/public/images/svg/plus_icon.svg';
import MinusIcon from '@/public/images/svg/minus_icon.svg';
import { createPreviewData } from './previewData.mjs';
import { todayDay, formatDay, periodChoices, normalizeRates, periodPrice, topicAvailability } from './calculations.mjs';
import { Flow, PreviewNotice, Steps, Option, Topics, Topic, Receipt, ReceiptRow, Price, Term, Total, Actions, Action, Back, Payment, ErrorMessage } from './styles';

const money = value => Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 2 });
const daysLabel = days => `${days} ${days % 10 === 1 && days !== 11 ? 'день' : days % 10 >= 2 && days % 10 <= 4 && (days < 12 || days > 14) ? 'дня' : 'дней'}`;

function Duration({ name, choices, value, onChange }) {
  const index = choices.indexOf(value);
  return <Term>
    <button type="button" aria-label={`Уменьшить срок: ${name}`} disabled={index <= 0} onClick={() => onChange(choices[index - 1])}><MinusIcon /></button>
    <output aria-label={`Срок: ${name}`}>{daysLabel(value)}</output>
    <button type="button" aria-label={`Увеличить срок: ${name}`} disabled={index < 0 || index >= choices.length - 1} onClick={() => onChange(choices[index + 1])}><PlusIcon /></button>
  </Term>;
}

function Cost({ quote }) {
  if (!quote) return <Price>Цена недоступна</Price>;
  return <Price>
    {quote.old > quote.price && <del>{money(quote.old)} руб.</del>}
    {money(quote.price)} руб.
    {quote.old > quote.price && <small>Экономия {money(quote.old - quote.price)} руб.</small>}
  </Price>;
}

function PeriodNote({ start, days, eventDay, quote }) {
  return <>
    <small>{formatDay(start)} — {formatDay(start + days)}</small>
    {start + days === eventDay && <small>Максимальный срок — до начала события {formatDay(eventDay)}.</small>}
    {quote && days < quote.packageDays && <small>Стоимость пакета на {daysLabel(quote.packageDays)}.</small>}
  </>;
}

export default function PromotionFlow({ event, sliderTariffs, onBack }) {
  const [today, setToday] = useState(todayDay);
  // Refresh the calendar limit when an open tab crosses midnight or regains focus.
  useEffect(() => {
    const update = () => setToday(todayDay());
    const timer = setInterval(update, 60000);
    window.addEventListener('focus', update);
    return () => { clearInterval(timer); window.removeEventListener('focus', update); };
  }, []);
  const data = useMemo(() => createPreviewData(event, today), [event, today]);
  const [step, setStep] = useState(1);
  const [slider, setSlider] = useState(true);
  const [pinning, setPinning] = useState(false);
  const [selected, setSelected] = useState([]);
  const [durations, setDurations] = useState({});
  const [pay, setPay] = useState('pay_tochka');
  const [previewComplete, setPreviewComplete] = useState(false);
  const [error, setError] = useState('');
  const sliderRates = normalizeRates(Object.keys(sliderTariffs || {}).length ? sliderTariffs : data.sliderRates);
  const pinningRates = normalizeRates(data.pinningRates, 1000);
  const sliderChoices = periodChoices(today, data.eventDay);
  const chosenTopics = data.topics.filter(topic => selected.includes(topic.id));
  const termValue = (key, choices) => choices.includes(durations[key]) ? durations[key] : choices[0];
  const changeTerm = (key, days) => setDurations(prev => ({ ...prev, [key]: days }));
  const sliderDays = termValue('slider', sliderChoices);
  const sliderQuote = periodPrice(sliderDays, sliderRates);
  const topicRows = chosenTopics.map(topic => {
    const available = topicAvailability(topic, today);
    const choices = periodChoices(available.start, data.eventDay);
    const days = termValue(topic.id, choices);
    return { topic, available, choices, days, quote: periodPrice(days, pinningRates) };
  });
  const valid = (slider || pinning) && (!slider || sliderChoices.length > 0) && (!pinning || (selected.length > 0 && topicRows.every(row => row.available.selectable && row.choices.length > 0)));
  const total = (slider ? sliderQuote?.price || 0 : 0) + (pinning ? topicRows.reduce((sum, row) => sum + (row.quote?.price || 0), 0) : 0);
  const quotesReady = (!slider || sliderQuote) && (!pinning || topicRows.every(row => row.quote));

  const enablePinning = checked => {
    setPinning(checked);
    if (checked && !selected.length) {
      const primary = data.topics.find(topic => topic.primary && topicAvailability(topic, today).selectable && periodChoices(topicAvailability(topic, today).start, data.eventDay).length);
      if (primary) setSelected([primary.id]);
    }
  };
  const next = () => {
    if (!valid) { setError('Выберите хотя бы одну опцию и доступную тематику для закрепления.'); return; }
    setError(''); setStep(2);
  };

  return <Flow data-promotion-flow="preview">
    <h1>{previewComplete ? 'Предпросмотр заказа' : step === 1 ? 'Опции для продвижения' : 'Подтверждение покупки'}</h1>
    <PreviewNotice>Тестовый режим: занятость тематик и закрепления — примеры. Заказ не создаётся, оплата не списывается.</PreviewNotice>
    {!previewComplete && <Steps>
      <button type="button" data-active={step === 1} data-complete={step === 2} onClick={() => setStep(1)}>Выбор опций</button><span />
      <button type="button" data-active={step === 2} onClick={next}>Подтверждение покупки</button>
    </Steps>}
    {step === 1 && !previewComplete && <>
      <small>Событие</small><h2>{event.title}</h2>
      {!sliderChoices.length && <ErrorMessage>Событие уже началось — продвижение недоступно.</ErrorMessage>}
      <Option><input type="checkbox" checked={slider} onChange={e => setSlider(e.target.checked)} /><div>
        <p>Размещение в сквозном слайдере <b>«Интересные события»</b></p>
        <small>Срок размещения — <b>от 7 до 28 дней, до начала события</b></small>
        <small>Стоимость услуги — <b>от {money(sliderRates[7]?.price || 2500)} рублей</b></small>
      </div></Option>
      <Option><input type="checkbox" checked={pinning} onChange={e => enablePinning(e.target.checked)} /><div>
        <p>Закрепление в тематике <b>«Первая строка»</b></p>
        <small>Срок размещения — <b>от 1 недели до даты события</b></small>
        <small>Стоимость услуги — <b>от 1 000 рублей в неделю</b> за каждую тематику</small>
      </div></Option>
      {pinning && <Topics>
        <header><p>В каких тематиках закрепить? <span style={{ color: '#6c6c71' }}>Можно выбрать несколько</span></p>
          <small>Показаны тематики из карточки события. <Link href={`/cabinet/events/edit/?id=${event.id}`}>Изменить тематики события</Link></small>
        </header>
        {data.topics.map(topic => {
          const status = topicAvailability(topic, today);
          const hasPeriod = periodChoices(status.start, data.eventDay).length > 0;
          const disabled = !status.selectable || !hasPeriod;
          const checked = selected.includes(topic.id);
          return <Topic key={topic.id} $selected={checked} $disabled={disabled} $state={status.renewal ? 'renewal' : !status.selectable ? 'full' : status.free === 1 ? 'last' : 'free'}>
            <input type="checkbox" checked={checked} disabled={disabled} onChange={() => setSelected(prev => checked ? prev.filter(id => id !== topic.id) : [...prev, topic.id])} />
            <div><header><span>{topic.name}</span>{topic.primary && <em>Основная</em>}<strong>1 000 ₽ / неделя</strong></header>
              <small>{!hasPeriod && status.renewal ? 'Закрепление уже действует до начала события.' : status.renewal ? `Уже закреплено до ${formatDay(status.start)} — отметьте, чтобы продлить` : !status.selectable ? `Мест нет · ближайшее освободится ${formatDay(status.next)}` : `${status.free === 1 ? 'Осталось 1 место' : `Свободно ${status.free} места`} из 3`}</small>
            </div>
          </Topic>;
        })}
        <footer><small>Выбрано тематик: {selected.length} · {money(selected.length * 1000)} ₽ в неделю. Срок по каждой тематике выберете на следующем шаге.</small></footer>
      </Topics>}
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <Actions><Back $button onClick={onBack}>Назад</Back><Action $button onClick={next} disabled={!valid}>Перейти к оплате</Action></Actions>
    </>}
    {(step === 2 || previewComplete) && <>
      <Receipt>
        <small>{previewComplete ? event.title : 'Промежуточный итог'}</small>
        {slider && <ReceiptRow>
          <div>Размещение в сквозном слайдере «Интересные события»<PeriodNote start={today} days={sliderDays} eventDay={data.eventDay} quote={sliderQuote} /></div>
          <Duration name="Слайдер" choices={sliderChoices} value={sliderDays} onChange={days => changeTerm('slider', days)} /><Cost quote={sliderQuote} />
        </ReceiptRow>}
        {pinning && <>
          <div style={{ borderTop: slider ? '1px solid #f5f7fa' : undefined, paddingTop: 24 }}>
            Закрепление в тематике «Первая строка»
            <small style={{ marginTop: 6 }}>Событие начнётся {formatDay(data.eventDay)} — закрепление действует не дольше этой даты.</small>
          </div>
          {topicRows.map(({ topic, available, choices, days, quote }) => <ReceiptRow key={topic.id}>
            <div>{topic.name}<PeriodNote start={available.start} days={days} eventDay={data.eventDay} quote={quote} /></div>
            <Duration name={topic.name} choices={choices} value={days} onChange={value => changeTerm(topic.id, value)} /><Cost quote={quote} />
          </ReceiptRow>)}
        </>}
        <Total>Итого: <strong data-promotion-total>{money(total)} руб.</strong></Total>
      </Receipt>
      {!previewComplete ? <>
        <small>Способ оплаты</small>
        <Payment><input type="radio" name="promotion-pay" checked={pay === 'pay_tochka'} onChange={() => setPay('pay_tochka')} />Оплата картой или QR-кодом</Payment>
        <Payment><input type="radio" name="promotion-pay" checked={pay === 'pay_ur'} onChange={() => setPay('pay_ur')} />Оплата по счету для юр.лиц</Payment>
        <Actions><Back $button onClick={() => setStep(1)}>Назад</Back><Action $button disabled={!valid || !quotesReady} onClick={() => setPreviewComplete(true)}>Подтвердить</Action></Actions>
        <small>Нажимая «Подтвердить», вы соглашаетесь с условиями <Link href="/offer" target="_blank">публичной оферты</Link></small>
      </> : <>
        <p>Выбрана {pay === 'pay_ur' ? 'оплата по счёту для юр. лиц' : 'оплата картой или QR-кодом'}. Это предварительный расчёт — заказ не отправлен.</p>
        <Actions><Back $button onClick={() => setPreviewComplete(false)}>Изменить заказ</Back><Action $button onClick={onBack}>Мои мероприятия</Action></Actions>
      </>}
    </>}
  </Flow>;
}
