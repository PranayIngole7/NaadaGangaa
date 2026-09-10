import { useState } from 'react';

export default function TrackSection({ tracks, albums, onCreateTrack, onDeleteTrack }) {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [durationSeconds, setDurationSeconds] = useState('');
    const [albumId, setAlbumId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;

        onCreateTrack({
            name,
            genre,
            durationSeconds: durationSeconds ? parseInt(durationSeconds, 10) : null,
            albumId: albumId ? parseInt(albumId, 10) : null,
        });

        setName('');
        setGenre('');
        setDurationSeconds('');
        setAlbumId('');
    };

    return (
        <div className="card">
            <h2>Tracks Directory</h2>

            {/* Track Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label>Track Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Come Together"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="e.g. Rock"
                    />
                </div>

                <div className="form-group">
                    <label>Duration (Seconds)</label>
                    <input
                        type="number"
                        value={durationSeconds}
                        onChange={(e) => setDurationSeconds(e.target.value)}
                        placeholder="e.g. 259"
                    />
                </div>

                <div className="form-group">
                    <label>Assign to Album</label>
                    <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
                        <option value="">-- No Album (Standalone Track) --</option>
                        {albums.map((album) => (
                            <option key={album.id} value={album.id}>
                                {album.title} ({album.artist || 'Unknown'})
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    + Add Track
                </button>
            </form>

            {/* Track List */}
            <h3>All Tracks ({tracks.length})</h3>
            {tracks.length === 0 ? (
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>No tracks uploaded yet.</p>
            ) : (
                <ul className="list">
                    {tracks.map((track) => {
                        const assignedAlbum = albums.find((a) => a.id === track.albumId);
                        return (
                            <li key={track.id} className="list-item">
                                <div className="item-details">
                                    <div>
                                        <strong>{track.name}</strong>
                                        {track.genre && <span className="badge">{track.genre}</span>}
                                    </div>
                                    <p>
                                        {track.durationSeconds ? `${track.durationSeconds}s` : 'Unknown duration'} | Album:{' '}
                                        {assignedAlbum ? assignedAlbum.title : 'None'}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDeleteTrack(track.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}