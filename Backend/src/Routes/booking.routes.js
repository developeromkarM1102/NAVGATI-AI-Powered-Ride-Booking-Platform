const express = require("express");
const router = express.Router();

const { createBooking, getBookingById, CancelBooking, getUserBookings } = require("../Controllers/booking.controller");
const userAuthMiddleware = require("../Middlewares/userMiddleware");

// User Booking Routes 
router.post("/rideBooking", userAuthMiddleware, createBooking );
router.get("/myBookings", userAuthMiddleware, getUserBookings);
router.get("/:bookingId", userAuthMiddleware, getBookingById);
router.post("/cancel/:bookingId", userAuthMiddleware, CancelBooking);

module.exports = router;