# Restaurant Booking System

This project is a full-stack restaurant booking system that allows customers to book table slots for specific dates and times. It includes both frontend and backend components.

## **Features**

### **Frontend**
- **Responsive Design**: Designed to be mobile-friendly.
- **Table Booking Form**:
  - Customers can select a date, time slot, and number of guests.
  - Provides immediate feedback on booking success or slot availability.
- **Slot Availability Display**:
  - Real-time availability of time slots for selected dates.
  - Highlights booked and available slots with color codes.

### **Backend**
- **REST API**:
  - Create, retrieve, and delete bookings.
  - Fetch available slots for a specific date.
- **Database Integration**:
  - MongoDB for storing booking details.
- **Seeding Utility**:
  - Pre-populate the database with sample bookings for testing.

---

## **Technologies Used**

### **Frontend**
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: React hooks

### **Backend**
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Environment Variables**: dotenv

---

## **Setup Instructions**

### **Backend Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/restaurant-booking.git
   ```

2. Navigate to the backend folder:
   ```bash
   cd restaurant-booking-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your-mongodb-uri
     PORT=5000
     ```

5. Seed the database (optional):
   ```bash
   node seed.js
   ```

6. Start the server:
   ```bash
   npm start
   ```
   The backend server will run at `http://localhost:5000`.

### **Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd restaurant-booking-backend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend server will run at `http://localhost:3000`.

---

## **Folder Structure**

### **Backend**
```
restaurant-booking-backend
├── src
│   ├── config
│   │   └── db.js             # MongoDB connection setup
│   ├── controllers
│   │   └── bookingController.js  # API logic for bookings
│   ├── middleware
│   ├── models
│   │   └── Booking.js       # Mongoose schema for bookings
│   ├── routes
│   │   └── bookingRoutes.js # Route definitions
│   └── server.js            # Entry point for the server
├── .env
├── package.json
└── seed.js                  # Database seeding script
```

### **Frontend**
```
frontend
├── public                   # Static assets
├── src
│   ├── app
│   │   ├── page.js          # Main page
│   │   ├── layout.js        # Layout setup
│   │   └── booking-summary  # Additional pages
│   ├── components
│   │   ├── BookingForm.js   # Booking form component
│   │   └── AvailabilityDisplay.js # Slot availability component
│   └── styles               # Tailwind and global styles
├── package.json
└── tailwind.config.js       # Tailwind configuration
```

---

## **API Endpoints**

### **Base URL**: `http://localhost:5000`

1. **Create a Booking**
   - `POST /api/bookings`
   - Request Body:
     ```json
     {
       "date": "2025-01-01",
       "time": "18:00",
       "guests": 4,
       "name": "John Doe",
       "contact": "1234567890"
     }
     ```
   - Response:
     ```json
     {
       "_id": "booking-id",
       "date": "2025-01-01",
       "time": "18:00",
       "guests": 4,
       "name": "John Doe",
       "contact": "1234567890"
     }
     ```

2. **Get Bookings for a Date**
   - `GET /api/bookings?date=2025-01-01`
   - Response:
     ```json
     [
       { "displayTime": "18:00", "available": false },
       { "displayTime": "19:00", "available": true }
     ]
     ```

3. **Delete a Booking**
   - `DELETE /api/bookings`
   - Request Body:
     ```json
     {
       "date": "2025-01-01",
       "time": "18:00"
     }
     ```
   - Response:
     ```json
     { "message": "Booking deleted successfully" }
     ```

---

## **License**
This project is licensed under the MIT License.

---

## **Contributing**
Feel free to open issues and submit pull requests for any improvements or bugs.

---

## **Contact**
For any inquiries or support, please contact [rhythm00ahuja@gmail.com].


![Screenshot 2025-01-03 154117](https://github.com/user-attachments/assets/23420eff-89e4-49dd-9b35-afdc60d2fc15)
![image](https://github.com/user-attachments/assets/e275aace-304d-4893-ba07-dae968387a0a)

