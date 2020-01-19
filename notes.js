// combining export default and required gave me problems
// I solved it by making adding default to the back of the require call in seed
// for process.env it will be
// export DATABASEURL=
// no "" just write it straight
// final it will be process.env.database || 'https:tyryryry'

// The passport package helps to simplify things.
// The Local strategy helps to validate things like findById and returns done or err.
// when we call on authenticate('local') all it does is reference the define strategy
// For other you will have to write it by your self. like facebook
// Also passport.authenticate helps call req.login just like re.logout which i believe will clear the session.
// express session comes before the passport.session
// flash works with connect-flash
// session is false after authentication since for every req a token is sent for verification
//  passport.authenticate('local', {successRedirect: '/camps', failureRedirect: '/login',
// if you don't like that one u can write yours e.g below and its your responsibility to call req.login() and send a response.
// passport.authenticate('local', function(err, user, info) {
//   if (err) { return next(err); }
//   if (!user) { return res.redirect('/login'); }
//   req.logIn(user, function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/users/' + user.username);
//   });
// })(req, res, next);

// sample of a local strategy
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
// The same thing with serialize  This is like the 3rd thing it helps to do
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

// unhandled promise exception i caused when we try to rethrow an error that node has handled
// if you are using async await and u don't intend to modify the error you dont need try and catch
// when you make use of a callback which returns an err or res then u can check for if(err) to handle it. dont use try and catch for it
// for .then will require .catch to get the errors
// also async and await does return err/responds if err it throws it and else returns data
