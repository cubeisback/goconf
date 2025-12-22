import JivoChat from "@/components/JivoChat/JivoChat";
import ThemeWrapper from "./theme-wrapper";
import Script from "next/script";
import { headers } from "next/headers";

export const metadata = {
  title: "GoConf",
  description: "Конференции и события",
  robots: {
    index: true,
    follow: true,
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

async function getCanonicalUrl() {
  const headersList = await headers();
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = headersList.get('host') || 'localhost:3000';
  const pathname = headersList.get('x-invoke-path') || '/';
  
  return `${protocol}://${host}${pathname}`;
}

export default async function RootLayout({ children }) {
	const canonicalUrl = await getCanonicalUrl();

  return (
    <html lang="ru">
		<head>
		<link rel="canonical" href={canonicalUrl} />
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
