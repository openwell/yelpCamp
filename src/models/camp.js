let mongoose = require('mongoose');

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    username: String,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});
let camp = mongoose.model('camps', campgroundSchema);

module.exports = camp;
