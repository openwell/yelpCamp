import express from 'express';
import camp from '../model/camp';
import middlewareObj from '../middleware';
import campController from '../controllers/camp';

const router = express.Router();

const {
  getAllCamps,
  getOneCamp,
  createCamp,
  editCamp,
  deleteCamp,
} = campController;

router.get('/', getAllCamps);
router.get('/form', middlewareObj.isLoggedIn, (req, res) => {
  res.render('camps/form');
});
router.get('/:id', getOneCamp);
router.post('/', middlewareObj.isLoggedIn, createCamp);
router.put('/:id', middlewareObj.checkCampOwner, editCamp);
router.delete('/:id', middlewareObj.checkCampOwner, deleteCamp);
router.get('/:id/edit', middlewareObj.checkCampOwner, (req, res) => {
  camp.findById(req.params.id, (err, responds) => {
    res.render('camps/edit', { camp: responds });
  });
});

export default router;
