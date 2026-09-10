import { useState } from 'react';

export default function AlbumSection({ albums, onCreateAlbum, onDeleteAlbum }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        onCreateAlbum({
            title,
            artist,
            releaseYear: releaseYear ? parseInt(releaseYear, 10) : null,
        });

        setTitle('');
        setArtist('');
        setReleaseYear('');
    };

    return (
        <div className="card">
            <h2>Albums Overview</h2>

            {/* Album Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label>Album Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Abbey Road"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Artist</label>
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="e.g. The Beatles"
                    />
                </div>

                <div className="form-group">
                    <label>Release Year</label>
                    <input
                        type="number"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        placeholder="e.g. 1969"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    + Add Album
                </button>
            </form>

            {/* Album List */}
            <h3>All Albums ({albums.length})</h3>
            {albums.length === 0 ? (
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>No albums created yet.</p>
            ) : (
                <ul className="list">
                    {albums.map((album) => (
                        <li key={album.id} className="list-item">
                            <div className="item-details">
                                <strong>{album.title}</strong>
                                <p>
                                    {album.artist || 'Unknown Artist'} {album.releaseYear ? `(${album.releaseYear})` : ''}
                                </p>
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDeleteAlbum(album.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}