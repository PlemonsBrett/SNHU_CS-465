const fs = require('node:fs');
const path = require('node:path');

// Read trips data
const trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

/* GET travel page */
const travel = (req, res) => {
  res.render('travel', { 
    title: 'Travel',
    trips: trips 
  });
};

module.exports = {
  travel
};