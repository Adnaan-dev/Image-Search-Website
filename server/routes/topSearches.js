const express = require('express');
const Search = require('../models/Search');
const router = express.Router();

// GET /api/top-searches
router.get('/', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

