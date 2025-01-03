"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingSummaryPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking) {
    return <p className="text-gray-500 text-center mt-4">Loading booking details...</p>;
  }

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Booking Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Date:</span>
            <span className="text-gray-900 font-semibold">{booking.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Time:</span>
            <span className="text-gray-900 font-semibold">{booking.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Guests:</span>
            <span className="text-gray-900 font-semibold">{booking.guests}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-900 font-semibold">{booking.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Contact:</span>
            <span className="text-gray-900 font-semibold">{booking.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
