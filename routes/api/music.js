const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route    GET api/music/search
// @desc     Search for songs
// @access   Public
router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(`${process.env.DEEZER_API_URL}/search`, {
      params: { q },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/music/track/:id
// @desc     Get track details
// @access   Public
router.get('/track/:id', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.DEEZER_API_URL}/track/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
