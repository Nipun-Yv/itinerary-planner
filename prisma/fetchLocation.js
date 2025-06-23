const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const locationId = "cmc4q1ryp0000tqn832tys4yf";

  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: {
      id: true,
      name: true,
      state: true,
      description: true,
      imageUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,

      attractions: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          category: true,
          rating: true,
          duration: true,
          price: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          locationId: true,

          activities: {
            select: {
              id: true,
              name: true,
              description: true,
              duration: true,
              price: true,
              category: true,
              latitude: true,
              longitude: true,
              isActive: true,
              createdAt: true,
              updatedAt: true,
              attractionId: true,
            }
          }
        }
      },

      hotels: {
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          star_rating: true,
          user_rating: true,
          description: true,
          room_description: true,
          amenities_list: true,
          hotel_image_urls: true,
          room_image_url: true,
          price: true,
          locationId: true,
          address: true,
        }
      }
    }
  });

  // Clean decimals and internal types
  const clean = JSON.parse(JSON.stringify(location));

  console.dir(clean, { depth: null });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
