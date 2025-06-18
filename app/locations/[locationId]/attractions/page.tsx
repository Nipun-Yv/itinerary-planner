import { prisma } from '@/lib/prisma';
export default async function AttractionsPage({ params }) {
  const attractions = await prisma.attraction.findMany({
    where: { locationId: params.locationId, isActive: true },
  });
  return (
    <div>
      {attractions.map(attr => (
        <a key={attr.id} href={`/locations/${params.locationId}/attractions/${attr.id}/activities`}>{attr.name}</a>
      ))}
    </div>
  );
}