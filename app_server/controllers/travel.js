const fs = require('fs');
const path = require('path');

// Read trips data from JSON file
const trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

/* GET travel page */
const travel = (req, res) => {
  const pageTitle = 'Travel';
  res.render('travel', { 
    title: pageTitle,
    trips: trips,
    year: new Date().getFullYear()
  });
};

module.exports = {
  travel
};