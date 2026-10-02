const express = require("express");

const router = express.Router();

const userAuthMiddleware = require("../Middlewares/userMiddleware");

const { analyzeAndRecommendRide } = require("../Controllers/ride.controller");

// User Ride Requirements Analyze Route
router.post("/analyze", userAuthMiddleware, analyzeAndRecommendRide);

module.exports = router;