import { useEffect, useState } from 'react';
import './App.css';
import {
  getAlbums,
  createAlbum,
  deleteAlbum,
  getTracks,
  createTrack,
  deleteTrack,
} from './api';
import AlbumSection from './components/AlbumSection';
import TrackSection from './components/TrackSection';

function App() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [albumsRes, tracksRes] = await Promise.all([getAlbums(), getTracks()]);
      setAlbums(albumsRes.data);
      setTracks(tracksRes.data);
    } catch (err) {
      console.error('Failed to sync data with backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCreateAlbum = async (albumData) => {
    await createAlbum(albumData);
    await refreshData();
  };

  const handleDeleteAlbum = async (id) => {
    await deleteAlbum(id);
    await refreshData();
  };

  const handleCreateTrack = async (trackData) => {
    await createTrack(trackData);
    await refreshData();
  };

  const handleDeleteTrack = async (id) => {
    await deleteTrack(id);
    await refreshData();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🎶 NaadaGangaa Music Portal</h1>
      </header>

      {loading ? (
        <p>Loading catalog...</p>
      ) : (
        <main className="grid">
          <AlbumSection
            albums={albums}
            onCreateAlbum={handleCreateAlbum}
            onDeleteAlbum={handleDeleteAlbum}
          />
          <TrackSection
            tracks={tracks}
            albums={albums}
            onCreateTrack={handleCreateTrack}
            onDeleteTrack={handleDeleteTrack}
          />
        </main>
      )}
    </div>
  );
}

export default App;