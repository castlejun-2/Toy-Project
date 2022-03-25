import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    maxlength: 10,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    default: new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0],
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const Users = mongoose.model('User', userSchema);
export default Users;
