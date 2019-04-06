import camp from '../models/camp';
import comment from '../models/comment';

const middlewareObj = {

  checkCampOwner: async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const respond = await camp.findById(req.params.id);
        if (respond.author.id.equals(req.user._id)) {
          return next();
        }
        return res.redirect('back');
      } catch (err) {
        console.log(err);
        return res.redirect('back');
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
        return res.redirect('back');
      } catch (err) {
        console.log(err);
        return res.redirect('back');
      }
    }
    return res.redirect('back');
  },
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  },
};
export default middlewareObj;
