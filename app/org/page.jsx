import { notFound } from 'next/navigation';

// Страница /org закрыта (404). Компонент OrgClient оставлен для возможного возврата.
export default async function OrgPage() {
  notFound();
}
