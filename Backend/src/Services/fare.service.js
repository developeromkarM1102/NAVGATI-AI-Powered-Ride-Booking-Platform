const calculateFare = ({ distance, rideType }) => {

    const baseFare = {
        bike: 30,
        auto: 50,
        car: 80,
        suv: 120
    };


    const perKm = {
        bike: 8,
        auto: 12,
        car: 18,
        suv: 25
    };


    const base = baseFare[rideType] || baseFare.car;

    const rate = perKm[rideType] || perKm.car;

    const fare = base + (distance * rate);

    return Math.round(fare);
};

module.exports = {
    calculateFare
};