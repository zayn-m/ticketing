const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middleware/error');
const connectDb = require('./config/db');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

// Env config
dotenv.config({ path: __dirname+'/.env' });

const app = express();

// Passport config
app.use(passport.initialize());
require('./config/passport')(passport);

connectDb();

// Enable cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => res.send("Available!!!"));

// Importing API routes
require('./routes/api')(app);

// Error middleware
app.use(errorHandler);

// Static assets if in production for react
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running on port '+port);
})

module.exports = app;
