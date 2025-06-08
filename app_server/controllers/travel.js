// Comment out old filesystem approach
// const fs = require('fs');
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  }
};

/* GET travel page */
const travel = async (req, res) => {
  // console.log('TRAVEL CONTROLLER BEGIN');
  
  try {
    const response = await fetch(tripsEndpoint, options);
    const json = await response.json();

    let message = null;
    if (!Array.isArray(json)) {
      // API lookup error
      json = [];
      message = 'API lookup error';
    } else if (json.length === 0) {
      message = 'No trips exist in the database';
    }

    res.render('travel', {
      title: 'Travel',
      trips: json,
      travel: true,
      message: message,
      year: new Date().getFullYear()
    });

    // console.log('TRAVEL CONTROLLER AFTER RENDER');
  } catch (err) {
    console.error('Error in travel controller:', err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error retrieving trips from API',
      error: err,
      year: new Date().getFullYear(),
    });
  }
};

module.exports = {
  travel
};