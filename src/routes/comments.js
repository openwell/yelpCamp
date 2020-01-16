import express from 'express';
import camp from '../models/camp';
import comment from '../models/comment';
import middlewareObj from '../middleware';

const router = express.Router({ mergeParams: true });

router.get('/new', middlewareObj.isLoggedIn, (req, res) => {
  camp.findById(req.params.id, function(err, data) {
    if (err) {
      throw err;
    }
    return res.render('comments/new', { camp: data });
  });
});

// edit page
router.get('/:id2/edit', middlewareObj.checkComment, (req, res) => {
  comment.findById(req.params.id2, function(err, data) {
    if (err) {
      res.redirect('back');
      throw err;
    }
    return res.render('comments/edit', { camp: req.params.id, comment2: data });
  });
});

// put edit
// edit page
router.put('/:id2', middlewareObj.checkComment, (req, res) => {
  comment.findByIdAndUpdate(req.params.id2, req.body.comments, function(
    err,
    data
  ) {
    if (err) {
      throw err;
    }
    return res.redirect(`/camps/${req.params.id}`);
  });
});

// delete
router.delete('/:id2', middlewareObj.checkComment, (req, res) => {
  comment.findByIdAndRemove(req.params.id2, function(err, data) {
    if (err) {
      res.redirect('back');
      throw err;
    }
    return res.redirect(`/camps/${req.params.id}`);
  });
});

router.post('/', (req, res) => {
  camp.findById(req.params.id, function(err01, data01) {
    if (err01) {
      res.render('camps');
      throw err01;
    }
    comment.create(req.body.comments, function(err, data02) {
      if (err) {
        throw err;
      }
      data02.author.id = req.user._id;
      data02.author.username = req.user.username;
      data02.save();
      data01.comment.push(data02);
      data01.save();
      res.redirect(`/camps/${data01._id}`);
    });
  });
});

export default router;
