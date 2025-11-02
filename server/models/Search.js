const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  term: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
searchSchema.index({ userId: 1, timestamp: -1 });
searchSchema.index({ term: 1 });

module.exports = mongoose.model('Search', searchSchema);

