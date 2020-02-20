const models = require('../models');

const { camp, comment } = models;

const middlewareObj = {
  checkCampOwner: async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const respond = await camp.findById(req.params.id);
        if (respond.author.id.equals(req.user._id)) {
          return next();
        }
        res.redirect('back');
      } catch (err) {
        res.redirect('back');
      }
    }
    return res.redirect('back');
  },

  checkComment: async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const respond = await comment.findById(req.params.id2);
        if (respond.author.id.equals(req.user._id)) {
          return next();
        }
        res.redirect('back');
      } catch (err) {
        res.redirect('back');
      }
    }
    return res.redirect('back');
  },
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('he');
      return next();
    }
    return res.redirect('/login');
  },
};
module.exports = middlewareObj;
