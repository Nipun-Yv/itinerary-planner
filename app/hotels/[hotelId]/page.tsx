import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Users, ArrowLeft, Heart, Share } from 'lucide-react';
import HotelImageSlider from '@/components/HotelImageSlider';
import BookingSidebar from '@/components/BookingSidebar';

// Create a global Prisma instance to avoid multiple connections
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface Hotel {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
  star_rating: number | null;
  user_rating: number | null;
  description: string | null;
  room_description: string | null;
  amenities_list: string | null;
  hotel_image_urls: string | null;
  room_image_url: string | null;
  price: number | null;
  address: string | null;
  locations: {
    id: string;
    name: string;
    state: string;
  } | null;
}

interface PageProps {
  params: {
    hotelId: string;
  };
}

async function getHotel(hotelId: string): Promise<Hotel | null> {
  try {
    const hotelIdNum = parseInt(hotelId);
    if (isNaN(hotelIdNum)) {
      return null;
    }
    const hotel = await prisma.hotels.findUnique({
      where: {
        id: hotelIdNum
      },
      include: {
        locations: {
          select: {
            id: true,
            name: true,
            state: true
          }
        }
      }
    });
    
    return hotel as Hotel | null;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;
  }
}

export default async function HotelDetailsPage({ params }: PageProps) {
  const hotel = await getHotel(params.hotelId);

  if (!hotel) {
    notFound();
  }

  // Parse amenities and images
  const amenities: string[] = hotel.amenities_list ? hotel.amenities_list.split(';').map(a => a.trim()) : [];
  const hotelImages: string[] = hotel.hotel_image_urls ? hotel.hotel_image_urls.split(',').map(url => url.trim()) : [];
  const roomImages: string[] = hotel.room_image_url ? hotel.room_image_url.split(';').map(url => url.trim()) : [];
  
  // Filter out invalid URLs and clean the image URLs
  const cleanImageUrl = (url: string): string => {
    // Handle multiple URLs separated by semicolon, take the first one
    return url.split(';')[0].trim();
  };
  
  const allImages: string[] = [...hotelImages, ...roomImages]
    .map(cleanImageUrl)
    .filter(url => url && url.startsWith('http'));

  // Generate star rating
  const starRating: number = hotel.star_rating || 0;
  const userRating: number = parseFloat(hotel.user_rating?.toString() || '0') || 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/hotels" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Hotels</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
              <Share className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hotel Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < starRating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-1 font-medium">{starRating} star hotel</span>
            </div>

            {/* User Rating */}
            {userRating > 0 && (
              <div className="flex items-center gap-1">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                  {userRating}
                </div>
                <span>Guest rating</span>
              </div>
            )}

            {/* Location */}
            {hotel.locations && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{hotel.locations.name}, {hotel.locations.state}</span>
              </div>
            )}
          </div>

          {hotel.address && (
            <p className="text-muted-foreground">{hotel.address}</p>
          )}
        </div>

        {/* Image Slider - Replaced the grid layout */}
        <HotelImageSlider 
          images={allImages} 
          hotelName={hotel.name}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Description */}
            {hotel.description && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this hotel</h2>
                <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
              </section>
            )}

            {/* Room Description */}
            {hotel.room_description && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Details</h2>
                <p className="text-muted-foreground leading-relaxed">{hotel.room_description}</p>
              </section>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                      {getAmenityIcon(amenity)}
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location */}
            {(hotel.latitude && hotel.longitude) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <p>Map would be displayed here</p>
                    <p className="text-sm">
                      Lat: {typeof hotel.latitude === 'number' ? hotel.latitude.toFixed(6) : hotel.latitude?.toString()}, 
                      Lng: {typeof hotel.longitude === 'number' ? hotel.longitude.toFixed(6) : hotel.longitude?.toString()}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <BookingSidebar 
            hotelName={hotel.name}
            price={hotel.price}
            />
                  
            </div>
          </div>
    </main>
  );
}

// Helper function to get amenity icons
function getAmenityIcon(amenity: string): JSX.Element {
  const amenityLower = amenity.toLowerCase();
  
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
    return <Wifi className="w-5 h-5 text-orange-500" />;
  } else if (amenityLower.includes('parking') || amenityLower.includes('car')) {
    return <Car className="w-5 h-5 text-orange-500" />;
  } else if (amenityLower.includes('coffee') || amenityLower.includes('breakfast')) {
    return <Coffee className="w-5 h-5 text-orange-500" />;
  } else if (amenityLower.includes('gym') || amenityLower.includes('fitness')) {
    return <Dumbbell className="w-5 h-5 text-orange-500" />;
  } else if (amenityLower.includes('pool') || amenityLower.includes('spa')) {
    return <Users className="w-5 h-5 text-orange-500" />;
  } else {
    return <div className="w-5 h-5 bg-orange-500 rounded-full flex-shrink-0" />;
  }
}