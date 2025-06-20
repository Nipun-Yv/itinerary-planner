const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing data...');
  
  // Clear all data in the correct order (respecting foreign key constraints)
  await prisma.itineraryItem.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.attraction.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ All data cleared successfully');
  console.log('🌱 Starting to seed database...');

  // Seed Locations
  const locations = await prisma.location.createMany({
    data: [
      {
        name: 'Goa',
        state: 'Goa',
        description: 'Beautiful beaches, Portuguese heritage, vibrant nightlife, and water sports paradise',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        isActive: true
      },
      {
        name: 'Kerala',
        state: 'Kerala',
        description: 'Gods own country with backwaters, hill stations, spice plantations, and Ayurvedic treatments',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        isActive: true
      },
      {
        name: 'Rajasthan',
        state: 'Rajasthan',
        description: 'Land of kings featuring majestic palaces, desert safaris, and rich cultural heritage',
        imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
        isActive: true
      },
      {
        name: 'Kashmir',
        state: 'Jammu and Kashmir',
        description: 'Paradise on earth with stunning valleys, snow-capped mountains, and serene lakes',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        isActive: true
      },
      {
        name: 'Himachal Pradesh',
        state: 'Himachal Pradesh',
        description: 'Mountain paradise with adventure sports, hill stations, and scenic landscapes',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        isActive: true
      },
      {
        name: 'Tamil Nadu',
        state: 'Tamil Nadu',
        description: 'Rich cultural heritage with ancient temples, classical arts, and diverse landscapes',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        isActive: true
      }
    ]
  });

  console.log('📍 Locations seeded successfully');

  // Get created locations for reference
  const createdLocations = await prisma.location.findMany();
  const goaId = createdLocations.find(l => l.name === 'Goa')?.id;
  const keralaId = createdLocations.find(l => l.name === 'Kerala')?.id;
  const rajasthanId = createdLocations.find(l => l.name === 'Rajasthan')?.id;
  const kashmirId = createdLocations.find(l => l.name === 'Kashmir')?.id;
  const himachalId = createdLocations.find(l => l.name === 'Himachal Pradesh')?.id;
  const tamilNaduId = createdLocations.find(l => l.name === 'Tamil Nadu')?.id;

  // Seed Attractions
  const attractions = await prisma.attraction.createMany({
    data: [
      // Goa Attractions
      {
        name: 'Baga Beach',
        description: 'Popular beach known for water sports, beach shacks, and vibrant nightlife',
        imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800',
        category: 'Beach',
        rating: 4.2,
        duration: 240,
        price: 0,
        locationId: goaId
      },
      {
        name: 'Dudhsagar Falls',
        description: 'Spectacular four-tiered waterfall, one of Indias tallest waterfalls',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        category: 'Nature',
        rating: 4.6,
        duration: 360,
        price: 500,
        locationId: goaId
      },
      {
        name: 'Old Goa Churches',
        description: 'UNESCO World Heritage site with beautiful Portuguese colonial architecture',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        category: 'Heritage',
        rating: 4.4,
        duration: 180,
        price: 0,
        locationId: goaId
      },

      // Kerala Attractions
      {
        name: 'Alleppey Backwaters',
        description: 'Serene network of canals, rivers, and lakes perfect for houseboat cruises',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        category: 'Nature',
        rating: 4.7,
        duration: 480,
        price: 2500,
        locationId: keralaId
      },
      {
        name: 'Munnar Tea Gardens',
        description: 'Picturesque hill station with rolling tea plantations and cool climate',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        category: 'Nature',
        rating: 4.5,
        duration: 300,
        price: 200,
        locationId: keralaId
      },
      {
        name: 'Thekkady Wildlife Sanctuary',
        description: 'Famous for elephant and tiger sightings, boat rides on Periyar Lake',
        imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
        category: 'Wildlife',
        rating: 4.3,
        duration: 360,
        price: 800,
        locationId: keralaId
      },

      // Rajasthan Attractions
      {
        name: 'Amber Fort',
        description: 'Magnificent hilltop fort showcasing Rajput architecture and history',
        imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
        category: 'Heritage',
        rating: 4.8,
        duration: 180,
        price: 200,
        locationId: rajasthanId
      },
      {
        name: 'Thar Desert Safari',
        description: 'Experience camel rides, sand dunes, and traditional Rajasthani culture',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
        category: 'Adventure',
        rating: 4.4,
        duration: 480,
        price: 1500,
        locationId: rajasthanId
      },
      {
        name: 'City Palace Udaipur',
        description: 'Stunning palace complex overlooking Lake Pichola with intricate architecture',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        category: 'Heritage',
        rating: 4.6,
        duration: 240,
        price: 300,
        locationId: rajasthanId
      },

      // Kashmir Attractions
      {
        name: 'Dal Lake',
        description: 'Iconic lake with houseboats, floating gardens, and stunning mountain views',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category: 'Nature',
        rating: 4.9,
        duration: 300,
        price: 1000,
        locationId: kashmirId
      },
      {
        name: 'Gulmarg Ski Resort',
        description: 'Premier skiing destination with cable car rides and snow activities',
        imageUrl: 'https://images.unsplash.com/photo-1551524164-6cf31ac94100?w=800',
        category: 'Adventure',
        rating: 4.5,
        duration: 420,
        price: 2000,
        locationId: kashmirId
      },

      // Himachal Pradesh Attractions
      {
        name: 'Rohtang Pass',
        description: 'High mountain pass offering panoramic views and adventure activities',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        category: 'Adventure',
        rating: 4.3,
        duration: 360,
        price: 500,
        locationId: himachalId
      },
      {
        name: 'Shimla Mall Road',
        description: 'Colonial-era shopping street with Victorian architecture and mountain views',
        imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800',
        category: 'Heritage',
        rating: 4.1,
        duration: 180,
        price: 0,
        locationId: himachalId
      },

      // Tamil Nadu Attractions
      {
        name: 'Meenakshi Temple',
        description: 'Ancient temple complex with stunning Dravidian architecture and colorful sculptures',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        category: 'Heritage',
        rating: 4.7,
        duration: 120,
        price: 0,
        locationId: tamilNaduId
      },
      {
        name: 'Ooty Hill Station',
        description: 'Queen of hill stations with tea gardens, botanical gardens, and toy train',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        category: 'Nature',
        rating: 4.4,
        duration: 480,
        price: 300,
        locationId: tamilNaduId
      }
    ]
  });

  console.log('🏛️ Attractions seeded successfully');

  // Get created attractions for activities
  const createdAttractions = await prisma.attraction.findMany();

  // Seed Activities
  const activitiesData = [];

  // Baga Beach Activities
  const bagaBeach = createdAttractions.find(a => a.name === 'Baga Beach');
  if (bagaBeach) {
    activitiesData.push(
      {
        name: 'Parasailing',
        description: 'Soar high above the beach with stunning aerial views',
        duration: 30,
        price: 800,
        category: 'Water Sports',
        latitude: 15.5558,
        longitude: 73.7539,
        attractionId: bagaBeach.id
      },
      {
        name: 'Jet Skiing',
        description: 'High-speed water adventure across the waves',
        duration: 20,
        price: 1200,
        category: 'Water Sports',
        latitude: 15.5558,
        longitude: 73.7539,
        attractionId: bagaBeach.id
      },
      {
        name: 'Beach Volleyball',
        description: 'Fun team sport on the sandy beach',
        duration: 60,
        price: 200,
        category: 'Sports',
        latitude: 15.5558,
        longitude: 73.7539,
        attractionId: bagaBeach.id
      }
    );
  }

  // Dudhsagar Falls Activities
  const dudhsagar = createdAttractions.find(a => a.name === 'Dudhsagar Falls');
  if (dudhsagar) {
    activitiesData.push(
      {
        name: 'Jeep Safari',
        description: 'Off-road adventure through the jungle to reach the falls',
        duration: 180,
        price: 1500,
        category: 'Adventure',
        latitude: 15.3144,
        longitude: 74.3144,
        attractionId: dudhsagar.id
      },
      {
        name: 'Trekking',
        description: 'Scenic trek through the Western Ghats to the waterfall',
        duration: 240,
        price: 500,
        category: 'Adventure',
        latitude: 15.3144,
        longitude: 74.3144,
        attractionId: dudhsagar.id
      }
    );
  }

  // Alleppey Backwaters Activities
  const alleppey = createdAttractions.find(a => a.name === 'Alleppey Backwaters');
  if (alleppey) {
    activitiesData.push(
      {
        name: 'Houseboat Cruise',
        description: 'Overnight stay in traditional Kerala houseboat',
        duration: 1440,
        price: 8000,
        category: 'Accommodation',
        latitude: 9.4981,
        longitude: 76.3388,
        attractionId: alleppey.id
      },
      {
        name: 'Canoe Ride',
        description: 'Peaceful paddle through narrow canals',
        duration: 120,
        price: 800,
        category: 'Water Sports',
        latitude: 9.4981,
        longitude: 76.3388,
        attractionId: alleppey.id
      },
      {
        name: 'Village Tour',
        description: 'Experience local life and culture',
        duration: 180,
        price: 600,
        category: 'Cultural',
        latitude: 9.4981,
        longitude: 76.3388,
        attractionId: alleppey.id
      }
    );
  }

  // Thar Desert Safari Activities
  const tharDesert = createdAttractions.find(a => a.name === 'Thar Desert Safari');
  if (tharDesert) {
    activitiesData.push(
      {
        name: 'Camel Ride',
        description: 'Traditional desert transport with sunset views',
        duration: 120,
        price: 800,
        category: 'Adventure',
        latitude: 26.9124,
        longitude: 70.9083,
        attractionId: tharDesert.id
      },
      {
        name: 'Desert Camping',
        description: 'Overnight camping under the stars',
        duration: 720,
        price: 3000,
        category: 'Accommodation',
        latitude: 26.9124,
        longitude: 70.9083,
        attractionId: tharDesert.id
      },
      {
        name: 'Folk Dance Show',
        description: 'Traditional Rajasthani cultural performance',
        duration: 90,
        price: 500,
        category: 'Cultural',
        latitude: 26.9124,
        longitude: 70.9083,
        attractionId: tharDesert.id
      }
    );
  }

  // Dal Lake Activities
  const dalLake = createdAttractions.find(a => a.name === 'Dal Lake');
  if (dalLake) {
    activitiesData.push(
      {
        name: 'Shikara Ride',
        description: 'Traditional Kashmiri boat ride on the lake',
        duration: 120,
        price: 600,
        category: 'Water Sports',
        latitude: 34.0837,
        longitude: 74.8370,
        attractionId: dalLake.id
      },
      {
        name: 'Houseboat Stay',
        description: 'Unique accommodation experience on the lake',
        duration: 1440,
        price: 4000,
        category: 'Accommodation',
        latitude: 34.0837,
        longitude: 74.8370,
        attractionId: dalLake.id
      }
    );
  }

  // Gulmarg Activities
  const gulmarg = createdAttractions.find(a => a.name === 'Gulmarg Ski Resort');
  if (gulmarg) {
    activitiesData.push(
      {
        name: 'Skiing',
        description: 'Alpine skiing on pristine snow slopes',
        duration: 240,
        price: 2500,
        category: 'Adventure',
        latitude: 34.0484,
        longitude: 74.3864,
        attractionId: gulmarg.id
      },
      {
        name: 'Gondola Ride',
        description: 'Cable car ride to Apharwat Peak',
        duration: 60,
        price: 1200,
        category: 'Sightseeing',
        latitude: 34.0484,
        longitude: 74.3864,
        attractionId: gulmarg.id
      },
      {
        name: 'Snowboarding',
        description: 'Thrilling snowboard adventure',
        duration: 180,
        price: 2000,
        category: 'Adventure',
        latitude: 34.0484,
        longitude: 74.3864,
        attractionId: gulmarg.id
      }
    );
  }

  await prisma.activity.createMany({
    data: activitiesData
  });

  console.log('🎯 Activities seeded successfully');
  console.log('🎉 Database seeding completed!');
  
  // Display summary
  const totalLocations = await prisma.location.count();
  const totalAttractions = await prisma.attraction.count();
  const totalActivities = await prisma.activity.count();
  
  console.log('\n📊 Seeding Summary:');
  console.log(`   📍 Locations: ${totalLocations}`);
  console.log(`   🏛️ Attractions: ${totalAttractions}`);
  console.log(`   🎯 Activities: ${totalActivities}`);
  console.log(`   👤 Users: 0 (excluded as requested)`);
  console.log(`   📋 Itineraries: 0 (excluded as requested)`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });