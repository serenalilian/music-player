const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tracks: [
    {
      trackId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      artist: {
        type: String,
        required: true,
      },
      album: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
