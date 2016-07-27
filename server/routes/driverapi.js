var express  = require('express');
var router   = express.Router();
var passport = require('passport');

var Driver   = require('../models/driver.js');

// Driverregister
router.post('/driverregister', function(req, res) {
  Driver.register(new Driver({
    driverfname: req.body.driverfname,
    driverlname: req.body.driverlname,
    username: req.body.dusername
  }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Driver registration successful!'
      });
    });
  });
});

// Login
router.post('/driverlogin', function(req, res, next) {
  passport.authenticate('local', function(err, driver, info) {
    if (err) {
      return next(err);
    }
    if (!driver) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(driver, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in driver'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

// Authentication status
router.get('/driverstatus', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});


module.exports = router;