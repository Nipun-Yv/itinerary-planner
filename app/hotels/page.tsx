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
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedLocation) params.append('locationId', selectedLocation)
        if (selectedStars.length > 0) params.append('stars', selectedStars.join(','))
        params.append('minPrice', String(priceRange[0]))
        params.append('maxPrice', String(priceRange[1]))

        const res = await fetch(`/api/hotels?${params.toString()}`)
        const data = await res.json()
        
        // Check if response is successful and data is an array
        if (res.ok && Array.isArray(data)) {
          setHotels(data)
        } else {
          console.error('API Error:', data)
          setHotels([])
        }
      } catch (err) {
        console.error('Error fetching hotels:', err)
        setHotels([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce the API call to prevent too many requests
    const timeoutId = setTimeout(() => {
      fetchHotels()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [selectedLocation, selectedStars, priceRange])

  const toggleStar = (star: number) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    )
  }

  const clearFilters = () => {
    setSelectedLocation('')
    setSelectedStars([])
    setPriceRange([1000, 15000])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3">
          Find Your Perfect Stay
        </h1>
        <p className="text-gray-600 text-lg">Discover amazing hotels with the best deals</p>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm border border-orange-100 p-8 rounded-2xl shadow-xl mb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Search Filters</h2>
          </div>
          <button 
            onClick={clearFilters} 
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span>✕</span>
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Filter */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <span className="text-orange-500">📍</span>
              Location
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-orange-100 focus:border-orange-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <span className="text-orange-500">⭐</span>
              Star Rating
            </label>
            <div className="flex gap-3">
              {[3, 4, 5].map(star => (
                <label 
                  key={star} 
                  className={`flex-1 relative cursor-pointer transition-all duration-200 ${
                    selectedStars.includes(star) 
                      ? 'bg-orange-500 text-white shadow-lg transform scale-105' 
                      : 'bg-orange-50 hover:bg-orange-100 text-orange-600'
                  } rounded-xl p-3 text-center font-medium`}
                >
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(star)}
                    onChange={() => toggleStar(star)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{'⭐'.repeat(star)}</span>
                    <span className="text-xs">{star} Star{star > 1 ? 's' : ''}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <span className="text-orange-500">💰</span>
              Price Range
            </label>
            <div className="bg-orange-50 p-4 rounded-xl space-y-4">
              <div className="relative">
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={priceRange[0]}
                  onChange={e => {
                    const min = Math.min(parseInt(e.target.value), priceRange[1])
                    setPriceRange([min, priceRange[1]])
                  }}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={priceRange[1]}
                  onChange={e => {
                    const max = Math.max(parseInt(e.target.value), priceRange[0])
                    setPriceRange([priceRange[0], max])
                  }}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-orange-600 shadow-sm">
                  ₹{priceRange[0].toLocaleString()}
                </div>
                <div className="text-orange-400">—</div>
                <div className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-orange-600 shadow-sm">
                  ₹{priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                Searching...
              </div>
            ) : (
              <span>
                <span className="text-orange-500">{hotels.length}</span> Hotels Found
              </span>
            )}
          </h3>
          {!loading && hotels.length > 0 && (
            <div className="text-sm text-gray-500">
              Showing best matches for your search
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton cards
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : hotels.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No hotels found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            hotels.map(hotel => (
              <div
                key={hotel.id}
                onClick={() => router.push(`/hotels/${hotel.id}`)}
                className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={hotel.room_image_url}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{hotel.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.address}</p>
                  <p className="mt-1 text-orange-600 font-semibold">₹{hotel.price.toLocaleString()}</p>
                  <div className="text-sm text-gray-500 mt-1">⭐ {hotel.star_rating} | 👤 {hotel.user_rating}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}