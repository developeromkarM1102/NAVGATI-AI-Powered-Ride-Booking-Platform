const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },

        pickup: {
            address: {
                type: String,
                required: true,
            },

            latitude: {
                type: Number,
                required: true,
            },

            longitude: {
                type: Number,
                required: true,
            },
        },

        destination: {
            address: {
                type: String,
                required: true,
            },

            latitude: {
                type: Number,
                required: true,
            },

            longitude: {
                type: Number,
                required: true,
            },
        },

        route: {
            distance: {
                type: Number,
            },

            duration: {
                type: Number,
            },
        },

        rideType: {
            type: String,
            enum: ["bike", "auto", "car", "suv"],
            required: true,
        },

        passengers: {
            type: Number,
            required: true,
            min: 1,
        },

        luggage: {
            type: Boolean,
            default: false,
        },

        distance: {
            type: Number,
            required: true,
        },

        estimatedDuration: {
            type: Number,
            required: true,
        },

        fare: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "requested",
                "accepted",
                "ongoing",
                "rejected",
                "cancelled",
                "completed",
            ],
            default: "requested",
        },

        requestedAt: {
            type: Date,
            default: Date.now,
        },

        acceptedAt: {
            type: Date,
        },

        startedAt: {
            type: Date,
        },

        completedAt: {
            type: Date,
        },

        cancelledAt: {
            type: Date,
        },

        rejectedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;