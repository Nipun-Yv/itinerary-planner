'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Hotel = {
  id: number
  name: string
  price: number
  star_rating: number
  user_rating: string
  description: string
  address: string
  room_description: string
  room_image_url: string
}

type Location = {
  id: string
  name: string
}

export default function HotelPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/locations')
        const data = await res.json()
        setLocations(data)
      } catch (err) {
        console.error('Error fetching locations', err)
      }
    }
    fetchLocations()
  }, [])

  // Fetch hotels on filter change
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedLocation) params.append('locationId', selectedLocation)
        if (selectedStars.length > 0) params.append('stars', selectedStars.join(','))
        if (priceRange) {
          params.append('minPrice', String(priceRange[0]))
          params.append('maxPrice', String(priceRange[1]))
        }

        const res = await fetch(`/api/hotels?${params.toString()}`)
        const data = await res.json()
        setHotels(data)
      } catch (err) {
        console.error('Error fetching hotels:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [selectedLocation, selectedStars, priceRange])

  const toggleStar = (star: number) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    )
  }

  const clearFilters = () => {
    setSelectedLocation('')
    setSelectedStars([])
    setPriceRange([0, 15000])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg text-gray-600">
              Discover amazing hotels at the best prices
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Filter Hotels</h2>
            <button
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Location Filter */}
            <div className="space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm uppercase tracking-wide">
                <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating Filter */}
            <div className="space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm uppercase tracking-wide">
                <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Star Rating
              </label>
              <div className="space-y-3">
                {[5, 4, 3].map(star => (
                  <label key={star} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedStars.includes(star)}
                      onChange={() => toggleStar(star)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="flex items-center text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
                      {Array.from({ length: star }, (_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm font-medium">{star} Star{star > 1 ? 's' : ''}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-2 space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm uppercase tracking-wide">
                <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                Price Range
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={priceRange[1]}
                  onChange={e =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((priceRange[1] - 1000) / (20000 - 1000)) * 100}%, #e5e7eb ${((priceRange[1] - 1000) / (20000 - 1000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600 bg-orange-100 px-3 py-1 rounded-full">
                    ₹{priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">to</span>
                  <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                    ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {loading ? 'Loading...' : `${hotels.length} Hotels Found`}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {selectedLocation || selectedStars.length > 0 || priceRange[1] < 15000 
                ? 'Based on your filters' 
                : 'Showing all available hotels'}
            </p>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="bg-gray-300 h-56 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : hotels.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No hotels found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            hotels.map(hotel => (
              <div
                key={hotel.id}
                onClick={() => router.push(`/hotels/${hotel.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.room_image_url}
                    alt={hotel.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-orange-600 font-bold text-lg">₹{hotel.price.toLocaleString()}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-orange-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                    {hotel.star_rating}★
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
                      {hotel.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{hotel.description}</p>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="line-clamp-1">{hotel.address}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-orange-500 text-sm font-medium">
                        <span className="mr-1">⭐</span>
                        {hotel.star_rating} Stars
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-1">👤</span>
                        {hotel.user_rating}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">{hotel.room_description}</p>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Starting from</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">₹{hotel.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}