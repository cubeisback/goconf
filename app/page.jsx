import HomeClient from './HomeClient';
import { getSeoDataFromParams } from '@/lib/getSeoData';

export async function generateMetadata({ params }) {
//   const seo = await getSeoDataFromParams(['home']); // или другой идентификатор для главной

  return {
    // title: seo?.title || 'Главная страница',
    // description: seo?.description || 'Описание главной страницы',
    // openGraph: {
    //   title: seo?.title,
    //   description: seo?.description,
    // },
	title: 'Афиша бизнес-событий GoCONF',
    description: 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
    openGraph: {
      title: 'Афиша бизнес-событий GoCONF',
      description: 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
    },
  };
}

export default function HomePage({ params }) {
  return <HomeClient params={params} />;
}