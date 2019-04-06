import express from 'express';
import camp from '../models/camp';
import middlewareObj from '../middleware';

const router = express.Router();

router.get('/', (req, res) => {
  // get data from db
  camp.find({}, (err, from_db) => {
    if (err) {
      console.log(err);
    } else {
      res.render('camps/yelp_camps', { camp: from_db });
    }
  });
});

router.post('/', middlewareObj.isLoggedIn, (req, res) => {
  const { name } = req.body;
  const { image } = req.body;
  const des = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const add = {
    name,
    image,
    description: des,
    author,
  };
  camp.create(add, (err, from_db) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/camps');
    }
  });
});

router.get('/form', middlewareObj.isLoggedIn, (req, res) => {
  res.render('camps/form');
});

// Edit camp Form
router.get('/:id/edit', middlewareObj.checkCampOwner, (req, res) => {
  camp.findById(req.params.id, (err, responds) => {
    res.render('camps/edit', { camp: responds });
  });
});

// edit PUT
router.put('/:id', middlewareObj.checkCampOwner, (req, res) => {
  camp.findByIdAndUpdate(req.params.id, req.body.campE, (err, responds) => {
    if (err) {
      console.log(err);
      res.redirect('/camps');
    } else {
      res.redirect(`/camps/${req.params.id}`);
    }
  });
});

// delete
router.delete('/:id', middlewareObj.checkCampOwner, (req, res) => {
  camp.findByIdAndRemove(req.params.id, (err, responds) => {
    if (err) {
      console.log(err);
      res.redirect(`/camps/${req.params.id}`);
    } else {
      res.redirect('/camps');
    }
  });
});

router.get('/:id', (req, res) => {
  camp
    .findById(req.params.id)
    .populate('comment')
    .exec((err, responds) => {
      if (err) {
        console.log(err);
        res.redirect('/camps');
      } else {
        res.render('camps/details', { camp: responds });
      }
    });
});

export default router;
