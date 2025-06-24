// src/components/MapProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

// It's a good practice to define the libraries array outside the component
// to prevent it from being recreated on every render.
const libraries: Libraries = ["places", "geometry"];

// Define the shape of the context data
interface MapContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

// Create the context with a default value
const MapContext = createContext<MapContextType>({
  isLoaded: false,
  loadError: undefined,
});

export const useMap = () => useContext(MapContext);

// Create the Provider component
export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  );
};