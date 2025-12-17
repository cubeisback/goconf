'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function JivoChatSimple() {
  const pathname = usePathname();
  const mountedRef = useRef(false);

  useEffect(() => {
    const isCabinet = pathname?.startsWith('/cabinet');
    
    console.log('JivoChatSimple: isCabinet =', isCabinet);
    
    // Настраиваем глобальные обработчики Jivo
    if (!mountedRef.current) {
      // Этот код выполнится только один раз
      window.jivo_onLoadCallback = function() {
        console.log('Jivo widget is ready');
        
        // При загрузке виджета проверяем где мы находимся
        if (!window.location.pathname.startsWith('/cabinet') && window.jivo_destroy) {
          console.log('Destroying Jivo on initial load (not in cabinet)');
          window.jivo_destroy();
        }
      };
      
      mountedRef.current = true;
    }
    
    // Основная логика
    if (isCabinet) {
      // В кабинете - инициализируем или показываем Jivo
      
      // Проверяем, загружен ли уже скрипт Jivo
      const scriptExists = document.querySelector('script[src*="jivo.ru"]');
      
      if (!scriptExists) {
        // Добавляем скрипт
        const script = document.createElement('script');
        script.src = '//code.jivo.ru/widget/LcGOP2OXto';
        script.async = true;
        document.body.appendChild(script);
        console.log('Added Jivo script');
      } else if (window.jivo_init) {
        // Скрипт уже есть, инициализируем виджет
        window.jivo_init();
        console.log('Called jivo_init()');
      }
    } else {
      // Не в кабинете - уничтожаем Jivo
      if (window.jivo_destroy) {
        window.jivo_destroy();
        console.log('Called jivo_destroy()');
      }
      
      // Удаляем скрипт если он есть
      const script = document.querySelector('script[src*="jivo.ru"]');
      if (script) {
        script.remove();
        console.log('Removed Jivo script');
      }
      
      // Принудительно удаляем контейнеры
      setTimeout(() => {
        const containers = ['jivo-iframe-container', 'jivo_container', 'jivo-widget-container'];
        containers.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.remove();
        });
      }, 50);
    }
    
  }, [pathname]);

  return null;
}