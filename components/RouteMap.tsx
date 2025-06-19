"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "70vh",
};

const center = { lat: 40.7128, lng: -74.0060 }; // Center the map as desired

const locations = [
  { lat: 40.7128, lng: -74.0060 },
  { lat: 40.73061, lng: -73.935242 },
  { lat: 40.7218, lng: -73.9990 },
];

export default function RouteMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  return(
  <div className="flex-1/4">
    {isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {locations.map((position, idx) => (
        <Marker key={idx} position={position} />
      ))}
    </GoogleMap>
  ) : null}
  </div>) 
}
