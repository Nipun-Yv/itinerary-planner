'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HotelImageSliderProps {
  images: string[];
  hotelName: string;
  className?: string;
}

export default function HotelImageSlider({ 
  images, 
  hotelName, 
  className = "mb-8" 
}: HotelImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={className}>
      {images.length > 0 ? (
        <div className="relative rounded-xl overflow-hidden">
          {/* Main image display */}
          <div className="relative h-64 md:h-80 lg:h-96 bg-gray-200">
            <Image
              src={images[currentImageIndex]}
              alt={`${hotelName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
            />
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
            
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
          
          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-blue-500 scale-105' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${hotelName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl h-64 flex items-center justify-center">
          <div className="text-center text-orange-600">
            <div className="text-4xl mb-2">🏨</div>
            <p className="font-medium">No images available</p>
          </div>
        </div>
      )}
    </div>
  );
}