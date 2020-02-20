const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const models = require('../models');

const { User } = models;
const router = express.Router();

// //==================
// User Login and Registration
// ///================

// login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/camps',
    failureRedirect: '/login',
  })
);

// logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Log out successful');
  res.redirect('/camps');
});

// register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const output = await User.create({
      username,
      password: hash,
    });
    passport.authenticate('local', (errs, user, info) => {
      if (user) return res.redirect('/camps');
    })(req, res, next);
  } catch (err) {
    res.render('auth/register');
  }
});

module.exports = router;
