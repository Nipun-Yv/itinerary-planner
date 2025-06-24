import React, { useState } from 'react';

// Sample data for activities
const sampleActivities = [
  {
    id: 1,
    name: "Guided City Tour",
    attraction: { name: "Downtown" },
    description: "Explore the city's main attractions with a knowledgeable guide.",
    category: "Tour",
    duration: 120,
    price: 25.99,
  },
  {
    id: 2,
    name: "Museum Visit",
    attraction: { name: "Art Museum" },
    description: "Discover ancient artifacts and modern masterpieces.",
    category: "Culture",
    duration: 90,
    price: 12.50,
  },
  {
    id: 3,
    name: "Beach Relaxation",
    attraction: { name: "Sandy Beach" },
    description: "Unwind on the golden sands and enjoy the ocean breeze.",
    category: "Leisure",
    duration: 180,
    price: 0,
  },
  // Add more activities as needed
];

// Helper functions
const getActivityIcon = (category) => {
  const icons = {
    Tour: "🚶‍♂️",
    Culture: "🏛️",
    Leisure: "🌴",
  };
  return icons[category] || "✨";
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const ActivityList = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.some((a) => a.id === activity.id)
        ? prev.filter((a) => a.id !== activity.id)
        : [...prev, activity]
    );
  };

  return (
    <div className="flex">
      {/* Scrollable Activity List */}
      <div className="flex-1 overflow-y-auto h-screen space-y-4 p-4">
        {sampleActivities.map((activity) => {
          const isSelected = selectedActivities.some((a) => a.id === activity.id);
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
                      📍 {activity.attraction.name}
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
                    {isSelected && <span className="text-white text-sm">✓</span>}
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
                    {activity.price ? (
                      <span className="font-medium text-green-600">
                        {formatCurrency(activity.price)}
                      </span>
                    ) : (
                      <span className="text-gray-400">Free</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Summary Box */}
      <div className="w-80 bg-white p-6 border-l border-gray-200 shadow-sm sticky top-0 h-screen">
        <h2 className="font-bold text-xl mb-4">Selected Activities</h2>
        {selectedActivities.length === 0 ? (
          <p className="text-gray-500">No activities selected yet.</p>
        ) : (
          <ul className="space-y-2">
            {selectedActivities.map((activity) => (
              <li key={activity.id} className="flex justify-between">
                <span>{activity.name}</span>
                <span className="font-medium">
                  {activity.price ? formatCurrency(activity.price) : "Free"}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>
              {formatCurrency(
                selectedActivities.reduce((sum, a) => sum + (a.price || 0), 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
