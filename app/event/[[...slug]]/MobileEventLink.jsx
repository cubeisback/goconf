'use client';

import { css } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';

export default function MobileEventLink({ children, marginTop = 0 }) {
  const slotRef = useRef(null);
  const contentRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 575px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const slot = slotRef.current;
      const content = contentRef.current;
      if (!slot || !content) return;

      const contentHeight = content.getBoundingClientRect().height;
      setHeight(contentHeight);
      // Return to the normal flow once the whole button fits in the viewport.
      setIsFixed(media.matches && slot.getBoundingClientRect().top + contentHeight > window.innerHeight);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(contentRef.current);
    observer.observe(document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    media.addEventListener('change', scheduleUpdate);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      media.removeEventListener('change', scheduleUpdate);
    };
  }, []);

  return (
    <div ref={slotRef} style={{ marginTop, height: isFixed ? height : undefined }}>
      <div ref={contentRef} className={css`
        @media (max-width: 575px) {
          ${isFixed && `
            position: fixed;
            left: 15px;
            right: 15px;
            bottom: calc(12px + env(safe-area-inset-bottom, 0px));
            z-index: 100;
          `}
        }
      `}>
        {children}
      </div>
    </div>
  );
}
