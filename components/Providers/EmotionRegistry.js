'use client'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { useRef } from 'react'

const cache = createCache({ key: 'css', prepend: true })

export default function EmotionRegistry({ children }) {
  const cacheRef = useRef(cache)

  useServerInsertedHTML(() => {
    const { sheet, inserted, key } = cacheRef.current;
	console.log('EmotionRegistry sheet.tags.length =', sheet.tags.length)
	sheet.tags.forEach((tag, i) => {
		console.log(`Tag #${i}:`, tag.textContent?.slice(0, 30))
	})

    if (!sheet.tags.length) return null;

    let css = ''
    sheet.tags.forEach(tag => {
      if (tag.textContent) {
        css += tag.textContent
      }
    })

    if (!css) return null

    return (
      <style
        data-emotion={`${key} ${Object.keys(inserted).join(' ')}`}
        dangerouslySetInnerHTML={{ __html: css }}
        suppressHydrationWarning
      />
    )
  })

  return <CacheProvider value={cacheRef.current}>{children}</CacheProvider>
}
