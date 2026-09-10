import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export default function LoginPage({ setCurrentUser }) {
    const [authMode, setAuthMode] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
        const payload = authMode === 'login' ? { username, password } : { username, email, password };

        try {
            const res = await axios.post(`${API_BASE}${endpoint}`, payload);
            if (res.data.status === 'success') {
                const userData = res.data.data;
                setCurrentUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                alert(`${authMode === 'login' ? 'Logged in' : 'Registered'} successfully!`);
                navigate('/');
            } else {
                alert(res.data.message || 'Operation failed');
            }
        } catch (err) {
            // Print backend error message directly
            const errorMsg = err.response?.data?.message || err.message || 'Authentication failed';
            alert(`Error: ${errorMsg}`);
        }
    };

    return (
        <section className="auth-container">
            <div className="auth-card">
                <h2>{authMode === 'login' ? 'User Login' : 'Register Account'}</h2>
                <form onSubmit={handleAuthSubmit} className="form-layout">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    {authMode === 'register' && (
                        <>
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </>
                    )}

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="btn-primary">
                        {authMode === 'login' ? 'Login' : 'Sign Up'}
                    </button>

                    <p className="auth-toggle" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                        {authMode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
                    </p>
                </form>
            </div>
        </section>
    );
}