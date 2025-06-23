import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const goaLocationId = 'cmc4q1ryp0000tqn832tys4yf';

  // Cleanup old activities and attractions for Goa
  await prisma.activity.deleteMany({
    where: {
      attraction: {
        locationId: goaLocationId
      }
    }
  });

  await prisma.attraction.deleteMany({
    where: {
      locationId: goaLocationId
    }
  });

  // Attractions with nested activities
  const attractionsData = [
    {
      name: 'Baga Beach',
      description: 'Popular beach known for water sports, beach shacks, and vibrant nightlife',
      imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&auto=format&fit=crop',
      category: 'Beach',
      rating: 4.2,
      duration: 240,
      price: 0,
      locationId: goaLocationId,
      activities: {
        create: [
          {
            name: 'Parasailing',
            description: 'Soar high above the beach with stunning aerial views',
            duration: 30,
            price: 800,
            category: 'Water Sports',
            latitude: 15.5558,
            longitude: 73.7539
          },
          {
            name: 'Jet Skiing',
            description: 'High-speed water adventure across the waves',
            duration: 20,
            price: 1200,
            category: 'Water Sports',
            latitude: 15.5558,
            longitude: 73.7539
          },
          {
            name: 'Banana Boat Ride',
            description: 'Group water ride on an inflatable banana-shaped boat',
            duration: 15,
            price: 500,
            category: 'Water Sports',
            latitude: 15.5558,
            longitude: 73.7539
          },
          {
            name: 'Sunset Cruise',
            description: 'Evening boat ride to enjoy the Goan sunset',
            duration: 60,
            price: 1000,
            category: 'Leisure',
            latitude: 15.5558,
            longitude: 73.7539
          }
        ]
      }
    },
    {
      name: 'Dudhsagar Falls',
      description: 'Spectacular four-tiered waterfall, one of India’s tallest waterfalls',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
      category: 'Nature',
      rating: 4.6,
      duration: 360,
      price: 500,
      locationId: goaLocationId,
      activities: {
        create: [
          {
            name: 'Jeep Safari',
            description: 'Off-road adventure through the jungle to reach the falls',
            duration: 180,
            price: 1500,
            category: 'Adventure',
            latitude: 15.3144,
            longitude: 74.3144
          },
          {
            name: 'Trekking',
            description: 'Scenic trek through the Western Ghats to the waterfall',
            duration: 240,
            price: 500,
            category: 'Adventure',
            latitude: 15.3144,
            longitude: 74.3144
          },
          {
            name: 'Photography Walk',
            description: 'Capture beautiful waterfall views and wildlife',
            duration: 60,
            price: 200,
            category: 'Nature',
            latitude: 15.3144,
            longitude: 74.3144
          },
          {
            name: 'Bird Watching',
            description: 'Explore diverse bird species around the falls',
            duration: 90,
            price: 300,
            category: 'Nature',
            latitude: 15.3144,
            longitude: 74.3144
          }
        ]
      }
    },
    {
      name: 'Old Goa Churches',
      description: 'UNESCO World Heritage site with beautiful Portuguese colonial architecture',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
      category: 'Heritage',
      rating: 4.4,
      duration: 180,
      price: 0,
      locationId: goaLocationId,
      activities: {
        create: [
          {
            name: 'Church Tour',
            description: 'Guided visit through the major Old Goa churches',
            duration: 90,
            price: 400,
            category: 'Cultural',
            latitude: 15.5046,
            longitude: 73.9129
          },
          {
            name: 'Museum Visit',
            description: 'Explore Goa’s Christian art and Portuguese artifacts',
            duration: 60,
            price: 150,
            category: 'Cultural',
            latitude: 15.5046,
            longitude: 73.9129
          },
          {
            name: 'Architecture Walk',
            description: 'Discover Baroque and Manueline styles in church design',
            duration: 45,
            price: 250,
            category: 'Heritage',
            latitude: 15.5046,
            longitude: 73.9129
          },
          {
            name: 'Evening Mass',
            description: 'Experience spiritual ambience at Se Cathedral',
            duration: 30,
            price: 0,
            category: 'Spiritual',
            latitude: 15.5046,
            longitude: 73.9129
          }
        ]
      }
    },
    {
      name: 'Bogmalo Beach',
      description: 'Charming beach-side village with peaceful shores and a local vibe',
      imageUrl: 'https://www.tourmyindia.com/states/goa/image/anjuna-beach-banner.webp',
      category: 'Beach',
      rating: 4.5,
      duration: 240,
      price: 200,
      locationId: goaLocationId,
      activities: {
        create: [
          {
            name: 'Village Tour',
            description: 'Stroll through Bogmalo’s coastal homes and market',
            duration: 120,
            price: 300,
            category: 'Cultural',
            latitude: 15.3915,
            longitude: 73.8352
          },
          {
            name: 'Scuba Diving',
            description: 'Underwater diving adventure with marine life',
            duration: 90,
            price: 2500,
            category: 'Water Sports',
            latitude: 15.3915,
            longitude: 73.8352
          },
          {
            name: 'Beachside Yoga',
            description: 'Peaceful yoga session by the sea',
            duration: 60,
            price: 200,
            category: 'Wellness',
            latitude: 15.3915,
            longitude: 73.8352
          },
          {
            name: 'Goan Cooking Class',
            description: 'Learn to prepare local seafood delicacies',
            duration: 120,
            price: 700,
            category: 'Food & Culture',
            latitude: 15.3915,
            longitude: 73.8352
          }
        ]
      }
    },
    {
      name: 'Chapora Fort',
      description: 'Historic fort offering panoramic views of Vagator beach and the sea',
      imageUrl: 'https://images.unsplash.com/photo-1626105011497-f2df0de5cc62?w=800&auto=format&fit=crop',
      category: 'Historical',
      rating: 4.3,
      duration: 120,
      price: 50,
      locationId: goaLocationId,
      activities: {
        create: [
          {
            name: 'Sunset Viewpoint',
            description: 'Catch a breathtaking sunset from the fort walls',
            duration: 60,
            price: 0,
            category: 'Nature',
            latitude: 15.5942,
            longitude: 73.7386
          },
          {
            name: 'Historical Tour',
            description: 'Guided walk through Chapora’s history and battles',
            duration: 45,
            price: 200,
            category: 'History',
            latitude: 15.5942,
            longitude: 73.7386
          },
          {
            name: 'Fort Photography',
            description: 'Capture panoramic views and rustic walls',
            duration: 30,
            price: 100,
            category: 'Leisure',
            latitude: 15.5942,
            longitude: 73.7386
          },
          {
            name: 'Trekking Path',
            description: 'Mild hike up to the fort entrance',
            duration: 40,
            price: 100,
            category: 'Adventure',
            latitude: 15.5942,
            longitude: 73.7386
          }
        ]
      }
    }
  ];

  for (const attraction of attractionsData) {
    await prisma.attraction.create({ data: attraction });
  }

  console.log('🌴 Goa seed data populated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
