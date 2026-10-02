const DriverModel = require("../Models/Driver.model");
const jwt = require("jsonwebtoken");

// Driver Auth Middleware
const driverAuthMiddleware = async (req, res, next) => {

    try {

        const token = req.cookies.driverToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Driver not authenticated",
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const driver = await DriverModel
            .findById(decoded.id)
            .select("-password");


        if (!driver) {
            return res.status(401).json({
                success: false,
                message: "Driver not found",
            });
        }


        req.driver = driver;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


module.exports = driverAuthMiddleware;