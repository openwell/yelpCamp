import mongoose from 'mongoose';

const campgroundSchema = new mongoose.Schema({
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
const camp = mongoose.model('camps', campgroundSchema);
export default camp;
