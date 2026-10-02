const express = require("express");

const router = express.Router();

const { getPendingBookings, getCurrentBooking, startBooking, acceptBooking, completeBooking, rejectBooking, cancelBooking, updateDriverAvailability, getDriverEarnings } = require("../Controllers/driverBooking.controller");

const driverAuthMiddleware = require("../Middlewares/driverMiddleware");

router.use(driverAuthMiddleware);

// Get pending rides Route
router.get("/pending", getPendingBookings);

// Get Current Booking Route
router.get("/current", getCurrentBooking);

router.patch("/:bookingId/start",startBooking);

// Accept ride Route
router.patch("/:bookingId/accept",acceptBooking);

// Complete ride Route
router.patch("/:bookingId/complete",completeBooking);

// Reject ride Route
router.patch("/:bookingId/reject",rejectBooking);

// Cancle Ride Route
router.patch("/:bookingId/cancel",cancelBooking);

// Update driver online/offline status Route
router.patch("/availability",updateDriverAvailability);

// get earnings Route
router.get("/driver-earnings",getDriverEarnings);

module.exports = router;