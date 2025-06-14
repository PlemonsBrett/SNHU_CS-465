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

// POST: /api/trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await newTrip.save();
        
        if (!savedTrip) {
            return res
                .status(400)
                .json({ "message": "Failed to save trip" });
        } else {
            return res
                .status(201)
                .json(savedTrip);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ "message": "Database error", "error": err.message });
    }
};

// PUT: /api/trips/:tripCode - updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;
        
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: tripCode },
            {
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return the updated document
        );

        if (!updatedTrip) {
            return res
                .status(404)
                .json({ "message": "Trip not found with code: " + tripCode });
        } else {
            return res
                .status(200)
                .json(updatedTrip);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ "message": "Database error", "error": err.message });
    }
};

// DELETE: /api/trips/:tripCode - deletes a trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;
        
        const deletedTrip = await Trip.findOneAndDelete({ code: tripCode });

        if (!deletedTrip) {
            return res
                .status(404)
                .json({ "message": "Trip not found with code: " + tripCode });
        } else {
            return res
                .status(200)
                .json({ 
                    "message": "Trip deleted successfully",
                    "deletedTrip": deletedTrip 
                });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ "message": "Database error", "error": err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};