"use client";

import TripCalendar from "@/components/TripCalendar";
import { useEffect, useState } from "react";
import { Activity } from "@/types/Activity";
import axios from "axios";
import { redirect } from "next/navigation";
import { CalendarDays, Filter, MapPin, Plus } from "lucide-react";
import RouteMap from "@/components/RouteMap";
import { StreamingContextProvider } from "@/contexts/StreamingContext";
import { HotelCarousel } from "@/components/HotelCarousel";
import { useHotelContext } from "@/contexts/HotelContext";
import { useAutoScroll } from "@/hooks/useAutoScroll";

const ItineraryPage = () => {
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const { hotels } = useHotelContext();
  const carouselRef = useAutoScroll(hotels);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    async function getActivities() {
      try {
        const { data: user } = await axios.get("/api/user");
        if (!user) {
          redirect("/auth");
        }

        const springApiBaseUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
        const response = await axios.get(
          `${springApiBaseUrl}/activities?userId=${user.id}`
        );

        const fetchedActivities = response.data.data;
        setSelectedActivities(fetchedActivities);

        if (fetchedActivities.length > 0) {
          const locationRes = await axios.get(
            `/api/location-from-activity?activityId=${fetchedActivities[0].id}`
          );
          setLocationName(locationRes.data.location || "Unknown");
        }
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getActivities();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-600">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <StreamingContextProvider>
      <div className="w-full h-screen bg-gray-50">
        <div className="h-full p-6">
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-6 mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CalendarDays className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Trip Calendar
                      </h1>
                      <p className="text-orange-600">
                        Manage your travel itinerary
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">
                        No. of activities
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedActivities.length}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">
                        Trip to
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {locationName || "Loading..."}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-2">
                <TripCalendar />
                <RouteMap />
              </div>

              <div ref={carouselRef}>
                <HotelCarousel hotels={hotels} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StreamingContextProvider>
  );
};

export default ItineraryPage;
