const express = require('express');
const Search = require('../models/Search');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/history
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await Search.find({ userId })
      .sort({ timestamp: -1 })
      .limit(50)
      .select('term timestamp')
      .lean();

    res.json(history);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


