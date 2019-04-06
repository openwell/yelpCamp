var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

////==================
//User Login and Registration
/////================
//login
router.get("/login", function(req, res) {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/camps",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logout

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "log out successful");
  res.redirect("/camps");
});

//register
router.get("/register", function(req, res) {
  res.render("auth/register");
});

router.post("/register", function(req, res) {
  user.register(
    new user({ username: req.body.username }),
    req.body.password,
    function(err, respond) {
      if (err) {
        console.log(err);
        return res.render("auth/register");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/camps");
      });
    }
  );
});

module.exports = router;
