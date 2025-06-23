import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Users, ArrowLeft, Heart, Share, Calendar, Clock, Shield } from 'lucide-react';
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

  // Create Google Maps embed URL
  const createMapUrl = (lat: number, lng: number, hotelName: string): string => {
    const encodedName = encodeURIComponent(hotelName);
    return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${lat},${lng}&zoom=15&maptype=roadmap`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/hotels" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Hotels</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors rounded-xl hover:bg-orange-50 group">
                <Share className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50 group">
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">Save</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hotel Title Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{hotel.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm mb-4">
                {/* Star Rating */}
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < starRating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-700">{starRating} Star Hotel</span>
                </div>

                {/* User Rating */}
                {userRating > 0 && (
                  <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-orange-100">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {userRating}
                    </div>
                    <span className="font-semibold text-gray-700">Guest Rating</span>
                  </div>
                )}
              </div>

              {/* Location */}
              {hotel.locations && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">{hotel.locations.name}, {hotel.locations.state}</span>
                </div>
              )}

              {hotel.address && (
                <p className="text-gray-600 text-lg">{hotel.address}</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">₹{hotel.price?.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>
              <div className="flex sm:flex-col gap-2">
                <button className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-sm">
                  Book Now
                </button>
                <button className="flex-1 border-2 border-orange-600 text-orange-600 px-4 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Image Gallery */}
        <div className="mb-10">
          {allImages.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96 lg:h-[500px]">
              {/* Main Image */}
              <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={allImages[0]}
                  alt={`${hotel.name} - Main View`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Side Images */}
              {allImages.slice(1, 5).map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={image}
                    alt={`${hotel.name} - View ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              ))}
              
              {/* Show More Button */}
              {allImages.length > 5 && (
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={allImages[5]}
                    alt={`${hotel.name} - View 6`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <button className="text-white font-semibold text-lg hover:text-orange-200 transition-colors">
                      +{allImages.length - 5} More Photos
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-96 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8" />
                </div>
                <p className="text-lg font-medium">No images available</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Hotel Description */}
            {hotel.description && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  About This Hotel
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{hotel.description}</p>
              </section>
            )}

            {/* Room Description */}
            {hotel.room_description && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  Room Details
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{hotel.room_description}</p>
              </section>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  Amenities & Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors border border-gray-100">
                      <div className="flex-shrink-0">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location with Interactive Map */}
            {(hotel.latitude && hotel.longitude) && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  Location & Map
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">{hotel.address}</p>
                      <p className="text-sm text-gray-600">
                        Coordinates: {typeof hotel.latitude === 'number' ? hotel.latitude.toFixed(6) : hotel.latitude?.toString()}, {typeof hotel.longitude === 'number' ? hotel.longitude.toFixed(6) : hotel.longitude?.toString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${hotel.longitude}!3d${hotel.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${Math.abs(hotel.latitude)}°${hotel.latitude >= 0 ? 'N' : 'S'}%20${Math.abs(hotel.longitude)}°${hotel.longitude >= 0 ? 'E' : 'W'}!5e0!3m2!1sen!2sin!4v1638360721111!5m2!1sen!2sin`}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${hotel.name} Location Map`}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Enhanced Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSidebar 
                hotelName={hotel.name}
                price={hotel.price}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Enhanced helper function to get amenity icons
function getAmenityIcon(amenity: string): JSX.Element {
  const amenityLower = amenity.toLowerCase();
  
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
    return <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Wifi className="w-5 h-5 text-blue-600" /></div>;
  } else if (amenityLower.includes('parking') || amenityLower.includes('car')) {
    return <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><Car className="w-5 h-5 text-green-600" /></div>;
  } else if (amenityLower.includes('coffee') || amenityLower.includes('breakfast')) {
    return <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><Coffee className="w-5 h-5 text-amber-600" /></div>;
  } else if (amenityLower.includes('gym') || amenityLower.includes('fitness')) {
    return <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><Dumbbell className="w-5 h-5 text-red-600" /></div>;
  } else if (amenityLower.includes('pool') || amenityLower.includes('spa')) {
    return <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-cyan-600" /></div>;
  } else {
    return <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><div className="w-5 h-5 bg-orange-500 rounded-full" /></div>;
  }
}