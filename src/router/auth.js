import express from 'express';
import passport from 'passport';
import User from '../model/user';

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
    // console.log(err.message);
    res.render('auth/register');
  }
});

export default router;
