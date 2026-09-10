import { useEffect, useState } from 'react';
import { getAlbums, getTracks } from './api';

function App() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [albumsRes, tracksRes] = await Promise.all([
          getAlbums(),
          getTracks()
        ]);
        setAlbums(albumsRes.data);
        setTracks(tracksRes.data);
        setError(null);
      } catch (err) {
        console.error('Error connecting to backend:', err);
        setError('Failed to load data from backend. Ensure Spring Boot is running on port 8080.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎵 NaadaGangaa Music Dashboard</h1>
      <hr />

      {loading && <p>Connecting to backend API...</p>}

      {error && (
        <div style={{ color: 'red', padding: '1rem', border: '1px solid red', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div>
          <h2>Albums ({albums.length})</h2>
          {albums.length === 0 ? (
            <p>No albums found in database.</p>
          ) : (
            <ul>
              {albums.map((album) => (
                <li key={album.id}>
                  <strong>{album.title}</strong> by {album.artist} ({album.releaseYear})
                </li>
              ))}
            </ul>
          )}

          <h2>Tracks ({tracks.length})</h2>
          {tracks.length === 0 ? (
            <p>No tracks found in database.</p>
          ) : (
            <ul>
              {tracks.map((track) => (
                <li key={track.id}>
                  <strong>{track.name}</strong> - {track.genre} ({track.durationSeconds}s)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;