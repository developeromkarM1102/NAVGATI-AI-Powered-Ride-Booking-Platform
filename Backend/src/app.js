const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}))

const authRoutes = require("../src/Routes/auth.routes")
const googleAuth = require("../src/Routes/googleAuth.routes")
const rideRequestRoutes = require("../src/Routes/ride.routes")
const rideBookingRoutes = require("../src/Routes/booking.routes")
const driverBookingRoutes = require("../src/Routes/driverBooking.routes");

// Prefix routes 
app.use("/api/auth",authRoutes)
app.use("/api/auth",googleAuth)
app.use("/api/ride-requests",rideRequestRoutes)
app.use("/api/bookings",rideBookingRoutes)
app.use("/api/driver/bookings",driverBookingRoutes);


module.exports = app