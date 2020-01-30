import camp from '../model/camp';

const campController = {
  getAllCamps: async (req, res) => {
    try {
      const data = await camp.find();
      res.render('camps/yelp_camps', { camp: data });
    } catch (err) {
      res.redirect('/');
    }
  },
  getOneCamp: async (req, res) => {
    try {
      const data = await camp
        .findById(req.params.id)
        .populate('comment')
        .exec();
      res.render('camps/details', { camp: data });
    } catch (err) {
      res.redirect('/camps');
    }
  },
  createCamp: async (req, res) => {
    const { name, image, description } = req.body;
    const author = {
      id: req.user._id,
      username: req.user.username,
    };
    const newCamp = {
      name,
      image,
      description,
      author,
    };
    try {
      await camp.create(newCamp);
      res.redirect('/camps');
    } catch (error) {
      res.redirect('/camps');
    }
  },
  editCamp: async (req, res) => {
    try {
      await camp.findByIdAndUpdate(req.params.id, req.body.campE);
      res.redirect(`/camps/${req.params.id}`);
    } catch (error) {
      res.redirect('/camps');
    }
  },
  deleteCamp: async (req, res) => {
    try {
      await camp.findByIdAndRemove(req.params.id);
      res.redirect(`/camps/${req.params.id}`);
    } catch (error) {
      res.redirect('/camps');
    }
  },
};

export default campController;
