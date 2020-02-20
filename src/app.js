const express = require('express');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');
const path = require('path');
const methodoverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const models = require('./models');
const commentRoutes = require('./router/comments');
const campRoutes = require('./router/camps');
const authRoutes = require('./router/auth');
// const seeder = require('../seed');

dotenv.config();
const app = express();
const { User: Users } = models;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer()); // must come after body parser //
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('files'));
app.use(methodoverride('_method'));
app.use(flash());
app.use(logger('dev'));

// passport configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(user.authenticate()));
// i think the plugin gives us the privilege of not written it like above
// passport.use(user.createStrategy());
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Users.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      bcrypt.compare(password, user.password, (err2, res) => {
        if (err2) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const results = await Users.findOne({ where: { id } });
    return done(null, results.rows[0]);
  } catch (error) {
    return done(null, false, error);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next(); // general
});

// routes
app.use('', authRoutes);
app.use('/camps/:id/comment', commentRoutes);
app.use('/camps', campRoutes);

app.get('/', (req, res) => {
  res.render('landing');
});
app.get('*', (req, res) => {
  res.redirect('/');
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
