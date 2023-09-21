import { useState } from 'react';
import './App.css';
import { TopSongs } from './types';


function App() {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const [topFiveSongs, setTopFiveSongs]: TopSongs = useState({});
  const [artists, setArtists] = useState(null);
  const token = 'BQDQ9oToEIumv5YoVYHj_hBEDISC8U57MMN1WI99N1-po8gat6xFdkLoYyEQoFZLFkS3BDYFkhwGiiGh5MpwqJ3aqjzGdVthqLfPc9XeWusyORcvkmmqUNlXfCiOAWvbwhD6ykHlOOSIW4LomUHbqpabRMnz-uGgRi_qrr749OnBJdEayxGmTZvnH0yt5K-4ToQP_kaxSHprztzxSE_J0W1dNjC1PFF5A0k6GaxovwGnLHdjBPUOnF3pi9iReVu81o2T';
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
    const artists = await fetchWebApi(`v1/search?${params}`, 'GET');
    console.log(artists); 
  }

  return (
    <div class='pageStyle'>
      <div>
        <button onClick={getTopTracks}>Pesquisar Top 3</button>
            {topFiveSongs.items?.map((item) => (
              <p>{item.album.name}</p>
            ))}     
      </div>

              
      <form action=''>
              <label htmlFor='artist'>Nome do Artista</label>
              <input type='text' name='' id='artist' />
        <button onClick={searchForArtist}>Pesquisar Artistas</button>   
      </form>
      
    </div>
    
  );
}

export default App
