import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store auth flag and token in localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', data.username);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="h-24 md:h-32"></div>

            <div className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-serif text-center text-brand-dark mb-8">Admin Login</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold transition-colors"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold transition-colors"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-gold text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-all uppercase tracking-wider"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
