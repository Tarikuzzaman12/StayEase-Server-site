# StayEase - Hotel Booking Platform

## Purpose
The backend of Stay-Ease handles user authentication, room data management, bookings, reviews, and communication with the frontend. It provides a robust API built using Node.js and Express, integrated with a MongoDB database to store user data, room details, reviews, and bookings. The backend is designed to support JWT-based authentication for secure user sessions.

## Key Features
- **Room Management**: APIs to add, update, delete, and fetch room details including price, description, and images.
- **User Authentication**: Secure login and registration with JWT (JSON Web Tokens).
- **Room Booking**: APIs to handle room bookings, check availability, and manage booking details.
- **Reviews**: Allows users to post reviews and ratings for rooms.
- **Search & Filter**: API endpoints to search and filter rooms by various criteria (e.g., price, category).
- **Environment Configuration**: Supports environment variables for sensitive information (e.g., database connection string, JWT secret).

## npm Packages Used (Backend)
- `express`: Fast, unopinionated web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file to keep sensitive information safe.
- `cors`: Middleware to allow cross-origin requests between frontend and backend.
- `express-validator`: For validating and sanitizing input data.
- `nodemon`: A utility that automatically restarts the server during development for faster testing.


