const express = require('express');
const axios = require('axios');
const Search = require('../models/Search');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/search
router.post('/', auth, async (req, res) => {
  try {
    const { term } = req.body;
    const userId = req.user._id;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Store search in database
    await Search.create({
      userId,
      term: term.trim()
    });

    // Fetch images from Unsplash API
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!unsplashAccessKey || unsplashAccessKey === 'your-unsplash-access-key') {
      console.error('Unsplash API key check failed. Key exists:', !!unsplashAccessKey, 'Key value:', unsplashAccessKey ? `${unsplashAccessKey.substring(0, 4)}...` : 'undefined');
      return res.status(500).json({ error: 'Unsplash API key not configured. Please add your Unsplash Access Key to the .env file and restart the server.' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 20,
        client_id: unsplashAccessKey
      }
    });

    const images = response.data.results.map(result => ({
      id: result.id,
      url: result.urls.regular,
      thumbUrl: result.urls.thumb,
      description: result.description || result.alt_description || 'No description',
      author: result.user.name,
      authorUrl: result.user.links.html
    }));

    res.json({
      term,
      count: images.length,
      images
    });
  } catch (error) {
    console.error('Search error:', error);
    if (error.response) {
      // Unsplash API error
      const status = error.response.status;
      const errorData = error.response.data;
      
      // Handle different Unsplash error formats
      let message = `Unsplash API error (${status})`;
      if (errorData?.errors) {
        message = Array.isArray(errorData.errors) ? errorData.errors[0] : errorData.errors;
      } else if (errorData?.error) {
        message = errorData.error;
      } else if (errorData?.message) {
        message = errorData.message;
      }
      
      // Provide helpful message for common errors
      if (status === 401 || status === 403 || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('oauth') || message.toLowerCase().includes('access token')) {
        message = 'Invalid Unsplash API key. Please check your UNSPLASH_ACCESS_KEY in the .env file and restart the server.';
      }
      
      res.status(status).json({ error: message });
    } else if (error.request) {
      // Network error
      res.status(500).json({ error: 'Unable to reach Unsplash API. Please check your internet connection.' });
    } else {
      // Other errors
      res.status(500).json({ error: error.message || 'Server error' });
    }
  }
});

module.exports = router;

