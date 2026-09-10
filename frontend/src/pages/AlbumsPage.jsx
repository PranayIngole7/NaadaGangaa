import React from 'react';

export default function AlbumsPage({ albums }) {
    return (
        <section className="page-section">
            <h1>Albums Collection</h1>
            {albums.length === 0 ? (
                <p className="empty-state">No albums available yet.</p>
            ) : (
                <div className="album-grid">
                    {albums.map((album) => (
                        <div key={album.id} className="album-card">
                            {album.thumbnail ? (
                                <img src={`http://localhost:8080${album.thumbnail}`} alt={album.title} className="album-thumb" />
                            ) : (
                                <div className="album-thumb-placeholder">🎵</div>
                            )}
                            <h3>{album.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}