import React, { useState } from 'react';
import axios from 'axios';

const SearchMusic = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMusic = async () => {
    try {
      const response = await axios.get('/api/music/search', { params: { q: query } });
      setResults(response.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music..."
      />
      <button onClick={searchMusic}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title} by {result.artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMusic;
