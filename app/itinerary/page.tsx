"use client";
import TripCalendar from "@/components/TripCalendar";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity } from "@/types/Activity";
import axios from "axios";
import { redirect } from "next/navigation";
import { CalendarDays, Filter, MapPin, Plus } from "lucide-react";

const ItineraryPage = () => {
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setSelectedActivities(response.data);
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
    <div className="w-full h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Itinerary</h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/plan">
            <Button variant="outline" size="sm">
              New Itinerary
            </Button>
          </Link>
          <LogoutButton />
        </div>
      </div>

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
                  <button className="inline-flex items-center px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50 transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">
                      no. of activities
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {5} fetch krke abhi it's mock
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
                    <p className="text-2xl font-bold text-gray-900">location</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <TripCalendar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
