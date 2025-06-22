"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function ActivitiesPage({ params }: { params: any }) {
  const {locationId}=React.use(params) as any;
  const [activities, setActivities] = useState([]);
  const [attractions, setAttractions] = useState<any>([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const attractionIds = searchParams.get("attractions")?.split(",") || [];
  useEffect(() => {
    if (attractionIds.length > 0) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      // Fetch attractions details
      const attractionsData = await Promise.all(
        attractionIds.map(async (id) => {
          const response = await fetch(`/api/attractions/${id}`);
          return response.json();
        })
      );

      // Fetch activities for all selected attractions
      const activitiesData = await Promise.all(
        attractionIds.map(async (id) => {
          const response = await fetch(`/api/attractions/${id}/activities`);
          const data = await response.json();
          return data.map((activity) => ({ ...activity, attractionId: id }));
        })
      );

      setAttractions(attractionsData);
      setActivities(activitiesData.flat());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) => {
      const isSelected = prev.find((a) => a.id === activity.id);
      if (isSelected) {
        return prev.filter((a) => a.id !== activity.id);
      } else {
        return [...prev, activity];
      }
    });
  };

  // Calculate total cost
  const getTotalCost = () => {
    return selectedActivities.reduce((total, activity) => {
      return total + (activity.price || 0);
    }, 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (category) => {
    const icons = {
      adventure: "🏔️",
      cultural: "🎭",
      food: "🍽️",
      shopping: "🛍️",
      entertainment: "🎡",
      spiritual: "🙏",
      photography: "📸",
      educational: "📚",
      relaxation: "🧘",
      sports: "⚽",
    };
    return icons[category.toLowerCase()] || "🎯";
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getFilteredActivities = () => {
    if (activeTab === "all") return activities;
    return activities.filter(
      (activity) => activity.category.toLowerCase() === activeTab
    );
  };

  const getUniqueCategories = () => {
    const categories = [
      ...new Set(activities.map((a) => a.category.toLowerCase())),
    ];
    return categories.sort();
  };

  // Updated function to redirect to /ai route
  const proceedToAI = async () => {
    try {
      if (selectedActivities.length === 0) {
        alert("Please select at least one activity");
        return;
      }

      console.log(selectedActivities);

      const activityIds = selectedActivities.map((a) => a.id);

      const springApiBaseUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
      const { data: user } = await axios.get("/api/user");
      if (!user) {
        router.push("/auth");
        return;
      }
      await axios.post(`${springApiBaseUrl}/activities`, {
        selectedActivities: activityIds,
        userId: user.id,
        locationId:attractions[0]?.location.id
      });
      router.push("/itinerary")
    } catch (err: any) {
      console.error(err.message)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Available Activities
              </h1>
              <p className="text-orange-600 mt-1">
                Choose activities for your selected attractions
              </p>
            </div>
            <Link
              href={`/locations/${params.locationId}/attractions`}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Back to Attractions
            </Link>
          </div>
        </div>
      </div>

      {/* Selected Attractions Header */}
      <div className="bg-orange-100 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold text-orange-800 mb-2">
            Selected Attractions:
          </h2>
          <div className="flex flex-wrap gap-2">
            {attractions.map((attraction) => (
              <span
                key={attraction.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-200 text-orange-800"
              >
                {attraction.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "all"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Activities ({activities.length})
            </button>
            {getUniqueCategories().map((category) => {
              const count = activities.filter(
                (a) => a.category.toLowerCase() === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap capitalize ${
                    activeTab === category
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {getActivityIcon(category)} {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Activities Counter with Cost */}
      {selectedActivities.length > 0 && (
        <div className="bg-orange-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {selectedActivities.length} activit
                  {selectedActivities.length !== 1 ? "ies" : "y"} selected
                </span>
                <div className="flex items-center space-x-1 bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm">💰</span>
                  <span className="font-semibold">
                    Total: {formatCurrency(getTotalCost())}
                  </span>
                </div>
              </div>
              <button
                onClick={proceedToAI}
                className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Generate AI Itinerary →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getFilteredActivities().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No activities found
            </h2>
            <p className="text-gray-500">
              Try selecting different attractions or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredActivities().map((activity) => {
              const isSelected = selectedActivities.find(
                (a) => a.id === activity.id
              );
              const attraction = attractions.find(
                (a) => a.id === activity.attractionId
              );

              return (
                <div
                  key={activity.id}
                  onClick={() => toggleActivity(activity)}
                  className={`cursor-pointer rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  {/* Header */}
                  <div className="p-5 pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">
                          {activity.name}
                        </h3>
                        <p className="text-sm text-orange-600 font-medium">
                          📍 {attraction?.name}
                        </p>
                      </div>

                      {/* Selection Indicator */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ml-3 flex-shrink-0 ${
                          isSelected
                            ? "bg-orange-500 border-orange-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                    </div>

                    {activity.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {activity.description}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {getActivityIcon(activity.category)} {activity.category}
                      </span>

                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>⏱️ {formatDuration(activity.duration)}</span>
                        {activity.price && (
                          <span className="font-medium text-green-600">
                            💰 {formatCurrency(activity.price)}
                          </span>
                        )}
                        {!activity.price && (
                          <span className="text-gray-400">💰 Free</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Action Bar with Enhanced Cost Display */}
      {selectedActivities.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {selectedActivities.length} activit
                  {selectedActivities.length !== 1 ? "ies" : "y"} selected
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    Duration: {formatDuration(
                      selectedActivities.reduce((sum, a) => sum + a.duration, 0)
                    )}
                  </span>
                  <span className="text-green-600 font-semibold">
                    Total Cost: {formatCurrency(getTotalCost())}
                  </span>
                </div>
              </div>
              <button
                onClick={proceedToAI}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                Generate AI Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}