import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // username: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);
const user = mongoose.model('user', userSchema);

export default user;
