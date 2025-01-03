const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const { date, time, guests, name, contact } = req.body;
    try {
      if (!date || !time || !guests || !name || !contact) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingBooking = await Booking.findOne({ date, time });
      if (existingBooking) {
        return res.status(400).json({ message: "Time slot already booked" });
      }

      const newBooking = await Booking.create({ date, time, guests, name, contact });
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

exports.getBookings = async (req, res) => {
    try {
      const { date } = req.query;
      const bookings = await Booking.find(date ? { date } : {});
      const allSlots = ["18:00", "19:00", "20:00"];
      const bookedSlots = bookings.map((booking) => booking.time);
      const slots = allSlots.map((time) => ({
        displayTime: time,
        available: !bookedSlots.includes(time),
      }));
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  };

exports.deleteBooking = async (req, res) => {
    const { date, time } = req.body;
    try {
      if (!date || !time) {
        return res.status(400).json({ message: "Date and time are required" });
      }
      const deletedBooking = await Booking.findOneAndDelete({ date, time });
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
