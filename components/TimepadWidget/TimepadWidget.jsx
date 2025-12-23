'use client';

import { Button } from '@/styles/ui';
import { useEffect } from 'react';

export default function TimepadWidgetSimple({ eventId }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !eventId) return;

    const config = {
      "event": { "id": parseInt(eventId) },
      "hidePreloading": true,
      "display": "popup",
      "popup": { "triggerSelector": `#timepad_twf_register_${eventId}` }
    };

    window.timepadConfig = window.timepadConfig || {};
    window.timepadConfig[eventId] = config;

    document.body.setAttribute(`data-twf2s-event--${eventId}`, JSON.stringify(config));

    if (!document.querySelector('script[src*="timepad.ru"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.charset = 'UTF-8';
      script.src = 'https://timepad.ru/js/tpwf/loader/min/loader.js';
      document.head.appendChild(script);
    }
  }, [eventId]);

  return (
	<Button green="true" style={{width: '100%'}}>
		<a
			href={`https://timepad.ru/event/${eventId}/`}
			rel="nofollow noopener noreferrer"
			target="_blank"
			id={`timepad_twf_register_${eventId}`}
		>
			<p>
				<span>Зарегистрироваться</span>
				<span>Зарегистрироваться</span>
			</p>
			
		</a>
	</Button>
  );
}