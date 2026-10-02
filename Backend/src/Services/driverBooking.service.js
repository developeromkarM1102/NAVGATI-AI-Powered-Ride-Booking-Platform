const mongoose = require("mongoose");
const BookingModel = require("../Models/Booking.model");
const DriverModel = require("../Models/Driver.model");

const getPendingBookings = async (driverId) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    const bookings = await BookingModel.find({
        driver: driverId,
        status: "requested",
    })
        .populate(
            "user",
            "username email phone rating totalRides isVerified"
        )
        .sort({ createdAt: -1 });

    return bookings;
};

const getCurrentBooking = async (driverId) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    const booking = await BookingModel.findOne({
        driver: driverId,
        status: "ongoing",
    })
        .populate(
            "user",
            "username email phone rating totalRides isVerified"
        )
        .sort({ startedAt: -1 });

    return booking;
};

const acceptBooking = async (driverId, bookingId) => {
    if (!driverId || !bookingId) {
        throw new Error(
            "Driver ID and Booking ID are required"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID");
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (String(booking.driver) !== String(driverId)) {
        throw new Error(
            "You are not assigned to this booking"
        );
    }

    if (booking.status !== "requested") {
        throw new Error(
            `Booking cannot be accepted because it is ${booking.status}`
        );
    }

    const driver = await DriverModel.findById(driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }

    if (!driver.isAvailable) {
        throw new Error(
            "You are currently offline or unavailable"
        );
    }

    booking.status = "accepted";
    booking.acceptedAt = new Date();

    await booking.save();

    await DriverModel.findByIdAndUpdate(
        driverId,
        {
            isAvailable: false,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const updatedBooking = await BookingModel.findById(
        booking._id
    ).populate(
        "user",
        "username email phone rating totalRides isVerified"
    );

    return updatedBooking;
};

const startBooking = async (driverId, bookingId) => {
    if (!driverId || !bookingId) {
        throw new Error(
            "Driver ID and Booking ID are required"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID");
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (String(booking.driver) !== String(driverId)) {
        throw new Error(
            "You are not assigned to this booking"
        );
    }

    if (booking.status !== "accepted") {
        throw new Error(
            `Booking cannot be started because it is ${booking.status}`
        );
    }

    booking.status = "ongoing";
    booking.startedAt = new Date();

    await booking.save();

    const updatedBooking = await BookingModel.findById(
        booking._id
    ).populate(
        "user",
        "username email phone rating totalRides isVerified"
    );

    return updatedBooking;
};

const completeBooking = async (driverId, bookingId) => {
    if (!driverId || !bookingId) {
        throw new Error(
            "Driver ID and Booking ID are required"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID");
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (String(booking.driver) !== String(driverId)) {
        throw new Error(
            "You are not assigned to this booking"
        );
    }

    if (booking.status !== "ongoing") {
        throw new Error(
            `Booking cannot be completed because it is ${booking.status}`
        );
    }

    booking.status = "completed";
    booking.completedAt = new Date();

    await booking.save();

    await DriverModel.findByIdAndUpdate(
        driverId,
        {
            isAvailable: true,
            $inc: {
                totalRides: 1,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const updatedBooking = await BookingModel.findById(
        booking._id
    ).populate(
        "user",
        "username email phone rating totalRides isVerified"
    );

    return updatedBooking;
};

const rejectBooking = async (driverId, bookingId) => {
    if (!driverId || !bookingId) {
        throw new Error(
            "Driver ID and Booking ID are required"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID");
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (String(booking.driver) !== String(driverId)) {
        throw new Error(
            "You are not assigned to this booking"
        );
    }

    if (booking.status !== "requested") {
        throw new Error(
            `Booking cannot be rejected because it is ${booking.status}`
        );
    }

    booking.status = "rejected";
    booking.rejectedAt = new Date();

    await booking.save();

    await DriverModel.findByIdAndUpdate(
        driverId,
        {
            isAvailable: true,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const updatedBooking = await BookingModel.findById(
        booking._id
    ).populate(
        "user",
        "username email phone rating totalRides isVerified"
    );

    return updatedBooking;
};

const cancelBooking = async (driverId, bookingId) => {
    if (!driverId || !bookingId) {
        throw new Error(
            "Driver ID and Booking ID are required"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID");
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (String(booking.driver) !== String(driverId)) {
        throw new Error(
            "You are not assigned to this booking"
        );
    }

    if (booking.status !== "accepted") {
        throw new Error(
            `Booking cannot be cancelled because it is ${booking.status}`
        );
    }

    booking.status = "cancelled";
    booking.cancelledAt = new Date();

    await booking.save();

    await DriverModel.findByIdAndUpdate(
        driverId,
        {
            isAvailable: true,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const updatedBooking = await BookingModel.findById(
        booking._id
    ).populate(
        "user",
        "username email phone rating totalRides isVerified"
    );

    return updatedBooking;
};

const updateDriverAvailability = async (
    driverId,
    isAvailable
) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    if (typeof isAvailable !== "boolean") {
        throw new Error(
            "isAvailable must be true or false"
        );
    }

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
        throw new Error("Invalid driver ID");
    }

    const driver = await DriverModel.findByIdAndUpdate(
        driverId,
        {
            isAvailable,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("_id username isAvailable");

    if (!driver) {
        throw new Error("Driver not found");
    }

    return driver;
};

const getDriverEarnings = async (driverId) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    const driver = await DriverModel.findById(driverId).select(
        "username rating totalRides isAvailable"
    );

    if (!driver) {
        throw new Error("Driver not found");
    }

    const completedBookings = await BookingModel.find({
        driver: driverId,
        status: "completed",
    })
        .select(
            "fare distance estimatedDuration pickup destination completedAt createdAt user"
        )
        .populate(
            "user",
            "name username email profileImage"
        )
        .sort({
            completedAt: -1,
        });

    const totalEarnings = completedBookings.reduce(
        (total, booking) => total + Number(booking.fare || 0),
        0
    );

    const completedRides = completedBookings.length;

    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();

    const diffToMonday = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
        startOfWeek.getDate() - diffToMonday
    );

    startOfWeek.setHours(0, 0, 0, 0);

    const previousWeekStart = new Date(startOfWeek);
    previousWeekStart.setDate(
        previousWeekStart.getDate() - 7
    );

    const previousWeekEnd = new Date(startOfWeek);

    const todayBookings = completedBookings.filter(
        (booking) =>
            booking.completedAt &&
            new Date(booking.completedAt) >= startOfToday
    );

    const weeklyBookings = completedBookings.filter(
        (booking) =>
            booking.completedAt &&
            new Date(booking.completedAt) >= startOfWeek
    );

    const previousWeekBookings = completedBookings.filter(
        (booking) =>
            booking.completedAt &&
            new Date(booking.completedAt) >= previousWeekStart &&
            new Date(booking.completedAt) < previousWeekEnd
    );

    const todayEarnings = todayBookings.reduce(
        (total, booking) =>
            total + Number(booking.fare || 0),
        0
    );

    const weeklyEarnings = weeklyBookings.reduce(
        (total, booking) =>
            total + Number(booking.fare || 0),
        0
    );

    const previousWeekEarnings = previousWeekBookings.reduce(
        (total, booking) =>
            total + Number(booking.fare || 0),
        0
    );

    const averagePerRide =
        completedRides > 0
            ? totalEarnings / completedRides
            : 0;

    let weeklyChange = 0;

    if (previousWeekEarnings > 0) {
        weeklyChange =
            ((weeklyEarnings - previousWeekEarnings) /
                previousWeekEarnings) *
            100;
    } else if (weeklyEarnings > 0) {
        weeklyChange = 100;
    }

    const weeklyChart = [];

    const dayNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    for (let i = 0; i < 7; i++) {
        const dayStart = new Date(startOfWeek);

        dayStart.setDate(
            startOfWeek.getDate() + i
        );

        const dayEnd = new Date(dayStart);

        dayEnd.setDate(
            dayStart.getDate() + 1
        );

        const dayEarnings = weeklyBookings
            .filter(
                (booking) =>
                    booking.completedAt &&
                    new Date(booking.completedAt) >= dayStart &&
                    new Date(booking.completedAt) < dayEnd
            )
            .reduce(
                (total, booking) =>
                    total + Number(booking.fare || 0),
                0
            );

        weeklyChart.push({
            day: dayNames[i],
            earnings: dayEarnings,
        });
    }

    const recentRides = completedBookings
        .slice(0, 10)
        .map((booking) => ({
            id: booking._id.toString(),

            passenger:
                booking.user?.username ||
                booking.user?.name ||
                "Passenger",

            pickup:
                booking.pickup?.address ||
                "Unknown pickup",

            destination:
                booking.destination?.address ||
                "Unknown destination",

            distance:
                Number(booking.distance || 0),

            duration:
                Number(
                    booking.estimatedDuration || 0
                ),

            fare:
                Number(booking.fare || 0),

            time:
                booking.completedAt ||
                booking.createdAt,

            status:
                booking.status,
        }));

    return {
        summary: {
            todayEarnings,
            weeklyEarnings,
            completedRides,
            averagePerRide,
            weeklyChange: Number(
                weeklyChange.toFixed(1)
            ),
        },

        weeklyChart,

        recentRides,

        driver: {
            username: driver.username,
            rating: Number(driver.rating || 0),
            totalRides: Number(
                driver.totalRides || 0
            ),
            isAvailable: Boolean(
                driver.isAvailable
            ),
        },
    };
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