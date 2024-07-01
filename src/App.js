import React, { useState } from 'react';
import SearchMusic from './components/SearchMusic';
import CreatePlaylist from './components/CreatePlaylist';
import ListPlaylists from './components/ListPlaylists';

const App = () => {
  const [playlists, setPlaylists] = useState([]);

  const handlePlaylistCreated = (playlist) => {
    setPlaylists([...playlists, playlist]);
  };

  return (
    <div className="App">
      <h1>Music Player</h1>
      <SearchMusic />
      <CreatePlaylist onPlaylistCreated={handlePlaylistCreated} />
      <ListPlaylists />
    </div>
  );
};

export default App;

