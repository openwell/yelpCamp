const express = require('express');
const middlewareObj = require('../middleware');
const models = require('../models');

const { Camp, Comment } = models;

const router = express.Router({ mergeParams: true });

router.get('/new', middlewareObj.isLoggedIn, (req, res) => {
  Camp.findByPk(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    return res.render('comments/new', { camp: data });
  });
});

// edit page
router.get('/:id2/edit', middlewareObj.checkComment, (req, res) => {
  Comment.findByPk(req.params.id2, (err, data) => {
    if (err) {
      res.redirect('back');
      throw err;
    }
    return res.render('comments/edit', { camp: req.params.id, comment2: data });
  });
});

// put edit
// edit page
router.put('/:id2', middlewareObj.checkComment, async (req, res) => {
  try {
    await Comment.update(req.body.comments, {
      where: { id: req.params.id },
    });
    return res.redirect(`/camps/${req.params.id}`);
  } catch (err) {
    throw err;
  }
});

// delete
router.delete('/:id2', middlewareObj.checkComment, async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id2,
      },
    });
    return res.redirect(`/camps/${req.params.id}`);
  } catch (err) {
    res.redirect('back');
    throw err;
  }
  // comment.findByIdAndRemove(req.params.id2, (err, data) => {
  //   if (err) {
  //     res.redirect('back');
  //     throw err;
  //   }
  //
  // });
});

router.post('/', async (req, res) => {
  try {
    await Comment.create({
      text: req.body.comments,
      authorId: req.user._id,
      authorName: req.user.username,
      campId: req.params.id,
    });
    res.redirect(`/camps/${req.params.id}`);
  } catch (err) {
    throw err;
  }

  // camp.findByPk(req.params.id, (err01, data01) => {
  //   if (err01) {
  //     res.render('camps');
  //     throw err01;
  //   }
  //   comment.create(req.body.comments, (err, data02) => {
  //     if (err) {
  //       throw err;
  //     }
  //     data02.author.id = req.user._id;
  //     data02.author.username = req.user.username;
  //     data02.save();
  //     data01.comment.push(data02);
  //     data01.save();
  //     res.redirect(`/camps/${data01._id}`);
  //   });
  // });
});

module.exports = router;
