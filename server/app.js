// dependencies
var express        = require('express');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var expressSession = require('express-session');
var mongoose       = require('mongoose');
var hash           = require('bcrypt-nodejs');
var path           = require('path');
var passport       = require('passport');
var localStrategy  = require('passport-local' ).Strategy;

// mongoose
mongoose.connect('mongodb://localhost/ride-share1');

// user schema/model
var User    = require('./models/user.js');
// booking schema/model
var Booking = require('./models/booking.js');
// driver schema/model
var Driver  = require('./models/driver.js');

// create instance of express
var app = express();

// require routes
var routes       = require('./routes/api.js');
var driverroutes = require('./routes/driverapi.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================================
passport.use(new localStrategy(Driver.authenticate()));
passport.serializeUser(Driver.serializeUser());
passport.deserializeUser(Driver.deserializeUser());

app.use('/driver/', driverroutes);

// ================================

// routes
app.use('/user/', routes);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


// ======================

// // error hndlers
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.driverstatus = 404;
//   next(err);
// });

// app.use(function(err, req, res) {
//   res.driverstatus(err.driverstatus || 500);
//   res.end(JSON.stringify({
//     message: err.message,
//     error: {}
//   }));
// });

// ======================

module.exports = app;