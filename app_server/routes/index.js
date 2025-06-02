const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Travlr Getaways',
    home: true,
    year: new Date().getFullYear()
  });
});

/* GET travel page */
router.get('/travel', ctrlTravel.travel);

module.exports = router;