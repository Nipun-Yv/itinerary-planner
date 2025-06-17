'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Location {
  id: string
  name: string
  state: string
  description: string
  imageUrl: string
}

interface LocationSelectionProps {
  onLocationSelect: (locationId: string) => void
}

export default function LocationSelection({ onLocationSelect }: LocationSelectionProps) {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations')
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      console.error('Failed to fetch locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleProceed = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Destination
          </h1>
          <p className="text-xl text-gray-600">
            Select from our curated list of amazing destinations in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedLocation === location.id 
                  ? 'ring-4 ring-blue-500 ring-opacity-50' 
                  : ''
              }`}
              onClick={() => handleLocationClick(location.id)}
            >
              <div className="relative h-48">
                {location.imageUrl && (
                  <Image
                    src={location.imageUrl}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{location.name}</h3>
                  <p className="text-sm opacity-90">{location.state}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{location.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">
                    Explore attractions →
                  </span>
                  {selectedLocation === location.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedLocation && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={handleProceed}
              size="lg"
              className="px-8 py-3 text-lg shadow-lg hover:shadow-xl"
            >
              Continue to Attractions
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}