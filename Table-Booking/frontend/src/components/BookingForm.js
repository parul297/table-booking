"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm({ onSubmit }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = async (data) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const bookingData = { ...data, date: formattedDate };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        onSubmit({ date: selectedDate });
      } else {
        const errorData = await response.json();
        if (errorData.message === "Time slot already booked") {
          onSubmit({ date: selectedDate });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {showSuccess && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 text-center rounded-md shadow-lg">
          Booking submitted successfully!
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-lg border border-gray-200 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Your Table
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full border rounded-lg px-4 py-2 shadow-sm"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Time</label>
          <select
            {...register("time", { required: "Time is required" })}
            className="w-full border rounded-lg px-4 py-2 shadow-sm"
          >
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
          </select>
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Guests</label>
          <div className="flex items-center">
            <button
              type="button"
              className="px-2 py-1 bg-gray-300 rounded-l-lg"
              onClick={() => setSelectedDate((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              type="number"
              {...register("guests", { required: "Number of guests is required" })}
              className="w-full border rounded-lg px-4 py-2 shadow-sm"
            />
            <button
              type="button"
              className="px-2 py-1 bg-gray-300 rounded-r-lg"
              onClick={() => setSelectedDate((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded-lg px-4 py-2 shadow-sm"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Contact</label>
          <input
            type="text"
            {...register("contact", { required: "Contact is required" })}
            className="w-full border rounded-lg px-4 py-2 shadow-sm"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
