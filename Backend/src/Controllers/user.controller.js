const UserModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};

/**
 * User Register Controller
 * POST /api/auth/registerUser
 */
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone
        } = req.body;

        // Check required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        });

        if (existingUser) {
            let message = "User already exists";

            if (existingUser.email === email) {
                message = "Email already exists";
            } else if (existingUser.phone === phone) {
                message = "Phone number already exists";
            }

            return res.status(409).json({
                success: false,
                message,
            });
        }

        // Create local user
        const user = await UserModel.create({
            name,
            email,
            password,
            phone,
            role: "user",
            authProvider: "local",
        });

        // Generate token
        const token = generateToken(user._id);

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {
        // console.error("Register User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/**
 * User Login Controller
 * POST /api/auth/loginUser
 */
const loginUser = async (req, res) => {
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
        const user = await UserModel
            .findOne({ email })
            .select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate token
        const token = generateToken(user._id);

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {
        // console.error("Login User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/**
 * User Logout Controller
 * POST /api/auth/logoutUser
 */
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        // console.error("Logout User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/**
 * Get Current User Controller
 * GET /api/auth/getmeUser
 */
const getMeUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        // console.error("Get Me User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMeUser,
};