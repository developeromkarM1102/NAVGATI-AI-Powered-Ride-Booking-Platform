const bookingService = require("../Services/booking.service");

// createBooking Controller
const createBooking = async (req, res) => {

    try {

        const booking = await bookingService.createBooking(
                req.user.id,
                req.body
            );


        res.status(201).json({

            success: true,

            message: "Ride request sent to driver",

            booking

        });

    } catch (error) {

        // console.error(error);

        res.status(400).json({

            success: false,

            message: error.message

        });
    }
};

//getBookingById Controller
const getBookingById = async (req, res) => {

    try {

        const booking = await bookingService.getBookingById(
            req.user.id,
            req.params.bookingId
        );

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {

        // console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//CancelBooking Controller
const CancelBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required"
            });
        }

        const booking = await bookingService.cancelBooking(
            userId,
            bookingId
        );

        const io = req.app.get("io");

        if (io && booking?.driver) {
            const driverId = booking.driver._id
                ? booking.driver._id.toString()
                : booking.driver.toString();

            io.to(`driver_${driverId}`).emit("ride-cancelled", {
                bookingId: booking._id.toString(),
                reason: "Passenger cancelled the ride."
            });

            io.to(`booking_${booking._id.toString()}`).emit(
                "ride-cancelled",
                {
                    bookingId: booking._id.toString(),
                    reason: "Passenger cancelled the ride."
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        // console.error("❌ Cancel booking error:", error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//getUserBookings Controller
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await bookingService.getUserBookings(userId);

        return res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {
        // console.error(
        //     "❌ Get user bookings error:",
        //     error
        // );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    CancelBooking,
    getUserBookings
};