const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  username: String,
  email: String,
  displayName: String,
  provider: {
    type: String,
    enum: ['google', 'facebook', 'github']
  },
  avatar: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

