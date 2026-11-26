import { getDevelopmentFeatures } from '@/lib/getDevelopmentFeatures';

// Server Component. Wrap preview UI here so it is omitted from production responses.
export default async function DevOnly({ children }) {
  const allowed = await getDevelopmentFeatures();
  return allowed ? children : null;
}
