import { headers } from 'next/headers';
import { allowsDevelopmentFeatures } from './developmentFeatures';

export async function getDevelopmentFeatures() {
  const requestHeaders = await headers();
  return allowsDevelopmentFeatures(
    requestHeaders.get('x-forwarded-host'),
    requestHeaders.get('host'),
  );
}
