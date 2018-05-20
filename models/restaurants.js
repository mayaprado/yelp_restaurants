const axios = require('axios');
const db = require('../db/index.js');

const restaurants = {};

function findReviews(arr) {
  var reviews = [];
  arr.map(el => {
    db
      .any('SELECT * FROM yelp_reviews WHERE rest_id = ${id};', { id: el['id'] })
      .then(data => {
        data = data.map(el => el['rev_text']);
        reviews.push(data);
        console.log('reviews are', reviews);
      })
      .catch(error => {
        console.log('error encountered in events.allEvents. Error:', error);
      });
    });
  
}

restaurants.findBrunch = (req, res, next) => {
  axios({
    method: 'get',
    url: `http://api.yelp.com/v3/businesses/search?term=brunch&location===Upper West Side, Manhattan, New York,usa&limit=5`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      res.locals.brunch = response.data.businesses;
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
    url: `http://api.yelp.com/v3/businesses/search?term=cocktail bars&location===West Village, Manhattan, New York,usa&limit=5`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      var results = response.data.businesses;
      res.locals.cocktail = findReviews(results);
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
    url: `http://api.yelp.com/v3/businesses/search?term=mexican restaurants&location===Hell's Kitchen, Manhattan, New York,usa&limit=5`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      res.locals.mexican = response.data.businesses;
      next();
    })
    .catch(error => {
      console.log('error encountered in restaurants.findMexican, error: ', error);
      next(error);
    });
};

restaurants.addBook = (req, res, next) => {
  const keyword = req.body.keyword;
  axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
  })
    .then(response => {
      res.locals.books = response.data.items;
      console.log('response: ', response.data.items);
      next();
    })
    .catch(error => {
      console.log('error encountered in events.addBook error: ', error);
      next(error);
    });
};



module.exports = restaurants;
