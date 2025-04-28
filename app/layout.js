import ThemeWrapper from "./theme-wrapper";

export const metadata = {
  title: "GoConf",
  description: "Конференции и события",
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
