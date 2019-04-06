var camp = require("../models/camp");
var comment = require("../models/comment").default;

var middlewareObj = {};

middlewareObj.checkCampOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    camp.findById(req.params.id, function(err, responds) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        if (responds.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkComment = function(req, res, next) {
  if (req.isAuthenticated()) {
    comment.findById(req.params.id2, function(err, responds) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        if (responds.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
