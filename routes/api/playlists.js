const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Playlist = require('../../models/Playlist');

// @route    POST api/playlists
// @desc     Create a playlist
// @access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, tracks } = req.body;

    try {
      const newPlaylist = new Playlist({
        user: req.user.id,
        name,
        tracks,
      });

      const playlist = await newPlaylist.save();
      res.json(playlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/playlists
// @desc     Get all playlists for user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json(playlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/playlists/:id
// @desc     Get playlist by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/playlists/:id
// @desc     Delete a playlist
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await playlist.remove();
    res.json({ msg: 'Playlist removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
