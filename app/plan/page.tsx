'use client';
import { useRouter } from 'next/navigation';
export default function PlanPage() {
  const router = useRouter();
  const handleContinue = () => router.push('/locations');
  return <button onClick={handleContinue}>Choose Location</button>;
}
