const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes'); // Ensure the path is correct
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/bookings', bookingRoutes); // Register routes for bookings

// Error handling middleware
app.use(errorHandler);

module.exports = app;
