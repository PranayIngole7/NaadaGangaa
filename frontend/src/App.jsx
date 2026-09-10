import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import SongsPage from './pages/SongsPage';
import AlbumsPage from './pages/AlbumsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

const API_BASE = 'http://localhost:8080/api';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resSongs, resAlbums] = await Promise.all([
        axios.get(`${API_BASE}/songs`),
        axios.get(`${API_BASE}/albums`)
      ]);
      setSongs(resSongs.data?.data || []);
      setAlbums(resAlbums.data?.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="layout-root">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        <main className="content-viewport">
          <Routes>
            <Route path="/" element={<SongsPage songs={songs} currentSong={currentSong} isPlaying={isPlaying} onPlayPause={handlePlayPause} />} />
            <Route path="/albums" element={<AlbumsPage albums={albums} />} />
            <Route path="/admin" element={<AdminPage albums={albums} onRefresh={fetchData} />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {currentSong && (
          <footer className="player-bar">
            <div>
              <strong>Now Playing:</strong> {currentSong.title} {currentSong.album?.title ? `(${currentSong.album.title})` : ''}
            </div>
            <audio
              ref={audioRef}
              src={`http://localhost:8080${currentSong.file}`}
              autoPlay
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </footer>
        )}
      </div>
    </Router>
  );
}