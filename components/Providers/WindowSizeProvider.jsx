"use client"

import { useEffect } from 'react';
import useWindowSizeStore from '@/store/useWindowSizeStore';

export default function WindowSizeProvider({ children }) {
  const setSize = useWindowSizeStore((state) => state.setSize);

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize(); // начальное значение
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setSize]);

  return children;
}
