import JivoChat from "@/components/JivoChat/JivoChat";
import ThemeWrapper from "./theme-wrapper";
import Script from "next/script";
import localFont from 'next/font/local'
import { isProductionRequest } from '@/lib/getBaseUrl';

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

export async function generateMetadata() {
  const isProd = await isProductionRequest();

  return {
    title: "GoConf",
    description: "Конференции и события",
    // На prod — только indexable директивы, без noindex в исходнике.
    // На dev/local — явный noindex.
    robots: isProd
      ? {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
    icons: {
      icon: [
        {
          url: "/favicon.png",
          type: "image/png",
        },
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
          sizes: "120x120",
        },
        {
          url: "/favicon.ico",
          sizes: "any",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
        },
      ],
    },
  };
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: 'cover'
};

export default async function RootLayout({ children }) {
	const isProd = await isProductionRequest();
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
      </head>
      <body>
		{isProd ? (
			<ThemeWrapper>
				{children}
			</ThemeWrapper>
		) : (
			<noindex>
				<ThemeWrapper>
					{children}
					<JivoChat />
				</ThemeWrapper>
			</noindex>
		)}
      </body>
    </html>
  );
}
