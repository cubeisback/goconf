import Dexie from 'dexie';
import { useEffect } from 'react';

// Создание базы данных
const db = new Dexie('testDB');

// Определение схемы хранилища
db.version(1).stores({
  'events': 'id,url', // 'id' - это ключ, по которому будет производиться поиск
});

// Ожидание готовности базы данных
db.open().catch((err) => {
  console.error('Failed to open database:', err);
});

// export const addItem = async (item) => {
//   try {
//     await db.myStore.add(item); // 'myStore' - это имя хранилища
//     console.log('Item added:', item);
//   } catch (err) {
//     console.error('Failed to add item:', err);
//   }
// };

export const getAllEvents = async () => {
    try {
      const items = await db.events.toArray();
      // console.log('Item fetched:', items);
      return items;
    } catch (err) {
      console.error('Failed to fetch item:', err);
    }
};

// export const getItem = async (url) => {
//   try {
//     const item = await db.events.get(url);
//     console.log('Item fetched:', item);
//     return item;
//   } catch (err) {
//     console.error('Failed to fetch item:', err);
//   }
// };


export const getEventById = async (url) => {
  try {
    const items = await db.events.where('url').equals(url).toArray();
    console.log('Items fetched by name:', items);

    return items;
  } catch (err) {
    console.error('Failed to fetch items by name:', err);
  }
};

// TODO текст события в редакторе -- будет все в тз

// TODO Россия в адресе -- скорее всего убрать надо будет

// TODO как писать параметры для фильтра в Url -- отдельными путями в url

// TODO Количество городов -- мск спб первыми

// TODO стоимость события -- будет в тз

// TODO галерея order -- будет в тз

// TODO шрифт

export const DB = () => {
    // useEffect для записи данных при монтировании
      useEffect(() => {
        const addDataToDb = async () => {
          try {
            await db.open(); // Открываем базу данных
            for(let i = 0; i < 6; i++) {
              const item = { 
                id: i+1,
                url: `event_${i+1}`,
                format: 'Конференция',
                themes: [
                  'Управление персоналом',
                  'Менеджмент',
                  'HR-процессы',
                ],
                title: `${i+1} Налоговая и юридическая безопасность селлера на маркетплейсах`,
                date1: '26 июля 2024',
                date2: '09 мая 2025',
                city: 'Екатеринбург',
                address: 'Кинотеатр Каро 11 Октябрь',
                price: '32 900 - 72 000 руб.',
                organization: 'ЦРБК',
                smallImage: '',
                bigImage: '',
                previewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                text: '<p>Сразу два уникальных события ждут представителей индустрии в&nbsp;ноябре:</p><div><p>🌟12-15 ноября&nbsp;— Неделя рекламы в&nbsp;Москве;</p><p>🌟13-15 ноября&nbsp;— НРФ’8.</p></div><p>В&nbsp;этом году главная тема деловой программы НРФ: «Бизнес, потребители, государство».</p><div>12&nbsp;ноября&nbsp;— Саммит по&nbsp;взаимодействию индустрии с&nbsp;органами государственной власти</div><p>Эксперты со&nbsp;стороны органов государственной власти и&nbsp;рекламной индустрии обсудят законодательные инициативы, актуальные вопросы нормативно-правового регулирования и&nbsp;правоприменительные практики, акты саморегулирования рынка.</p><div>13&nbsp;ноября&nbsp;— День digital</div><p>Дискуссия будет посвящена новым инструментам цифровых коммуникаций и&nbsp;актуальным подходам в&nbsp;интерактивной рекламе.</p><div>14&nbsp;ноября&nbsp;— День контента и&nbsp;креатива</div><p>На&nbsp;площадке форума выступят российские и&nbsp;зарубежные эксперты. Также пройдет официальная церемония награждения победителей фестиваля Red Apple.</p><div>15&nbsp;ноября&nbsp;— День стратегических инициатив</div><p>Ключевые игроки рекламного рынка обсудят цели и&nbsp;задачи российского маркетинга, узнаваемость отечественных брендов и&nbsp;тренды в&nbsp;поведении потребителей.</p>',
              }; // Данные для записи
              await db.events.put(item); // Записываем данные в IndexedDB
              // console.log('Data added to IndexedDB:', item);
            }
          } catch (err) {
            console.error('Error adding data to IndexedDB:', err);
          }
        };
    
        addDataToDb();
      }, []); // Пустой массив зависимостей - выполняется только при монтировании

    return(
        <></>
    )
}