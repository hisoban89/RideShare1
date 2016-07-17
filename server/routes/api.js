var express  = require('express');
var router   = express.Router();
var passport = require('passport');

var User = require('../models/user.js');

// Register
router.post('/register', function(req, res) {
  // var fname = req.body.fname;
  // var lname = req.body.lname;
  // var username = req.body.username;
  // //var password = req.body.password;
  // console.log(fname);
  // console.log(username);

  User.register(new User({fname: req.body.fname, lname: req.body.lname, username: req.body.username }),
    req.body.password, function(err, account) {
      //console.log(req.body.fname);
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

// Login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
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
router.get('/status', function(req, res) {
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