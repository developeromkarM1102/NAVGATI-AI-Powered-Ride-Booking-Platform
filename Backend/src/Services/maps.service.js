const axios = require("axios");

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;


// Convert address → latitude & longitude
const getCoordinates = async (place) => {

    if (!place) {
        throw new Error("Location is required");
    }

    try {

        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/search",
            {
                params: {
                    text: place,
                    apiKey: GEOAPIFY_API_KEY,
                    format: "json",
                    limit: 1
                }
            }
        );

        const data = response.data;

        // console.log("Geoapify Geocoding Response:");
        // console.log(JSON.stringify(data, null, 2));

        if (
            !data.results ||
            data.results.length === 0
        ) {
            throw new Error(`Location not found: ${place}`);
        }

        const location = data.results[0];

        return {
            latitude: location.lat,
            longitude: location.lon
        };

    } catch (error) {

        // console.error(
        //     "Geocoding Error:",
        //     error.response?.data || error.message
        // );

        throw new Error(
            `Unable to find location: ${place}`
        );
    }
};


// Calculate route between two coordinates
const calculateRoute = async (pickup, destination) => {

    if (!pickup || !destination) {
        throw new Error(
            "Pickup and destination are required"
        );
    }

    try {

        const response = await axios.get(
            "https://api.geoapify.com/v1/routing",
            {
                params: {

                    waypoints:
                        `${pickup.latitude},${pickup.longitude}|` +
                        `${destination.latitude},${destination.longitude}`,

                    mode: "drive",

                    format: "json",

                    units: "metric",

                    apiKey: GEOAPIFY_API_KEY
                }
            }
        );

        const data = response.data;

        // console.log(
        //     "Geoapify Routing Response:"
        // );

        // console.log(
        //     JSON.stringify(data, null, 2)
        // );


        // Validate route

        if (
            !data.results ||
            data.results.length === 0
        ) {
            throw new Error(
                "No route found"
            );
        }


        const route = data.results[0];


        return {

            // Distance in kilometers
            distance: Number(
                (route.distance / 1000).toFixed(2)
            ),

            // Duration in minutes
            duration: Math.ceil(
                route.time / 60
            ),

            // Coordinates
            pickupCoordinates: pickup,

            destinationCoordinates: destination
        };


    } catch (error) {

        // console.error(
        //     "Routing Error:",
        //     error.response?.data ||
        //     error.message
        // );

        throw new Error(
            "Unable to calculate route"
        );
    }
};


module.exports = {
    getCoordinates,
    calculateRoute
};