import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ currentUser, onLogout }) {
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="brand" onClick={() => navigate('/')}>
                <h2>🎵 NaadaGangaa</h2>
            </div>

            <nav className="nav-menu">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Explore Songs
                </NavLink>
                <NavLink to="/albums" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Albums
                </NavLink>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    Admin Panel
                </NavLink>
            </nav>

            <div className="auth-status">
                {currentUser ? (
                    <div className="user-profile">
                        <span>👤 {currentUser.username}</span>
                        <button onClick={onLogout} className="btn-logout">Logout</button>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className="btn-login">Login / Register</button>
                )}
            </div>
        </header>
    );
}