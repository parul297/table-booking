const mongoose = require('mongoose');
const Booking = require('./src/models/Booking');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const bookings = [
      { date: "2025-01-01", time: "18:00", guests: 4, name: "Parul Sharma", contact: "3456782910" },
      { date: "2025-01-02", time: "19:00", guests: 2, name: "Sandhya Sharma", contact: "3412789045" },
    ];
    await Booking.insertMany(bookings);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

seedData();