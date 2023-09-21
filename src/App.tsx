import { useState } from 'react';
import './App.css';
import { TopSongs } from './types';


function App() {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const [topFiveSongs, setTopFiveSongs]: TopSongs = useState({});
  const [artist, setArtist] = useState({});
  const token = 'BQCIPsNSOJ6YTr051h9nmwDPIXjAqhK3QqGCjcjFxcLZU3_YfhmF06tf1WJxbu5yUSn8ef9GPhOgXC3VAFcQ1Ye5Un_UById1x-_fMJ3kO3Sl2d1iOeHQO0bx1Vk-z36erX9LGVqCl1SP3yCBK9aMgoPLruP4N0gSGdOAi7NGKYEawB4Pni7zpU8i29Q8_tmkQh2uvf7L5rh3TPxKTzPpy8Whr4lJbjXd_a5I9CdDUGxADcVaoDTu5gtHKFnIl3_E4i5';
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

  async function searchForArtist(event) {
    event.preventDefault();
    const artist = (event.target[0].value);
    const params = new URLSearchParams({
      type: 'artist', 
      q: artist,
    })
    const artists = await fetchWebApi(`v1/search?${params}`, 'GET');
    setArtist(artists.artists.items[0]);
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

              
      <form onSubmit={searchForArtist}>
              <label htmlFor='artist'>Nome do Artista</label>
              <input type='text' name='' id='artist' />
        <button>Pesquisar Artistas</button>  

        {artist.external_urls &&( 
        <a target='blank' href={artist.external_urls.spotify}>Acessar página de {artist.name}</a>
        )}
        </form>

    </div>
    
  );
}

export default App
