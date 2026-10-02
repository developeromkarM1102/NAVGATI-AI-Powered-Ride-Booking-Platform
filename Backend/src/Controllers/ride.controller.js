const { analyzeRideRequest } = require("../Services/ai.service");

const { calculateRoute, getCoordinates } = require("../Services/maps.service");

const { findAvailableDrivers } = require("../Services/matching.service");

const { calculateFare } = require("../Services/fare.service");

const { recommendRides } = require("../Services/recommendation.service");

// analyzeAndRecommendRide Controller 
const analyzeAndRecommendRide = async (req, res) => {
    try {
        const { text } = req.body;

        // 1. Validate input
        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Ride request is required"
            });
        }

        // 2. Gemini analyzes user request
        const requirements = await analyzeRideRequest(text);

        // 3. Validate locations
        if (!requirements.pickup || !requirements.destination) {
            return res.status(400).json({
                success: false,
                message: "Pickup and destination are required"
            });
        }

        // 4. Get coordinates
        const pickupCoordinates = await getCoordinates(
            requirements.pickup
        );

        const destinationCoordinates = await getCoordinates(
            requirements.destination
        );

        // 5. Calculate route
        const route = await calculateRoute(
            pickupCoordinates,
            destinationCoordinates
        );

        // 6. Find available drivers
        const drivers = await findAvailableDrivers(
            requirements
        );

        // console.log("Requirements:", requirements);
        // console.log("Pickup Coordinates:", pickupCoordinates);
        // console.log("Destination Coordinates:", destinationCoordinates);
        // console.log("Available Drivers:", drivers);
        // console.log("Driver Count:", drivers.length);

        // 7. Calculate fares
        const rideOptions = drivers.map(driver => {
            const fare = calculateFare({
                distance: route.distance,
                rideType: driver.vehicle.type
            });

            const eta = 10;

            return {
                driver,
                fare,
                eta,
                distance: route.distance,
                duration: route.duration
            };
        });

        // 8. Rank rides
        const recommendedRides = recommendRides(
            rideOptions,
            requirements
        );

        // 9. Return result
        res.status(200).json({
            success: true,

            requirements: {
                ...requirements,

                pickupCoordinates: {
                    latitude: pickupCoordinates.latitude,
                    longitude: pickupCoordinates.longitude
                },

                destinationCoordinates: {
                    latitude: destinationCoordinates.latitude,
                    longitude: destinationCoordinates.longitude
                }
            },

            route: {
                distance: route.distance,
                duration: route.duration,
                geometry: route.geometry
            },

            recommendations: recommendedRides
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    analyzeAndRecommendRide
};