import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import TripCalendar from "@/components/TripCalendar"
import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/LogoutButton'

const ItineraryPage = async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Itinerary</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            New Itinerary
          </Button>
          <LogoutButton />
        </div>
      </div>

      <div className="h-full p-6">
        <TripCalendar />
      </div>
    </div>
  )
}

export default ItineraryPage