const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  section: String,
  age: Number,
  gender: String,
  grade: Number,
  number: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
