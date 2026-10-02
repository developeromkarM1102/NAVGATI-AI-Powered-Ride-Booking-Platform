const DriverModel = require("../Models/Driver.model");


const findAvailableDrivers = async (requirements) => {

    const query = {

        isAvailable: true,

        isVerified: true,

        "vehicle.seats": {
            $gte: requirements.passengers
        }
    };


    // If user specifically requested a vehicle type
    if (
        requirements.rideType &&
        requirements.rideType !== "any"
    ) {

        query["vehicle.type"] =
            requirements.rideType;
    }

    const drivers = await DriverModel.find(query)

    return drivers;
};


module.exports = {
    findAvailableDrivers
};