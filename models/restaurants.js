const axios = require('axios');
const db = require('../db/index.js');

const restaurants = {};

var reviews = [];

findReviews();

function findReviews() {
  db
    .many('SELECT * FROM yelp_reviews')
    .then(data => {
      reviews = data;
      console.log(reviews);
    })
    .catch(error => {
      console.log('error encountered in findReviews. Error:', error);
    });
}

restaurants.findBrunch = (req, res, next) => {
  axios({
    method: 'get',
    url: `http://api.yelp.com/v3/businesses/search?term=brunch&location===Upper West Side, Manhattan, New York,usa&limit=3`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      var results = response.data.businesses;
      for (var i = 0; i <results.length; i++) {
        var datum = reviews.filter(el => el['rest_id'] === results[i]['id']);
        console.log('datum is', datum);
        results[i] = {
          "id": results[i]["id"],
          "name": results[i]["name"],
          "image_url": results[i]["image_url"],
          "url": results[i]["url"],
          "categories": results[i]["categories"],
          "rating": results[i]["rating"],
          "transactions": results[i]["transactions"],
          "price": results[i]["price"],
          "location": results[i]["location"],
          "phone": results[i]["phone"],
          "display_phone": results[i]["display_phone"],
          "distance": results[i]["distance"], 
          "reviews": datum, 
           "hours": results[i]["hours"],
          "hours_type": results[i]["hours_type"],
          "is_open_now": results[i]["is_open_now"]
          };        
        }
      res.locals.brunch = results;
      next();
    })
    .catch(error => {
      console.log('error encountered in restaurants.findBrunch, error: ', error);
      next(error);
    });
};

restaurants.findCocktail = (req, res, next) => {
  axios({
    method: 'get',
    url: `http://api.yelp.com/v3/businesses/search?term=cocktail bars&location===West Village, Manhattan, New York,usa&limit=3`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      var results = response.data.businesses;
      for (var i = 0; i <results.length; i++) {
        var datum = reviews.filter(el => el['rest_id'] === results[i]['id']);
        console.log('datum is', datum);
        results[i] = {
          "id": results[i]["id"],
          "name": results[i]["name"],
          "image_url": results[i]["image_url"],
          "url": results[i]["url"],
          "categories": results[i]["categories"],
          "rating": results[i]["rating"],
          "transactions": results[i]["transactions"],
          "price": results[i]["price"],
          "location": results[i]["location"],
          "phone": results[i]["phone"],
          "display_phone": results[i]["display_phone"],
          "distance": results[i]["distance"], 
          "reviews": datum, 
           "hours": results[i]["hours"],
          "hours_type": results[i]["hours_type"],
          "is_open_now": results[i]["is_open_now"]
          };        
        }
      res.locals.cocktail = results;
      next();
    })
    .catch(error => {
      console.log('error encountered in restaurants.findCocktail, error: ', error);
      next(error);
    });
};

restaurants.findMexican = (req, res, next) => {
  axios({
    method: 'get',
    url: `http://api.yelp.com/v3/businesses/search?term=mexican restaurants&location===Hell's Kitchen, Manhattan, New York,usa&limit=3`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      var results = response.data.businesses;
      for (var i = 0; i <results.length; i++) {
        var datum = reviews.filter(el => el['rest_id'] === results[i]['id']);
        console.log('datum is', datum);
        results[i] = {
          "id": results[i]["id"],
          "name": results[i]["name"],
          "image_url": results[i]["image_url"],
          "url": results[i]["url"],
          "categories": results[i]["categories"],
          "rating": results[i]["rating"],
          "transactions": results[i]["transactions"],
          "price": results[i]["price"],
          "location": results[i]["location"],
          "phone": results[i]["phone"],
          "display_phone": results[i]["display_phone"],
          "distance": results[i]["distance"], 
          "reviews": datum, 
           "hours": results[i]["hours"],
          "hours_type": results[i]["hours_type"],
          "is_open_now": results[i]["is_open_now"]
          };        
        }
      res.locals.mexican = results;
      next();
    })
    .catch(error => {
      console.log('error encountered in restaurants.findMexican, error: ', error);
      next(error);
    });
};

module.exports = restaurants;
