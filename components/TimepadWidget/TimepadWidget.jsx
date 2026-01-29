'use client';

import { Button } from '@/styles/ui';
import { useEffect, useRef } from 'react';

export default function TimepadWidget({ eventId, handleClickConversion }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!eventId || typeof window === 'undefined' || scriptLoaded.current) return;

    const oldScripts = document.querySelectorAll('script[src*="timepad.ru"]');
    oldScripts.forEach(script => script.remove());

    const script = document.createElement('script');
    
    script.async = true;
    script.defer = true;
    script.charset = 'UTF-8';
    script.setAttribute('data-timepad-customized', '');
    script.setAttribute('data-timepad-widget-v2', 'event_register');
    script.src = 'https://timepad.ru/js/tpwf/loader/min/loader.js';
    
    script.textContent = `
      (function(){
        return {
          "event": {
            "id": ${eventId}
          },
          "hidePreloading": true,
          "display": "popup",
          "popup": {
            "triggerSelector": "#timepad_twf_register_${eventId}"
          }
        }
      })();
    `;
    
    script.id = `timepad-script-${eventId}`;
    
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById(`timepad-script-${eventId}`);
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      scriptLoaded.current = false;
    };
  }, [eventId]);

  return (
	<Button green="true" style={{width: '100%'}} 
        rel="nofollow noopener noreferrer"
        id={`timepad_twf_register_${eventId}`}
        className="timepad-register-button"
        onClick={(e) => {
          e.preventDefault();

          if (!scriptLoaded.current) {
			handleClickConversion()
            
            const oldScript = document.getElementById(`timepad-script-${eventId}`);
            if (oldScript) oldScript.remove();
            
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.charset = 'UTF-8';
            script.setAttribute('data-timepad-customized', '');
            script.setAttribute('data-timepad-widget-v2', 'event_register');
            script.src = 'https://timepad.ru/js/tpwf/loader/min/loader.js';
            script.textContent = `
              (function(){
                return {
                  "event": {
                    "id": ${eventId}
                  },
                  "hidePreloading": true,
                  "display": "popup",
                  "popup": {
                    "triggerSelector": "#timepad_twf_register_${eventId}"
                  }
                }
              })();
            `;
            document.body.appendChild(script);
          }
    }}>
		<p>
			<span>Зарегистрироваться</span>
			<span>Зарегистрироваться</span>
		</p>
	</Button>
  );
}