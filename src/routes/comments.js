var express = require("express");
var router = express.Router({ mergeParams: true }); //id trick
var camp = require("../models/camp");
var comment = require("../models/comment");
var user = require("../models/user");
var middlewareObj = require("../middleware");

router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
  camp.findById(req.params.id, function(err, responds) {
    if (err) {
      console.log("failed4");
      console.log(err);
    } else {
      console.log("worked");
      res.render("comments/new", { camp: responds });
    }
  });
});

//edit page
router.get("/:id2/edit", middlewareObj.checkComment, function(req, res) {
  comment.findById(req.params.id2, function(err, respond2) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log(respond2);
      res.render("comments/edit", { camp: req.params.id, comment2: respond2 });
    }
  });
});

//put edit
//edit page
router.put("/:id2", middlewareObj.checkComment, function(req, res) {
  comment.findByIdAndUpdate(req.params.id2, req.body.comments, function(
    err,
    respond6
  ) {
    if (err) {
      console.log("failed4");
      console.log(err);
    } else {
      res.redirect("/camps/" + req.params.id);
    }
  });
});

//delete
router.delete("/:id2", middlewareObj.checkComment, function(req, res) {
  comment.findByIdAndRemove(req.params.id2, function(err, respond6) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/camps/" + req.params.id);
    }
  });
});

router.post("/", function(req, res) {
  camp.findById(req.params.id, function(err, responds1) {
    if (err) {
      console.log("failed5");
      console.log(err);
      res.render("camps");
    } else {
      comment.create(req.body.comments, function(err, respond6) {
        if (err) {
          console.log("failed4");
          console.log(err);
        } else {
          respond6.author.id = req.user._id;
          respond6.author.username = req.user.username;
          respond6.save();
          responds1.comment.push(respond6);
          responds1.save();
          res.redirect("/camps/" + responds1._id);
        }
      });
    }
  });
});

module.exports = router;
