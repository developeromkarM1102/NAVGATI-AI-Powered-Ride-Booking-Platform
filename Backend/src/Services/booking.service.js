const BookingModel = require("../Models/Booking.model");
const DriverModel = require("../Models/Driver.model");

const createBooking = async (userId, data) => {
    const driver = await DriverModel.findById(data.driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }

    if (!driver.isVerified) {
        throw new Error("Driver is not verified");
    }

    if (!driver.isAvailable) {
        throw new Error("Driver is no longer available");
    }

    const booking = await BookingModel.create({
        user: userId,
        driver: driver._id,
        pickup: data.pickup,
        destination: data.destination,
        rideType: data.rideType,
        passengers: data.passengers,
        luggage: data.luggage,
        distance: data.distance,
        estimatedDuration: data.estimatedDuration,
        fare: data.fare,
        route: data.route,
        status: "requested",
    });

    return booking;
};

const getBookingById = async (userId, bookingId) => {
    const booking = await BookingModel.findOne({
        _id: bookingId,
        user: userId,
    }).populate("driver");

    if (!booking) {
        throw new Error("Booking not found");
    }

    return booking;
};

const cancelBooking = async (userId, bookingId) => {
    const booking = await BookingModel.findOne({
        _id: bookingId,
        user: userId,
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.status === "completed") {
        throw new Error("Completed booking cannot be cancelled");
    }

    if (booking.status === "cancelled") {
        throw new Error("Booking is already cancelled");
    }

    if (booking.status === "ongoing") {
        throw new Error("Ride has already started");
    }

    if (
        booking.status !== "requested" &&
        booking.status !== "accepted"
    ) {
        throw new Error(
            `Booking cannot be cancelled because it is ${booking.status}`
        );
    }

    booking.status = "cancelled";
    booking.cancelledAt = new Date();

    await booking.save();

    await DriverModel.findByIdAndUpdate(
        booking.driver,
        {
            isAvailable: true,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return booking;
};

const getUserBookings = async (userId) => {
    const bookings = await BookingModel.find({
        user: userId,
    })
        .sort({ createdAt: -1 })
        .populate(
            "driver",
            "username phone rating vehicle"
        );

    return bookings;
};

module.exports = {
    createBooking,
    getBookingById,
    cancelBooking,
    getUserBookings,
};