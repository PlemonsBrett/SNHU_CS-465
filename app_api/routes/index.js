const express = require('express');  // Express app
const router = express.Router();  // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)      // GET Method routes tripsList
    .post(tripsController.tripsAddTrip); // POST Method routes tripsAddTrip

// GET single trip by code, UPDATE trip, DELETE trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);

module.exports = router;