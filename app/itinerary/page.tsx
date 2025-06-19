"use client";
import TripCalendar from "@/components/TripCalendar";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity } from "@/types/Activity";
import axios from "axios";
import { redirect } from "next/navigation";

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
      } catch (err:any) {
        console.log(err.message);
      }
      finally{
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
        <TripCalendar />
      </div>
    </div>
  );
};

export default ItineraryPage;
