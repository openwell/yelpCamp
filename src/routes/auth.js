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
  }),
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

router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
  )
    .then(() => {
      passport.authenticate('local')
        .then(() => {
          res.redirect('/camps');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.render('auth/register');
    });
});


export default router;
