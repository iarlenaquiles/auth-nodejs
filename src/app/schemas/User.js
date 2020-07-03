import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  reset_password_token: {
    type: String,
  },
  reset_password_expires: {
    type: Date,
  },
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

export default mongoose.model('User', UserSchema);
