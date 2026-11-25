"use client";

import { useEffect, useState } from 'react';

const emptyCovers = ['/images/empty_1.jpg', '/images/empty_2.jpg'];

export default function EventCover({ src, alt = '', ...props }) {
  const imageSrc = typeof src === 'string' && src.trim() ? src : '';
  const [emptyCover, setEmptyCover] = useState(emptyCovers[0]);

  useEffect(() => {
    if (!imageSrc) {
      setEmptyCover(emptyCovers[Math.floor(Math.random() * emptyCovers.length)]);
    }
  }, [imageSrc]);

  return <img {...props} src={imageSrc || emptyCover} alt={alt} />;
}
