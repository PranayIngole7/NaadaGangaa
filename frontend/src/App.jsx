import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('songs');
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', file: '', duration: 180, albumId: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', mobile: '', address: '', birth: '' });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [songsRes, artistsRes, albumsRes, usersRes] = await Promise.all([
        axios.get(`${API_BASE}/songs`),
        axios.get(`${API_BASE}/artists`),
        axios.get(`${API_BASE}/albums`),
        axios.get(`${API_BASE}/users`)
      ]);
      setSongs(songsRes.data);
      setArtists(artistsRes.data);
      setAlbums(albumsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Error loading NaadaGangaa data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSong = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: newSong.title,
        file: newSong.file,
        duration: parseInt(newSong.duration),
        album: newSong.albumId ? { id: parseInt(newSong.albumId) } : null
      };
      await axios.post(`${API_BASE}/songs`, payload);
      setShowModal(false);
      setNewSong({ title: '', file: '', duration: 180, albumId: '' });
      fetchAllData();
    } catch (err) {
      alert('Error creating song');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/users`, { ...newUser, enabled: true });
      setShowModal(false);
      setNewUser({ name: '', email: '', mobile: '', address: '', birth: '' });
      fetchAllData();
    } catch (err) {
      alert('Error creating user');
    }
  };

  const formatDuration = (secs) => {
    if (!secs) return '0:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredSongs = songs.filter(s => s.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAlbums = albums.filter(a => a.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredArtists = artists.filter(a => `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{ width: '240px', backgroundColor: '#000', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRight: '1px solid #282828' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.8rem' }}>🎵</span>
          <h1 style={{ fontSize: '1.4rem', color: '#1DB954', margin: 0, fontWeight: 'bold' }}>NaadaGangaa</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'songs', label: '🎶 Songs' },
            { id: 'albums', label: '💿 Albums' },
            { id: 'artists', label: '🎤 Artists' },
            { id: 'users', label: '👤 Users & Accounts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#282828' : 'transparent',
                color: activeTab === tab.id ? '#1DB954' : '#b3b3b3',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '32px 40px', paddingBottom: '120px', overflowY: 'auto' }}>

        {/* Top Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Search songs, albums, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 20px',
              width: '320px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#282828',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#1DB954',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            + Add {activeTab === 'users' ? 'User' : 'Song'}
          </button>
        </div>

        {loading ? (
          <div style={{ color: '#b3b3b3', fontSize: '1.2rem' }}>Loading data...</div>
        ) : (
          <>
            {/* SONGS VIEW */}
            {activeTab === 'songs' && (
              <section>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Songs Catalog</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredSongs.map((song) => (
                    <div
                      key={song.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: currentSong?.id === song.id ? '#282828' : '#181818',
                        padding: '12px 20px',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button
                          onClick={() => setCurrentSong(song)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#1DB954',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer'
                          }}
                        >
                          ▶
                        </button>
                        <div>
                          <div style={{ fontWeight: '600' }}>{song.title}</div>
                          <div style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
                            {song.artists?.map((a) => `${a.firstName} ${a.lastName}`).join(', ') || 'Various Artists'}
                            {song.album ? ` • ${song.album.title}` : ''}
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>{formatDuration(song.duration)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ALBUMS VIEW */}
            {activeTab === 'albums' && (
              <section>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Albums</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                  {filteredAlbums.map((album) => (
                    <div key={album.id} style={{ backgroundColor: '#181818', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ width: '100%', height: '160px', backgroundColor: '#282828', borderRadius: '6px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                        {album.thumbnail ? <img src={album.thumbnail} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} /> : '💿'}
                      </div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>{album.title}</h3>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ARTISTS VIEW */}
            {activeTab === 'artists' && (
              <section>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Artists</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
                  {filteredArtists.map((artist) => (
                    <div key={artist.id} style={{ backgroundColor: '#181818', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#282828', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', overflow: 'hidden' }}>
                        {artist.thumbnail ? <img src={artist.thumbnail} alt={artist.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🎤'}
                      </div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>{`${artist.firstName || ''} ${artist.lastName || ''}`}</h3>
                      <span style={{ color: '#1DB954', fontSize: '0.8rem' }}>{artist.type || 'Artist'}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* USERS & ACCOUNTS VIEW */}
            {activeTab === 'users' && (
              <section>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Registered Users & Subscriptions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {users.map((user) => (
                    <div key={user.id} style={{ backgroundColor: '#181818', padding: '16px 24px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem' }}>{user.name}</strong>
                        <div style={{ color: '#b3b3b3', fontSize: '0.85rem', marginTop: '4px' }}>
                          📧 {user.email} | 📱 {user.mobile || 'N/A'} | 📍 {user.address || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: user.account?.type === 'PREMIUM' ? '#1DB954' : '#333',
                          color: '#fff'
                        }}>
                          {user.account?.type || 'STANDARD'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Creation Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#181818', padding: '32px', borderRadius: '12px', width: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Add New {activeTab === 'users' ? 'User' : 'Song'}</h3>

            {activeTab === 'users' ? (
              <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Full Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required style={inputStyle} />
                <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required style={inputStyle} />
                <input type="text" placeholder="Mobile" value={newUser.mobile} onChange={e => setNewUser({ ...newUser, mobile: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Address" value={newUser.address} onChange={e => setNewUser({ ...newUser, address: e.target.value })} style={inputStyle} />
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={btnPrimary}>Save</button>
                  <button type="button" onClick={() => setShowModal(false)} style={btnSecondary}>Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateSong} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Song Title" value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} required style={inputStyle} />
                <input type="text" placeholder="MP3 File URL" value={newSong.file} onChange={e => setNewSong({ ...newSong, file: e.target.value })} required style={inputStyle} />
                <input type="number" placeholder="Duration (seconds)" value={newSong.duration} onChange={e => setNewSong({ ...newSong, duration: e.target.value })} required style={inputStyle} />
                <select value={newSong.albumId} onChange={e => setNewSong({ ...newSong, albumId: e.target.value })} style={inputStyle}>
                  <option value="">-- Select Album (Optional) --</option>
                  {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                </select>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={btnPrimary}>Save</button>
                  <button type="button" onClick={() => setShowModal(false)} style={btnSecondary}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Persistent Audio Player Bar */}
      {currentSong && (
        <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#181818', borderTop: '1px solid #282828', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000 }}>
          <div style={{ minWidth: '220px' }}>
            <div style={{ fontWeight: '600' }}>{currentSong.title}</div>
            <div style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
              {currentSong.artists?.map((a) => `${a.firstName} ${a.lastName}`).join(', ') || 'Unknown Artist'}
            </div>
          </div>

          <audio controls autoPlay src={currentSong.file} style={{ width: '50%', maxWidth: '600px' }}>
            Your browser does not support audio playback.
          </audio>

          <div style={{ color: '#b3b3b3', fontSize: '0.85rem', minWidth: '100px', textAlign: 'right' }}>
            {currentSong.album?.title || 'Single'}
          </div>
        </footer>
      )}
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#282828', color: '#fff' };
const btnPrimary = { backgroundColor: '#1DB954', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', flex: 1 };
const btnSecondary = { backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', flex: 1 };