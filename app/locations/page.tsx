import { prisma } from '@/lib/prisma';
export default async function LocationsPage() {
  const locations = await prisma.location.findMany({ where: { isActive: true } });
  return (
    <div>
      {locations.map(loc => (
        <a key={loc.id} href={`/locations/${loc.id}/attractions`}>{loc.name}</a>
      ))}
    </div>
  );
}