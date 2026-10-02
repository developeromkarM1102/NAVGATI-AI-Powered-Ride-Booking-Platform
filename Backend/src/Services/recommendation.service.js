
const calculateScore = ({ driver, fare, eta, preferences }) => {

    let score = 0;

    // Driver rating
    score += driver.rating * 20;

    // Lower fare is better
    score += Math.max(0, 100 - fare) * 0.2;

    // Lower ETA is better
    score += Math.max(0, 30 - eta);

    // Verified driver
    if (driver.isVerified) {
        score += 10;
    }

    // User prefers safety
    if (
        preferences.includes("safe") &&
        driver.safetyScore
    ) {
        score += driver.safetyScore * 5;
    }

    return score;
};

const recommendRides = (drivers, requirements) => {

    const rides = drivers.map(driver => {

        // Temporary values.
        // These will come from Maps / fare service.
        const fare = driver.fare;
        const eta = driver.eta;

        const score = calculateScore({
            driver,
            fare,
            eta,
            preferences: requirements.preferences
        });

        return {
            driver,
            fare,
            eta,
            score
        };
    });

    return rides.sort(
        (a, b) => b.score - a.score
    );
};

module.exports = {
    recommendRides
};