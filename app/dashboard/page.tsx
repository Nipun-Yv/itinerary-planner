import { requireAuth } from '@/lib/auth';
export default async function Dashboard() {
  await requireAuth();
  return <a href="/plan">Start Planning</a>;
}