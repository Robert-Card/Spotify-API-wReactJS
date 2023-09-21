import { useState } from 'react';
import './App.css';
import { TopSongs } from './types';


function App() {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const [topFiveSongs, setTopFiveSongs]: TopSongs = useState({});
  const [artist, setArtist] = useState({});
  const token = 'BQC_MKrOED8iKLvY9hKkFKd2NSPcR6ZqE8oZK045Gse8uD3SK3pdniEVPzb3OwtGIMtOsh-i23sl-TnSaNCSYAbd1oKZNdkVTtISDiVTewDOzdikfqtl8Xd3k2z-GuCahqD2lIL4m0YSwDi3wV5mCM27hNsU-m09WUuPBD818Im-iVEBuuVUICxYLxUjnlvOXan1GFpxiZ-e_60nHXL4Ks1NF9ar7hEsoFfYJy-uCYPRhs_CuwHsWsopfNrwyWW7j0pH';
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
