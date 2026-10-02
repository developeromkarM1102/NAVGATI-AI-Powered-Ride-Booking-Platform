const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const driverSchema = new mongoose.Schema({

    // Driver personal information
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    googleId: {
        type: String,
        default: null,
        unique: true,
        sparse: true,
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },

    profileImage: {
        type: String,
        default: "",
    },

    // Driving license
    licenseNumber: {
        type: String,
        required: [true, "License number is required"],
        unique: true,
        trim: true
    },

    licenseExpiry: {
        type: Date,
        required: [true, "License expiry date is required"]
    },

    // Vehicle
    vehicle: {

        type: {
            type: String,
            enum: ["bike", "auto", "car", "suv"],
            required: true
        },

        brand: {
            type: String,
            required: true,
            trim: true
        },

        model: {
            type: String,
            required: true,
            trim: true
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        color: {
            type: String,
            trim: true
        },

        seats: {
            type: Number,
            required: true,
            min: 1
        }
    },

    // Driver rating
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    // Number of completed rides
    totalRides: {
        type: Number,
        default: 0
    },

    // Driver availability
    isAvailable: {
        type: Boolean,
        default: false
    },

    // Driver verification
    isVerified: {
        type: Boolean,
        default: false
    },

    // Current location
    currentLocation: {

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        }
    },

    // Safety score
    safetyScore: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    }

}, {
    timestamps: true
});


// Hash driver password
driverSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(
        this.password,
        10
    );
});


// Compare password
driverSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(
        password,
        this.password
    );
};

const driverModel = mongoose.model("Driver", driverSchema);

module.exports = driverModel;