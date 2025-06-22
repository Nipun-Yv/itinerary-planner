'use client';

import { useState, useEffect } from 'react';

interface BookingSidebarProps {
  hotelName: string;
  price: number | null;
}

export default function BookingSidebar({ hotelName, price }: BookingSidebarProps) {
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  
  const [rooms, setRooms] = useState(1);
  const [nights, setNights] = useState(1);

  // Calculate number of nights whenever dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNights(Math.max(1, nightsDiff)); // Ensure at least 1 night
    }
  }, [checkIn, checkOut]);

  // Handle check-in date change
  const handleCheckInChange = (date: string) => {
    setCheckIn(date);
    
    // Auto-adjust check-out if it's not after check-in
    const checkInDate = new Date(date);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
      const newCheckOut = new Date(checkInDate);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOut(newCheckOut.toISOString().split('T')[0]);
    }
  };

  // Handle check-out date change
  const handleCheckOutChange = (date: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(date);
    
    // Ensure check-out is after check-in
    if (checkOutDate > checkInDate) {
      setCheckOut(date);
    }
  };

  // Calculate pricing
  const roomPrice = price || 0;
  const subtotal = roomPrice * nights * rooms;
  const serviceRate = 0.12; // 12% service fee
  const serviceFee = Math.round(subtotal * serviceRate);
  const total = subtotal + serviceFee;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get minimum checkout date (day after checkin)
  const minCheckOut = (() => {
    const checkInDate = new Date(checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  })();

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            {price ? (
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-orange-500">₹{price.toLocaleString()}</span>
                  <span className="text-muted-foreground">per night</span>
                </div>
                {nights > 1 && (
                  <p className="text-sm text-muted-foreground">
                    {nights} night{nights > 1 ? 's' : ''} • {rooms} room{rooms > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Contact for pricing</p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 rounded-lg p-3">
                <label className="block text-xs font-medium text-muted-foreground mb-1">CHECK-IN</label>
                <input 
                  type="date" 
                  className="w-full text-sm border-none outline-none"
                  value={checkIn}
                  min={today}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                />
              </div>
              <div className="border border-gray-300 rounded-lg p-3">
                <label className="block text-xs font-medium text-muted-foreground mb-1">CHECK-OUT</label>
                <input 
                  type="date" 
                  className="w-full text-sm border-none outline-none"
                  value={checkOut}
                  min={minCheckOut}
                  onChange={(e) => handleCheckOutChange(e.target.value)}
                />
              </div>
            </div>
            
            <div className="border border-gray-300 rounded-lg p-3">
              <label className="block text-xs font-medium text-muted-foreground mb-1">ROOMS</label>
              <select 
                className="w-full text-sm border-none outline-none"
                value={rooms}
                onChange={(e) => setRooms(parseInt(e.target.value))}
              >
                <option value={1}>1 room</option>
                <option value={2}>2 rooms</option>
                <option value={3}>3 rooms</option>
                <option value={4}>4 rooms</option>
                <option value={5}>5+ rooms</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors mb-4">
            {price ? `Reserve for ₹${total.toLocaleString()}` : 'Check Availability'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            You won't be charged yet
          </p>

          {price && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    ₹{price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''} × {rooms} room{rooms > 1 ? 's' : ''}
                  </span>
                  <span className="text-sm">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Service fee (12%)</span>
                  <span className="text-sm">₹{serviceFee.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 font-semibold">
                <span>Total</span>
                <span className="text-orange-500">₹{total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}