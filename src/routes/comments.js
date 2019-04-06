import express from 'express'; // id trick
import camp from '../models/camp';
import comment from '../models/comment';
// import user from '../models/user';
import middlewareObj from '../middleware';

const router = express.Router({ mergeParams: true });

router.get('/new', middlewareObj.isLoggedIn, (req, res) => {
  camp.findById(req.params.id, (err, responds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { camp: responds });
    }
  });
});

// edit page
router.get('/:id2/edit', middlewareObj.checkComment, (req, res) => {
  comment.findById(req.params.id2, (err, respond2) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.render('comments/edit', { camp: req.params.id, comment2: respond2 });
    }
  });
});

// put edit
// edit page
router.put('/:id2', middlewareObj.checkComment, (req, res) => {
  comment.findByIdAndUpdate(req.params.id2, req.body.comments, (
    err,
    respond6,
  ) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/camps/${req.params.id}`);
    }
  });
});

// delete
router.delete('/:id2', middlewareObj.checkComment, (req, res) => {
  comment.findByIdAndRemove(req.params.id2, (err, respond6) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.redirect(`/camps/${req.params.id}`);
    }
  });
});

router.post('/', (req, res) => {
  camp.findById(req.params.id, (err, responds1) => {
    if (err) {
      console.log(err);
      res.render('camps');
    } else {
      comment.create(req.body.comments, (err, respond6) => {
        if (err) {
          console.log(err);
        } else {
          respond6.author.id = req.user._id;
          respond6.author.username = req.user.username;
          respond6.save();
          responds1.comment.push(respond6);
          responds1.save();
          res.redirect(`/camps/${responds1._id}`);
        }
      });
    }
  });
});

export default router;
