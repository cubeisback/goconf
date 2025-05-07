import ThemeWrapper from "./theme-wrapper";

export const metadata = {
  title: "GoConf",
  description: "Конференции и события",
};
export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
  };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
