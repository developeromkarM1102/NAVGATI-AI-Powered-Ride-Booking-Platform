const DriverModel = require("../Models/Driver.model");
const jwt = require("jsonwebtoken");


// Generate JWT
const generateToken = (driverId) => {
    return jwt.sign(
        { id: driverId },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};


/**
 * -driver Register controller
 * -POST api/driver-auth/register
 */
const registerDriver = async (req, res) => {

    try {

        const { username, email, password, phone, licenseNumber, licenseExpiry, vehicle } = req.body;

        // Check required fields
        if ( !username || !email || !password || !phone || !licenseNumber || !licenseExpiry || !vehicle) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }


        // Check if driver already exists
        const existingDriver = await DriverModel.findOne({
            $or: [
                { email },
                { username },
                { phone },
                { licenseNumber },
                { "vehicle.registrationNumber": vehicle.registrationNumber }
            ]
        });


        if (existingDriver) {
            return res.status(409).json({
                success: false,
                message: "Driver already exists",
            });
        }


        // Create driver
        const driver = await DriverModel.create({
            username,
            email,
            password,
            phone,
            licenseNumber,
            licenseExpiry,
            vehicle
        });


        // Generate token
        const token = generateToken(driver._id);


        // Store token in HTTP-only cookie
        res.cookie("driverToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });


        res.status(201).json({

            success: true,
            message: "Driver registered successfully",

            driver: {
                id: driver._id,
                username: driver.username,
                email: driver.email,
                phone: driver.phone,
                licenseNumber: driver.licenseNumber,
                licenseExpiry: driver.licenseExpiry,
                vehicle: driver.vehicle,
                rating: driver.rating,
                totalRides: driver.totalRides,
                isAvailable: driver.isAvailable,
                isVerified: driver.isVerified,
            },
        });

    } catch (error) {

        // console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/**
 * -driver Login controller
 * -POST api/driver-auth/login
 */
const loginDriver = async (req, res) => {
    try {

        const { email, password } = req.body;


        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }


        // Password is select:false
        const driver = await DriverModel
            .findOne({ email })
            .select("+password");


        if (!driver) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        // Compare password
        const isPasswordCorrect =
            await driver.comparePassword(password);


        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        // Generate token
        const token = generateToken(driver._id);


        // Store token in HTTP-only cookie
        res.cookie("driverToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({

            success: true,
            message: "Driver login successful",

            driver: {
                id: driver._id,
                username: driver.username,
                email: driver.email,
                phone: driver.phone,
                licenseNumber: driver.licenseNumber,
                licenseExpiry: driver.licenseExpiry,
                vehicle: driver.vehicle,
                rating: driver.rating,
                totalRides: driver.totalRides,
                isAvailable: driver.isAvailable,
                isVerified: driver.isVerified,
            },
        });

    } catch (error) {

        // console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/**
 * -driver Logout controller
 * -POST api/driver-auth/logout
 */
const logoutDriver = async (req, res) => {
    try {

        res.clearCookie("driverToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });


        res.status(200).json({
            success: true,
            message: "Driver logout successful",
        });

    } catch (error) {

        // console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/**
 * -driver Get me controller
 * -GET api/driver-auth/getme
 */
const getMeDriver = async (req, res) => {
    try {

        const driver = await DriverModel.findById(req.driver.id);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }


        res.status(200).json({
            success: true,
            driver,
        });

    } catch (error) {

        // console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


module.exports = {
    registerDriver,
    loginDriver,
    logoutDriver,
    getMeDriver,
};