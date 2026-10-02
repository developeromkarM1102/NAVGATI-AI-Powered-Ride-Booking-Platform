const UserModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");

// User Auth Middleware
const userAuthMiddleware = async (req, res, next) => {

    try {

        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }


        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Find user
        const user = await UserModel
            .findById(decoded.id)
            .select("-password");


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }


        // Attach user to request
        req.user = user;


        // Continue to controller
        next();

    } catch (error) {

        // console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


module.exports = userAuthMiddleware;