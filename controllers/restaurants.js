const restaurants = require('../models/restaurants.js');
const router = require('express').Router();

router.get('/brunch', restaurants.findBrunch, (req, res) => {
  res.json(res.locals.brunch);
});

router.get('/cocktail', restaurants.findCocktail, (req, res) => {
  res.json(res.locals.cocktail);
});

router.get('/mexican', restaurants.findMexican, (req, res) => {
  res.json(res.locals.mexican);
});


module.exports = router;