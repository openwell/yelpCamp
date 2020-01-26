import express from 'express';
import cors from 'cors';
import expressSanitizer from 'express-sanitizer';
import path from 'path';
import mongoose from 'mongoose';
import methodoverride from 'method-override';
import passport from 'passport';
import flash from 'connect-flash';
import logger from 'morgan';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
// import pg from 'pg';
import user from './models/user';
import commentRoutes from './router/comments';
import campRoutes from './router/camps';
import authRoutes from './router/auth';
import session from 'express-session';
// import seeder from '../seed';
// import LocalStrategy from 'passport-local';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// pg.defaults.ssl = true;
const sequelize = new Sequelize(process.env.PG_URI);
// seeder();
mongoose.connect(process.env.MONGO_SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
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
passport.use(user.createStrategy());
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
app.get('*', (req, res) => {
  res.redirect('/');
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
