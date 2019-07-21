import express from 'express';
import camp from '../models/camp';
import comment from '../models/comment';
import middlewareObj from '../middleware';

const router = express.Router({ mergeParams: true });

router.get('/new', middlewareObj.isLoggedIn, (req, res) => {
  camp.findById(req.params.id, (err, responds) => {
    if (err) {
      throw err;
    }
    return res.render('comments/new', { camp: responds });
  });
});

// edit page
router.get('/:id2/edit', middlewareObj.checkComment, (req, res) => {
  comment.findById(req.params.id2, (err, data) => {
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
  comment.findByIdAndUpdate(req.params.id2, req.body.comments, (err, data) => {
    if (err) {
      throw err;
    }
    return res.redirect(`/camps/${req.params.id}`);
  });
});

// delete
router.delete('/:id2', middlewareObj.checkComment, (req, res) => {
  comment.findByIdAndRemove(req.params.id2, (err, data) => {
    if (err) {
      res.redirect('back');
      throw err;
    }
    return res.redirect(`/camps/${req.params.id}`);
  });
});

router.post('/', (req, res) => {
  camp.findById(req.params.id, (err, data0) => {
    console.log(data0);
    if (err) {
      res.render('camps');
      throw err;
    }
    comment.create(req.body.comments).then((err, data) => {
      console.log(data);
      const { id, username } = data.author;
      const { _id, username: user } = req.user;
      if (err) {
        throw err;
      }
      id = _id;
      username = user;
      data.save();
      data0.comment.push(data);
      data0.save();
      return res.redirect(`/camps/${data0._id}`);
    });
  });
});

export default router;
