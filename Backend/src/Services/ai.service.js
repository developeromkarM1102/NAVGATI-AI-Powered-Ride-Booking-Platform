const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const analyzeRideRequest = async (text) => {

    const response = await ai.models.generateContent({

        model: "gemini-3.6-flash",

        contents: `
You are NavGati's ride request analyzer.

Analyze the user's ride request and extract the following information:

- pickup
- destination
- date
- time
- passengers
- luggage
- rideType
- preferences

Rules:

1. Return ONLY valid JSON.
2. Do not calculate distance.
3. Do not calculate fare.
4. Do not recommend a driver.
5. If information is not provided, use null.
6. passengers should be a number.
7. luggage should be true or false.
8. rideType can be bike, auto, car, suv, or any.
9. preferences should be an array.

User request:

${text}
`,
        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {

                    pickup: {
                        type: ["string", "null"]
                    },

                    destination: {
                        type: ["string", "null"]
                    },

                    date: {
                        type: ["string", "null"]
                    },

                    time: {
                        type: ["string", "null"]
                    },

                    passengers: {
                        type: ["integer", "null"]
                    },

                    luggage: {
                        type: "boolean"
                    },

                    rideType: {
                        type: "string"
                    },

                    preferences: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                },

                required: [
                    "pickup",
                    "destination",
                    "date",
                    "time",
                    "passengers",
                    "luggage",
                    "rideType",
                    "preferences"
                ]
            }
        }
    });

    return JSON.parse(response.text);
};

module.exports = {
    analyzeRideRequest
};