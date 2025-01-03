"use client";

import React, { useState } from "react";
import BookingForm from "../components/BookingForm";
import AvailabilityDisplay from "../components/AvailabilityDisplay";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchAvailability = async (formData) => {
    try {
      const formattedDate = formData.date.toISOString().split("T")[0];
      const response = await fetch(`http://localhost:5000/api/bookings?date=${formattedDate}`);
      const bookings = await response.json();
      const updatedSlots = bookings.map((booking) => ({
        time: booking.displayTime,
        displayTime: `${parseInt(booking.displayTime.split(":")[0]) % 12 || 12}:00 ${
          parseInt(booking.displayTime.split(":")[0]) >= 12 ? "PM" : "AM"
        }`,
        available: booking.available,
      }));
      setSlots(updatedSlots);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = async (date, time) => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });

      if (response.ok) {
        console.log("Booking deleted successfully");
        fetchAvailability({ date: new Date(date) });
      } else {
        const errorData = await response.json();
        console.error("Failed to delete booking:", errorData);
      }
    } catch (error) {
      console.error("Error while deleting booking:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurant Booking</h1>
      <BookingForm
        onSubmit={(formData) => {
          setSelectedDate(formData.date);
          fetchAvailability(formData);
        }}
      />
      <AvailabilityDisplay
        slots={slots}
        deleteBooking={(date, time) =>
          deleteBooking(selectedDate.toISOString().split("T")[0], time)
        }
        selectedDate={selectedDate}
      />
    </div>
  );
}
