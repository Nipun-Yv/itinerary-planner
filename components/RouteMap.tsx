// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Activity } from "@/types/Activity";
// import useStreaming from "@/hooks/useStreaming";
// import axios from "axios";
// import { useStreamingContext } from "@/contexts/StreamingContext";

// const containerStyle: React.CSSProperties = {
//   width: "100%",
//   height: "80%",
// };

// export default function RouteMap() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//     libraries: ["places"],
//   });

//   const { isComplete, itineraryItems } = useStreamingContext();
//   const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([
//     { lat: 45, lng: 15 },
//     { lat: 45, lng: 17 },
//   ]);
//   console.log(isComplete);
//   const sum = locations.reduce(
//     (accumulator, current) => ({
//       lat: accumulator.lat + (current.lat || 0),
//       lng: accumulator.lng + (current.lng || 0),
//     }),
//     { lat: 0, lng: 0 }
//   );

//   const center = {
//     lat: sum.lat / (locations.length || 1),
//     lng: sum.lng / (locations.length || 1),
//   };

//   useEffect(() => {
//     async function markLocations() {
//       try {
//         const activityIds = itineraryItems.map((item) => item.activity_id);
//         const springApiBaseUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;

//         const { data } = await axios.post(
//           `${springApiBaseUrl}/activity-details`,
//           { selectedActivities: activityIds }
//         );
//         console.log(data, "yowzy");
//         setLocations(
//           data.data.map((element: Activity) => ({
//             lat: element.latitude,
//             lng: element.longitude,
//           }))
//         );
//       } catch (err: any) {
//         console.error(err.message);
//       } finally {
//       }
//     }
//     if (isComplete) {
//       console.log("Hello there");
//       markLocations();
//     }
//   }, [isComplete]);
//   return (
//     <div className="flex-1/4">
//       {isLoaded ? (
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//           {locations.map((position, idx) => (
//             <Marker key={idx} position={position} />
//           ))}
//           <Polyline
//             path={locations}
//             options={{
//               strokeColor: "#FF0000",
//               strokeOpacity: 1.0,
//               strokeWeight: 2,
//               geodesic: true,
//             }}
//           />
//         </GoogleMap>
//       ) : null}
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { Activity } from "@/types/Activity";
import axios from "axios";
import { useStreamingContext } from "@/contexts/StreamingContext";
import { useMap } from "@/contexts/MapContext"; // <-- Import your custom hook
import { redirect } from "next/navigation";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "80%",
};

type DecodedPath = {
  lat: number;
  lng: number;
};

export default function RouteMap() {
  // Use the context to get the loaded state. No more direct calls to useJsApiLoader here.
  const { isLoaded, loadError } = useMap();
  const { isComplete, itineraryItems } = useStreamingContext();
  const [locations, setLocations] = useState<DecodedPath[]>([]);
  const [hotelLocations,setHotelLocations]=useState<DecodedPath[]>([]);
  const [routePath, setRoutePath] = useState<DecodedPath[]>([]);
  const springApiBaseUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
  console.log(routePath);
  // ... (the rest of your component logic remains the same)
  const sum = locations.reduce(
    (accumulator, current) => ({
      lat: accumulator.lat + (current.lat || 0),
      lng: accumulator.lng + (current.lng || 0),
    }),
    { lat: 0, lng: 0 }
  );

  const center =
    locations.length > 0
      ? {
          lat: sum.lat / locations.length,
          lng: sum.lng / locations.length,
        }
      : { lat: 45, lng: 15 };

  useEffect(() => {
    async function markLocations() {
      if (!itineraryItems || itineraryItems.length === 0) return;
      try {
        const activityIds = itineraryItems.map((item) => item.activity_id);

        const { data } = await axios.post(
          `${springApiBaseUrl}/activity-details`,
          { selectedActivities: activityIds }
        );
        setLocations(
          data.data.map((element: Activity) => ({
            lat: element.latitude,
            lng: element.longitude,
          }))
        );
      } catch (err: any) {
        console.error("Error fetching activity details:", err.message);
      }
    }
    if (isComplete) {
      markLocations();
    }
  }, [isComplete, itineraryItems]);

  useEffect(() => {
    if (locations.length < 2 || !isLoaded) {
      setRoutePath([]);
      return;
    }

    const fetchRoute = async () => {
      const origin = locations[0];
      const destination = locations[locations.length - 1];
      const intermediates = locations.slice(1, -1).map((loc) => ({
        location: {
          latLng: {
            latitude: loc.lat,
            longitude: loc.lng,
          },
        },
      }));

      try {
        const response = await axios.post(
          "https://routes.googleapis.com/directions/v2:computeRoutes",
          {
            origin: {
              location: {
                latLng: { latitude: origin.lat, longitude: origin.lng },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.lat,
                  longitude: destination.lng,
                },
              },
            },
            intermediates: intermediates,
            travelMode: "DRIVE",
            polylineEncoding: "ENCODED_POLYLINE",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key":
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
              "X-Goog-FieldMask": "routes.polyline.encodedPolyline",
            },
          }
        );
        console.log(response.data);
        const encodedPolyline =
          response.data.routes[0].polyline.encodedPolyline;

        if (encodedPolyline && window.google?.maps?.geometry?.encoding) {
          const decodedPath =
            window.google.maps.geometry.encoding.decodePath(encodedPolyline);
          setRoutePath(
            decodedPath.map((p) => ({ lat: p.lat(), lng: p.lng() }))
          );
        }
      } catch (error) {
        console.error("Error fetching route from Routes API:", error);
      }
    };

    fetchRoute();
  }, [locations, isLoaded]);

  useEffect(() => {
    const fetchHotels = async () => {
      try{
        const { data: user } = await axios.get("/api/user");
        if (!user) {
          redirect("/auth");
        }
        const response = await axios.post(
          `${springApiBaseUrl}/hotels/nearby-hotels`,
          {
            userId:user.id,
            locationList:routePath
          }
        );
       setHotelLocations(response.data.data.map((element:any)=>({lat:element.latitude,lng:element.longitude})))
      }
      catch(error:any){
        console.error(error.message)
        console.log("Failed to fetch hotel markers")
      }
    };
    if (routePath.length > 0) {
      fetchHotels();
    }
  }, [routePath, isLoaded]);
  // Handle loading and error states gracefully
  if (loadError) return <div>Error loading map</div>;

  return (
    <div className="flex-1/4">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
          {locations.map((position, idx) => (
            <Marker key={idx} position={position} />
          ))}
          {routePath.length > 0 && (
            <Polyline
              path={routePath}
              options={{
                strokeColor: "orange",
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true,
              }}
            />
          )}
          {hotelLocations.map((position, idx) => (
            <Marker key={idx} position={position} icon={{url:"https://cdn-icons-png.flaticon.com/512/9922/9922103.png",scaledSize: new google.maps.Size(32, 32)}}/>
          ))}
        </GoogleMap>
      ) : (
        <div>Loading Map...</div>
      )}
    </div>
  );
}
