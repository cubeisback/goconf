import createCache from '@emotion/cache'

const isBrowser = typeof document !== 'undefined'

// Уникальный ключ для Emotion. `prepend: true` гарантирует, что Emotion стили будут первыми в <head>
export const cache = createCache({
  key: 'css',
  prepend: true,
  container: isBrowser ? document.head : undefined,
})