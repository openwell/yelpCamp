var express = require('express'),
  cors = require('cors'),
  expressSanitizer = require('express-sanitizer'),
  app = express(),
  path = require('path'),
  // bodyParser = require("body-parser"),
  mongoose = require('mongoose'),
  methodoverride = require('method-override'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  //model imports
  seed = require('../seed'),
  camp = require('./models/camp'),
  comment = require('./models/comment').default,
  user = require('./models/user'),
  //Routes Import it think we only needed to import them to shorting the link
  commentRoutes = require('./routes/comments'),
  campRoutes = require('./routes/camps'),
  authRoutes = require('./routes/auth');

app.use(cors());
// seed(); //easy delete
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
// mongoose.connect(
//   "mongodb+srv://yelpCamp:<12345>@cluster0-fdmmq.mongodb.net/test?retryWrites=true",
//   { useNewUrlParser: true }
// );

// const uri = "mongodb+srv://timi:12345@cluster0-fdmmq.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true });
// MongoClient.connect(
//   "mongodb+srv://timi:12345@cluster0-fdmmq.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true } );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer()); // must come after body parser //
app.set('view engine', 'ejs');
app.set('views', './src/views');
// app.use(express.static(__dirname + "../public"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('files'));
app.use(methodoverride('_method'));
app.use(flash());

// passport configuration
app.use(
  require('express-session')({
    secret: 'i love bukky',
    resave: false,
    saveUninitialized: false
  })
);
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next(); //general
});

//routes
app.use('', authRoutes);
app.use('/camps/:id/comment', commentRoutes);
app.use('/camps', campRoutes);

app.get('/', function(req, res) {
  res.render('landing');
});

//must be there works with request
app.listen(3000, function() {
  console.log('server working');
});
// cloud 9 was wat he used
// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log('server working');

// });
// for process.env it will be
// export DATABASEURL=
// no "" just write it straight
// final it will be prp.env.database || 'https:tyryryry'
