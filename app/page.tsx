'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import TripCalendar from '@/components/TripCalendar'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth') // See step 2 below
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handlePlanClick = () => {
    if (isAuthenticated) {
      router.push('/dashboard/plan')
    } else {
      router.push('/auth')
    }
  }

  if (loading) return <div className="p-4">Checking authentication...</div>

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Itinerary Planner
      </h1>
      <Button onClick={handlePlanClick} className="text-lg px-6 py-3">
        Plan Your Itinerary
      </Button>
    </div>
  )
}
