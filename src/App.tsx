import { useState } from 'react';
import './App.css';
import { TopSongs } from './types';


function App() {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const [topFiveSongs, setTopFiveSongs]: TopSongs = useState({});
  const [artists, setArtists] = useState(null);
  const token = 'BQAgqLY783mUU6DCOIY2O_FyCGyEU5XJiiQHaqJGcoO_MAl0kWwoi-UBL8ASzIsHIsJd1WqIe5JUkE9TBp0RqAjlL4gHFmTPAc1u3_1eeIT7rEYQ6AGZLo9NyIBkZe6jzpGTQBSApMQ_cQIIB11vqrqfjuYXvzEcEA1CAXBzps5P7nQUeWBse9UUqx6b__TYxLiRDNarWjnqvF5qIlBDh1zQPKBNeAHhCJNpmzipeecmQTEEXAj4vnQWHXXiAiaCgFoQ'
  async function fetchWebApi(endpoint, method) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,      
    });
    return await res.json();
  }

  async function getTopTracks() {
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      const songs: TopSongs = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=3', 'GET');
      
      setTopFiveSongs(songs);
      console.log(songs.items.map((item) => item.album.name));
      return topFiveSongs;
  }

  async function searchForArtist() {
    const params = new URLSearchParams({
      type: 'artist', 
      q: "Madonna",
    })
    const artists = await fetchWebApi('v1/search?${params}', 'GET');
    console.log(artists); 
  }

  return (
    <div>
      <button class="search" onClick={getTopTracks}>Pesquisar Top 3</button>
        <div class="list">
          {topFiveSongs.items?.map((item) => (
            <p>{item.album.name}</p>
          ))}
        </div>
    </div>
  );
}

export default App
