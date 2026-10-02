const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },

    email: {
        type: String,
        unique: [true, "user already exists with this email address"],
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        }
    },

    phone: {
        type: String,
        trim: true,
        required: function () {
            return this.authProvider === "local";
        }
    },

    role: {
        type: String,
        default: "user",
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

    savedLocations: [
        {
            name: String,
            address: String,
            latitude: Number,
            longitude: Number,
        },
    ],
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {

    // Google account → no password
    if (this.authProvider === "google") {
        return;
    }

    // No password
    if (!this.password) {
        return;
    }

    // Password hasn't changed
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        10
    );
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;