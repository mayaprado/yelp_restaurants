const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv').config();
const cors = require('cors');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public/build'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cookieParser());

app.listen(port, () => {
  console.log('Server started on ' + port);
});

const restaurantsRouter = require('./controllers/restaurants.js');

app.use('/restaurants', restaurantsRouter);

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
