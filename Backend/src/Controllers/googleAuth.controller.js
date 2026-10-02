const { getGoogleAuthUrl, authenticateGoogleUser } = require("../Services/googleAuth.service");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id.toString(),
            email: user.email,
            role: "user",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};

const googleLogin = async (req, res) => {

    try {

        const googleAuthUrl = getGoogleAuthUrl();

        return res.redirect(googleAuthUrl);

    } catch (error) {

        // console.error("Google Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to start Google authentication"
        });

    }

};

const googleCallback = async (req, res) => {

    try {

        const { code } = req.query;

        if (!code) {

            return res.redirect(
                `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
            );

        }


        const user = await authenticateGoogleUser(code);

        const token = generateToken(user);


        res.cookie("token", token, {

            httpOnly: true,

            secure: true,

            sameSite: "none",

            maxAge: 1 * 24 * 60 * 60 * 1000

        });


        return res.redirect(`${process.env.FRONTEND_URL}/Dashboard`);

    } catch (error) {

        // console.error(
        //     "Google Callback Error:",
        //     error
        // );

        return res.redirect(
            `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(
                error.message || "Google authentication failed"
            )}`
        );

    }

};

module.exports = {
    googleLogin,
    googleCallback
}
