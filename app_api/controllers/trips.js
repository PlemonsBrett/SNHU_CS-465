const Trip = require('../models/travlr');

// GET: /api/trips - returns all trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips || trips.length === 0) {
            // Database returned no data
            return res
                .status(404)
                .json({ "message": "No trips found" });
        } else {
            // Return resulting trip list
            return res
                .status(200)
                .json(trips);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ "message": "Database error", "error": err.message });
    }
};

// GET: /api/trips/:tripCode - returns a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsFindByCode = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;
        const trip = await Trip.findOne({ code: tripCode });

        // Uncomment for debugging - this will show the query parameter
        // on the console.
        // console.log(tripCode);

        if (!trip) {
            // Database returned no data
            return res
                .status(404)
                .json({ "message": "Trip not found with code: " + tripCode });
        } else {
            // Return resulting trip
            return res
                .status(200)
                .json(trip);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ "message": "Database error", "error": err.message });
    }
};

// Note: add additional endpoints to module.exports
module.exports = {
    tripsList,
    tripsFindByCode
}