const driverBookingService = require("../Services/driverBooking.service");

// getPendingBookings Controller
const getPendingBookings = async (req, res) => {
    try {
        const driverId = req.driver.id;

        const bookings =
            await driverBookingService.getPendingBookings(driverId);

        return res.status(200).json({
            success: true,
            bookings,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// getCurrentBooking Controller
const getCurrentBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;

        const booking =
            await driverBookingService.getCurrentBooking(
                driverId
            );

        return res.status(200).json({
            success: true,
            booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Start booking controller
const startBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { bookingId } = req.params;

        const booking =
            await driverBookingService.startBooking(
                driverId,
                bookingId
            );

        return res.status(200).json({
            success: true,
            message: "Ride started successfully",
            booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// acceptBooking Controller
const acceptBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { bookingId } = req.params;

        const booking =
            await driverBookingService.acceptBooking(
                driverId,
                bookingId
            );

        return res.status(200).json({
            success: true,
            message: "Booking accepted successfully",
            booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// completeBooking Controller
const completeBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }

        const booking =
            await driverBookingService.completeBooking(
                driverId,
                bookingId
            );

        const io = req.app.get("io");

        if (io && booking?._id) {
            io.to(`booking_${booking._id.toString()}`).emit(
                "ride-completed",
                {
                    bookingId: booking._id.toString(),
                    message: "Your ride has been completed.",
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Ride completed successfully",
            booking,
        });
    } catch (error) {
        // console.error(
        //     "❌ Complete booking error:",
        //     error
        // );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// rejectBooking Controller
const rejectBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { bookingId } = req.params;

        const booking =
            await driverBookingService.rejectBooking(
                driverId,
                bookingId
            );

        return res.status(200).json({
            success: true,
            message: "Booking rejected successfully",
            booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// cancelBooking Controller
const cancelBooking = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }

        const booking = await driverBookingService.cancelBooking(
            driverId,
            bookingId
        );

        const io = req.app.get("io");

        if (io && booking?._id) {
            io.to(`booking_${booking._id.toString()}`).emit(
                "ride-cancelled",
                {
                    bookingId: booking._id.toString(),
                    reason: "The driver cancelled this ride.",
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking,
        });
    } catch (error) {
        // console.error("❌ Driver cancel booking error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// updateDriverAvailability Controller
const updateDriverAvailability = async (req, res) => {
    try {
        const driverId = req.driver.id;
        const { isAvailable } = req.body;

        if (typeof isAvailable !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isAvailable must be true or false",
            });
        }

        const driver =
            await driverBookingService.updateDriverAvailability(
                driverId,
                isAvailable
            );

        return res.status(200).json({
            success: true,
            message: isAvailable
                ? "Driver is now online"
                : "Driver is now offline",
            data: {
                driverId: driver._id,
                isAvailable: driver.isAvailable,
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// getDriverEarnings Controller
const getDriverEarnings = async (req, res) => {
    try {
        const driverId = req.driver.id;

        const summary =
            await driverBookingService.getDriverEarnings(
                driverId
            );

        return res.status(200).json({
            success: true,
            summary,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getPendingBookings,
    getCurrentBooking,
    acceptBooking,
    startBooking,
    completeBooking,
    rejectBooking,
    cancelBooking,
    updateDriverAvailability,
    getDriverEarnings,
};