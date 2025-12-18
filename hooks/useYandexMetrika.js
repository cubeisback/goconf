import { useEffect, useState, useCallback } from 'react';

export const useYandexMetrika = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let interval;
    
    const checkMetrika = () => {
      if (typeof window !== 'undefined' && window.ym) {
        setIsReady(true);
        console.log('✅ Яндекс.Метрика загружена');
        clearInterval(interval); // Очищаем интервал при загрузке
      }
    };

    // Сначала проверяем сразу (может уже загружена)
    checkMetrika();
    
    // Если еще не загружена, запускаем интервал
    if (!isReady) {
      interval = setInterval(checkMetrika, 100);
    }
    
    // Очистка при размонтировании компонента
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []); // Пустой массив зависимостей - выполняется один раз

  const reachGoal = useCallback((target, params = null) => {
    if (typeof window !== 'undefined' && window.ym && isReady) {
      try {
        console.group('🎯 Яндекс.Метрика: Отправка цели');
        console.log('Цель:', target);
        console.log('Параметры:', params);
        console.log('Время:', new Date().toLocaleTimeString());
        
        if (params) {
          window.ym(105137678, 'reachGoal', target, params);
        } else {
          window.ym(105137678, 'reachGoal', target);
        }
        
        console.log('✅ Цель успешно отправлена');
        console.groupEnd();
        
      } catch (error) {
        console.error('❌ Яндекс.Метрика ошибка:', error);
      }
    } else if (!isReady) {
      console.warn('⚠️ Яндекс.Метрика еще не загружена');
    } else {
      console.warn('⚠️ window.ym не найден');
    }
  }, [isReady]);

  return { reachGoal, isReady };
};