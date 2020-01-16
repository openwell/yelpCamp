import express from 'express';
import passport from 'passport';
import User from '../models/user';

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
  req.flash('success', 'log out successful');
  res.redirect('/camps');
});

// register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const regOutput = await User.register(
      new User({ username: req.body.username }),
      req.body.password
    );
    passport.authenticate('local')(req, res, () => {
      res.redirect('/camps');
    });
  } catch (err) {
    console.log(err.message);
    res.render('auth/register');
  }
});

export default router;

// unhandled promise exception i caused when we try to rethrow an error that node has handled
// if you are using async await and u don't intend to modify the error you dont need try and catch
// when you make use of a callback which returns an err or res then u can check for if(err) to handle it. dont use try and catch for it
// for .then will require .catch to get the errors
// also async and await does return err/responds if err it throws it and else returns data
