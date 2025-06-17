'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Attraction {
  id: string
  name: string
  description: string
  category: string
  rating: number
  duration: number
  price: number
  imageUrl: string
}

interface AttractionSelectionProps {
  locationId: string
  onAttractionsSelect: (attractionIds: string[]) => void
  onBack: () => void
}

export default function AttractionSelection({ 
  locationId, 
  onAttractionsSelect, 
  onBack 
}: AttractionSelectionProps) {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAttractions()
  }, [locationId])

  const fetchAttractions = async () => {
    try {
      const response = await fetch(`/api/locations/${locationId}/attractions`)
      const data = await response.json()
      setAttractions(data)
    } catch (error) {
      console.error('Failed to fetch attractions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAttractionToggle = (attractionId: string) => {
    setSelectedAttractions(prev => 
      prev.includes(attractionId)
        ? prev.filter(id => id !== attractionId)
        : [...prev, attractionId]
    )
  }

  const handleProceed = () => {
    if (selectedAttractions.length > 0) {
      onAttractionsSelect(selectedAttractions)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attractions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4"
          >
            ← Back to Destinations
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Attractions
          </h1>
          <p className="text-xl text-gray-600">
            Choose the places you'd like to visit ({selectedAttractions.length} selected)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedAttractions.includes(attraction.id)
                  ? 'ring-4 ring-green-500 ring-opacity-50'
                  : ''
              }`}
              onClick={() => handleAttractionToggle(attraction.id)}
            >
              <div className="relative h-48">
                {attraction.imageUrl && (
                  <Image
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 right-4">
                  {selectedAttractions.includes(attraction.id) && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{attraction.name}</h3>
                  <p className="text-sm opacity-90">{attraction.category}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm">{attraction.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm font-medium">{attraction.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{attraction.duration}h duration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {attraction.price === 0 ? 'Free' : `₹${attraction.price}`}
                  </span>
                  <span className="text-sm text-blue-600 font-medium">
                    {selectedAttractions.includes(attraction.id) ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAttractions.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={handleProceed}
              size="lg"
              className="px-8 py-3 text-lg shadow-lg hover:shadow-xl"
            >
              Continue to Activities ({selectedAttractions.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}