import JivoChat from "@/components/JivoChat/JivoChat";
import ThemeWrapper from "./theme-wrapper";
import Script from "next/script";
import localFont from 'next/font/local'

// Локальные шрифты
const styrene = localFont({
  src: [
    {
      path: '../public/fonts/StyreneAWeb-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/StyreneAWeb-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/StyreneAWeb-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-styrene',
  display: 'swap',
})

const impact = localFont({
  src: '../public/fonts/Impact.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-impact',
  display: 'swap',
})

export const metadata = {
  title: "GoConf",
  description: "Конференции и события",
  robots: {
    index: process.env.NEXT_PUBLIC_VERSION === 'production' ? true : false,
    follow: process.env.NEXT_PUBLIC_VERSION === 'production' ? true : false,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
	icons: {
		icon: [
			// PNG favicon
			{
				url: "/favicon.png",
				type: "image/png",
			},
			// SVG favicon 120x120
			{
				url: "/favicon.svg",
				type: "image/svg+xml",
				sizes: "120x120",
			},
			// ICO favicon (традиционный)
			{
				url: "/favicon.ico",
				sizes: "any",
			},
			],
			apple: [
			// Apple touch icon
			{
				url: "/apple-touch-icon.png",
				type: "image/png",
			},
		],
	},
};
export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: 'cover'
};

export default function RootLayout({ children }) {
	const fontClasses = `${styrene.variable} ${impact.variable}`;
  return (
    <html lang="ru" className={fontClasses}>
		<head>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                      if (document.scripts[j].src === r) return;
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  
              ym(105137678, 'init', {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
          }}
        />
		<meta name="google-site-verification" content="n8asrtPoRx4M5v6xchKuoo5CVDG1xtUqjwFnI94r-K8" />
		{process.env.NEXT_PUBLIC_VERSION === 'dev' &&
			<>
				<meta name="robots" content="noindex, nofollow" />
				<meta name="googlebot" content="noindex, nofollow" />
			</>
		}
      </head>
      <body>
		{process.env.NEXT_PUBLIC_VERSION === 'dev' ? (
			<noindex>
				<ThemeWrapper>
					{children}
				</ThemeWrapper>
			</noindex>
		) : (
			<ThemeWrapper>
				{children}
				<JivoChat />
			</ThemeWrapper>
		)}
      </body>
    </html>
  );
}
