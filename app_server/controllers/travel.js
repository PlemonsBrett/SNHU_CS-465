const Trip = require('../models/travlr');

/* GET travel page */
const travel = async (req, res) => {
  try {
    console.log('Fetching trips from database...');
    const trips = await Trip.find({}).lean(); // .lean() returns plain JavaScript objects
    console.log(`Found ${trips.length} trips`);
    
    res.render('travel', { 
      title: 'Travel',
      trips: trips,
      travel: true,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error('Error in travel controller:', err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error retrieving trips from database',
      error: err,
      year: new Date().getFullYear()
    });
  }
};

module.exports = {
  travel
};