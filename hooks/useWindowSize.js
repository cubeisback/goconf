// hooks/useWindowSize.js
import { useEffect } from 'react';
import { create } from 'zustand';

const useWindowSizeStore = create((set) => ({
  width: null,
  height: null,
  setSize: ({ width, height }) => set({ width, height }),
}));

export const useWindowSize = () => {
  const { width, height, setSize } = useWindowSizeStore();

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Установим размеры сразу при монтировании

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSize]);

  return { width, height };
};
