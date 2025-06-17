import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample locations in India
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: 'Delhi',
        state: 'Delhi',
        description: 'The capital city of India, rich in history and culture',
        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Mumbai',
        state: 'Maharashtra',
        description: 'The financial capital of India and Bollywood hub',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Jaipur',
        state: 'Rajasthan',
        description: 'The Pink City, known for its palaces and forts',
        imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Goa',
        state: 'Goa',
        description: 'Famous for its beaches, nightlife, and Portuguese heritage',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Kerala',
        state: 'Kerala',
        description: 'Gods Own Country, known for backwaters and hill stations',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
      },
    }),
  ])

  // Create attractions for Delhi
  const delhiAttractions = await Promise.all([
    prisma.attraction.create({
      data: {
        name: 'Red Fort',
        description: 'Historic fortified palace of the Mughal emperors',
        category: 'Historical',
        rating: 4.5,
        duration: 3,
        price: 35,
        locationId: locations[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b',
      },
    }),
    prisma.attraction.create({
      data: {
        name: 'India Gate',
        description: 'War memorial arch and prominent landmark',
        category: 'Monument',
        rating: 4.3,
        duration: 2,
        price: 0,
        locationId: locations[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      },
    }),
    prisma.attraction.create({
      data: {
        name: 'Lotus Temple',
        description: 'Baháí House of Worship known for its flower-like shape',
        category: 'Religious',
        rating: 4.4,
        duration: 2,
        price: 0,
        locationId: locations[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144',
      },
    }),
  ])

  // Create attractions for Jaipur
  const jaipurAttractions = await Promise.all([
    prisma.attraction.create({
      data: {
        name: 'Amber Fort',
        description: 'Magnificent fort palace overlooking Maota Lake',
        category: 'Historical',
        rating: 4.6,
        duration: 4,
        price: 200,
        locationId: locations[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1599661046827-dacde6a13644',
      },
    }),
    prisma.attraction.create({
      data: {
        name: 'City Palace',
        description: 'Royal residence with museums and courtyards',
        category: 'Palace',
        rating: 4.4,
        duration: 3,
        price: 300,
        locationId: locations[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
      },
    }),
    prisma.attraction.create({
      data: {
        name: 'Hawa Mahal',
        description: 'Palace of Winds with intricate latticework',
        category: 'Architecture',
        rating: 4.2,
        duration: 1,
        price: 50,
        locationId: locations[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c',
      },
    }),
  ])

  // Create activities for attractions
  await Promise.all([
    // Red Fort activities
    prisma.activity.create({
      data: {
        name: 'Guided Historical Tour',
        description: 'Expert-led tour covering Mughal history and architecture',
        duration: 120,
        price: 500,
        category: 'Cultural',
        attractionId: delhiAttractions[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Photography Session',
        description: 'Professional photography in historic settings',
        duration: 60,
        price: 1000,
        category: 'Photography',
        attractionId: delhiAttractions[0].id,
      },
    }),
    // Amber Fort activities
    prisma.activity.create({
      data: {
        name: 'Elephant Ride',
        description: 'Traditional elephant ride up to the fort',
        duration: 30,
        price: 1100,
        category: 'Adventure',
        attractionId: jaipurAttractions[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Light & Sound Show',
        description: 'Evening show depicting the forts history',
        duration: 60,
        price: 200,
        category: 'Entertainment',
        attractionId: jaipurAttractions[0].id,
      },
    }),
  ])

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })