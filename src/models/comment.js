import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    username: String,
  },
});
const comment = mongoose.model('comment', commentSchema);

export default comment;
