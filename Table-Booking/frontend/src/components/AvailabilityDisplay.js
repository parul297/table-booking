"use client";

import React from "react";

export default function AvailabilityDisplay({ slots, deleteBooking, selectedDate }) {
  const defaultSlots = [
    { displayTime: "6:00 PM", available: false },
    { displayTime: "7:00 PM", available: false },
    { displayTime: "8:00 PM", available: false },
  ];

  const displaySlots = slots && slots.length > 0 ? slots : defaultSlots;

  return (
    <div className="mt-8 p-6 rounded-lg bg-gray-50 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Available Slots
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displaySlots.map((slot, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-lg shadow-md text-center font-medium transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              slot.available
                ? "bg-green-100 border-green-500 text-green-800"
                : "bg-red-100 border-red-500 text-red-800"
            } border`}
            role="button"
            aria-label={
              slot.available
                ? `Slot available at ${slot.displayTime}`
                : `Slot unavailable at ${slot.displayTime}`
            }
            tabIndex={slot.available ? 0 : -1}
            onClick={() =>
              !slot.available &&
              window.confirm("Delete this booking?")
                ? deleteBooking(selectedDate.toISOString().split("T")[0], slot.displayTime)
                : null
            }
          >
            <p className="text-lg font-semibold">{slot.displayTime}</p>
            <p className="text-sm mt-2">
              {slot.available ? "Available" : "Booked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
