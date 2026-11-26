import UserEvents from './UserEventsClient';
import { getDevelopmentFeatures } from '@/lib/getDevelopmentFeatures';

export default async function EventsPage() {
  return <UserEvents developmentFeatures={await getDevelopmentFeatures()} />;
}
