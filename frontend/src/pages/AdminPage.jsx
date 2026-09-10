import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export default function AdminPage({ albums, onRefresh }) {
    // Song state
    const [songTitle, setSongTitle] = useState('');
    const [songFile, setSongFile] = useState(null);
    const [songDuration, setSongDuration] = useState(180);
    const [selectedAlbumId, setSelectedAlbumId] = useState('');

    // Album state
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumThumbnail, setAlbumThumbnail] = useState(null);

    const handleSongUpload = async (e) => {
        e.preventDefault();
        if (!songFile) return alert('Select an MP3 file');

        const formData = new FormData();
        formData.append('title', songTitle);
        formData.append('duration', songDuration);
        formData.append('file', songFile);
        if (selectedAlbumId) formData.append('albumId', selectedAlbumId);

        try {
            const res = await axios.post(`${API_BASE}/songs/upload`, formData);
            if (res.data.status === 'success') {
                alert('Song uploaded successfully!');
                setSongTitle('');
                setSongFile(null);
                setSelectedAlbumId('');
                onRefresh();
            }
        } catch (err) {
            alert('Failed to upload song');
        }
    };

    const handleAlbumUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', albumTitle);
        if (albumThumbnail) formData.append('thumbnail', albumThumbnail);

        try {
            const res = await axios.post(`${API_BASE}/albums/upload`, formData);
            if (res.data.status === 'success') {
                alert('Album created successfully!');
                setAlbumTitle('');
                setAlbumThumbnail(null);
                onRefresh();
            }
        } catch (err) {
            alert('Failed to upload album');
        }
    };

    return (
        <section className="admin-container">
            <div className="admin-card">
                <h2>Upload New Song</h2>
                <form onSubmit={handleSongUpload} className="form-layout">
                    <label>Song Title</label>
                    <input type="text" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />

                    <label>Assign to Album</label>
                    <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)}>
                        <option value="">-- Single / No Album --</option>
                        {albums.map((album) => (
                            <option key={album.id} value={album.id}>{album.title}</option>
                        ))}
                    </select>

                    <label>Duration (Seconds)</label>
                    <input type="number" value={songDuration} onChange={(e) => setSongDuration(e.target.value)} required />

                    <label>Audio File (.mp3)</label>
                    <input type="file" accept="audio/*" onChange={(e) => setSongFile(e.target.files[0])} required />

                    <button type="submit" className="btn-primary">Upload Song</button>
                </form>
            </div>

            <div className="admin-card">
                <h2>Create New Album</h2>
                <form onSubmit={handleAlbumUpload} className="form-layout">
                    <label>Album Title</label>
                    <input type="text" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required />

                    <label>Thumbnail Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setAlbumThumbnail(e.target.files[0])} />

                    <button type="submit" className="btn-primary">Create Album</button>
                </form>
            </div>
        </section>
    );
}