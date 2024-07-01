import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = ({ onPlaylistCreated }) => {
  const [name, setName] = useState('');
  const [tracks, setTracks] = useState([]);

  const createPlaylist = async () => {
    try {
      const response = await axios.post('/api/playlists', { name, tracks });
      onPlaylistCreated(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Playlist name"
      />
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
};

export default CreatePlaylist;
