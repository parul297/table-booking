const express = require('express');
const {
  createBooking,
  getBookings,
  deleteBooking,
  getBookingById,
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking); // Create a booking
router.get('/', getBookings); // Get bookings for a specific date
router.get('/:id', getBookingById); // Get a booking by ID
router.delete('/', deleteBooking); // Delete a booking by date and time

module.exports = router;
