'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivitiesPage({ params }) {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const router = useRouter();

  const handleSubmit = async () => {
    const selectionData = {
      locationId: params.locationId,
      attractionId: params.attractionId,
      activities: selectedActivities,
    };
    router.push(`/ai?data=${encodeURIComponent(JSON.stringify(selectionData))}`);
  };
  // placeholder UI
  return (
    <div>
      <button onClick={handleSubmit}>Submit Selection to AI</button>
    </div>
  );
}