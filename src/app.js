import express from 'express';
import cors from 'cors';
import expressSanitizer from 'express-sanitizer';
import path from 'path';
import mongoose from 'mongoose';
import methodoverride from 'method-override';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import logger from 'morgan';
// model imports
// const seed = require('../seed');
// const camp = require('./models/camp');
// const comment = require('./models/comment');
import user from './models/user';
import commentRoutes from './routes/comments';
import campRoutes from './routes/camps';
import authRoutes from './routes/auth';

const app = express();

mongoose.connect(
  'mongodb+srv://timi:12345@cluster0-fdmmq.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true },
);
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

// passport configuration
app.use(
  require('express-session')({
    secret: 'i love bukky',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

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

app.listen(3000, () => {
  console.log('server working');
});

// for process.env it will be
// export DATABASEURL=
// no "" just write it straight
// final it will be prp.env.database || 'https:tyryryry'
