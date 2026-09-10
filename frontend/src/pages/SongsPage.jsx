import React from 'react';
import { Link } from 'react-router-dom';

export default function SongsPage({ songs, currentSong, isPlaying, onPlayPause }) {
    return (
        <section className="page-section">
            <h1>Music Library</h1>
            {songs.length === 0 ? (
                <p className="empty-state">
                    No songs available. Go to the <Link to="/admin">Admin Panel</Link> to upload music.
                </p>
            ) : (
                <div className="song-grid">
                    {songs.map((song) => (
                        <div key={song.id} className="song-card">
                            <div className="song-info">
                                <h3>{song.title}</h3>
                                <p>
                                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')} mins
                                    {song.album?.title && <span className="album-tag">• Album: {song.album.title}</span>}
                                </p>
                            </div>
                            <div className="song-actions">
                                <button className="btn-play" onClick={() => onPlayPause(song)}>
                                    {currentSong?.id === song.id && isPlaying ? '⏸ Pause' : '▶ Play'}
                                </button>
                                {song.file && (
                                    <a href={`http://localhost:8080${song.file}`} download className="btn-download">
                                        ⬇ Download
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}