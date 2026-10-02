const { OAuth2Client } = require("google-auth-library");

const User = require("../Models/User.model");

const googleClient = new OAuth2Client(

    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL

);


const getGoogleAuthUrl = () => {

    return googleClient.generateAuthUrl({

        access_type: "offline",

        scope: [
            "openid",
            "email",
            "profile"
        ],

        prompt: "select_account"

    });

};


const authenticateGoogleUser = async (code) => {

    const { tokens } = await googleClient.getToken(code);


    if (!tokens.id_token) {

        throw new Error(
            "Google ID token was not returned"
        );

    }


    const ticket = await googleClient.verifyIdToken({

        idToken: tokens.id_token,

        audience: process.env.GOOGLE_CLIENT_ID

    });


    const payload = ticket.getPayload();


    if (!payload) {

        throw new Error(
            "Invalid Google user information"
        );

    }


    const {
        sub: googleId,
        email,
        name,
        picture,
        email_verified
    } = payload;


    if (!email) {

        throw new Error(
            "Google account does not contain an email"
        );

    }


    if (!email_verified) {

        throw new Error(
            "Google email is not verified"
        );

    }


    // Check if Google account already exists
    let user = await User.findOne({
        googleId
    });


    if (user) {

        return user;

    }


    // Check if email already exists
    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });


    if (existingUser) {

        throw new Error(
            "An account with this email already exists. Please login using your existing account."
        );

    }


    // Create new Google user
    user = await User.create({

        name: name || "NavGati User",

        email: email.toLowerCase(),

        password: null,

        googleId,

        authProvider: "google",

        profileImage: picture || "",

        isVerified: true

    });


    return user;

};


module.exports = {
    getGoogleAuthUrl,
    authenticateGoogleUser
};