var express = require("express");
var router = express.Router();
var camp = require("../models/camp");
var middlewareObj = require("../middleware");

router.get("/", function(req, res) {
  //get data from db
  camp.find({}, function(err, from_db) {
    if (err) {
      console.log("failed0");
    } else {
      res.render("camps/yelp_camps", { camp: from_db });
    }
  });
});

router.post("/", middlewareObj.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var add = { name: name, image: image, description: des, author: author };
  camp.create(add, function(err, from_db) {
    if (err) {
      console.log("failed1");
    } else {
      res.redirect("/camps");
    }
  });
});

router.get("/form", middlewareObj.isLoggedIn, function(req, res) {
  res.render("camps/form");
});

//Edit camp Form
router.get("/:id/edit", middlewareObj.checkCampOwner, function(req, res) {
  camp.findById(req.params.id, function(err, responds) {
    res.render("camps/edit", { camp: responds });
  });
});

//edit PUT
router.put("/:id", middlewareObj.checkCampOwner, function(req, res) {
  camp.findByIdAndUpdate(req.params.id, req.body.campE, function(
    err,
    responds
  ) {
    if (err) {
      console.log(err);
      res.redirect("/camps");
    } else {
      console.log("worked9");
      res.redirect("/camps/" + req.params.id);
    }
  });
});

//delete
router.delete("/:id", middlewareObj.checkCampOwner, function(req, res) {
  camp.findByIdAndRemove(req.params.id, function(err, responds) {
    if (err) {
      console.log(err);
      res.redirect("/camps/" + req.params.id);
    } else {
      console.log("worked");
      res.redirect("/camps");
    }
  });
});

router.get("/:id", function(req, res) {
  camp
    .findById(req.params.id)
    .populate("comment")
    .exec(function(err, responds) {
      if (err) {
        console.log("failed2");
        console.log(err);
        res.redirect("/camps");
      } else {
        console.log("worked");
        res.render("camps/details", { camp: responds });
      }
    });
});

module.exports = router;
