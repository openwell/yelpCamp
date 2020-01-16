import express from 'express';
import camp from '../models/camp';
import middlewareObj from '../middleware';

const router = express.Router();

router.get('/', (req, res) => {
  // get data from db
  camp.find({}, (err, data) => {
    if (err) {
      throw err;
    }
    return res.render('camps/yelp_camps', { camp: data });
  });
});

router.post('/', middlewareObj.isLoggedIn, (req, res) => {
  const { name, image, description: des } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const add = {
    name,
    image,
    des,
    author,
  };
  camp.create(add, (err, data) => {
    if (err) {
      throw err;
    }
    res.redirect('/camps');
  });
});

router.get('/form', middlewareObj.isLoggedIn, (req, res) => {
  res.render('camps/form');
});

// Edit camp Form
router.get('/:id/edit', middlewareObj.checkCampOwner, (req, res) => {
  camp.findById(req.params.id, function(err, responds) {
    res.render('camps/edit', { camp: responds });
  });
});

// edit PUT
router.put('/:id', middlewareObj.checkCampOwner, (req, res) => {
  camp.findByIdAndUpdate(req.params.id, req.body.campE, function(
    err,
    responds
  ) {
    if (err) {
      res.redirect('/camps');
      throw err;
    }
    res.redirect(`/camps/${req.params.id}`);
  });
});

// delete
router.delete('/:id', middlewareObj.checkCampOwner, (req, res) => {
  camp.findByIdAndRemove(req.params.id, function(err, responds) {
    if (err) {
      res.redirect(`/camps/${req.params.id}`);
      throw err;
    }
    res.redirect('/camps');
  });
});

router.get('/:id', (req, res) => {
  camp
    .findById(req.params.id)
    .populate('comment')
    .exec(function(err, data) {
      if (err) {
        res.redirect('/camps');
        throw err;
      }
      res.render('camps/details', { camp: data });
    });
});

export default router;
