import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    // Redirect back to where user came from, or dashboard
    const from = location.state?.from?.pathname || '/user-dashboard';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const toastId = toast.loading(isLogin ? 'Logging in...' : 'Registering...');
        
        const endpoint = isLogin ? '/auth/customer/login' : '/auth/customer/register';
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                login({ ...data.customer, role: 'customer' }, data.token);
                toast.success(isLogin ? `Welcome back, ${data.customer.name}!` : 'Registration successful!', { id: toastId });
                navigate(from, { replace: true });
            } else {
                setError(data.message || 'Authentication failed');
                toast.error(data.message || 'Authentication failed', { id: toastId });
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError('Something went wrong. Please try again.');
            toast.error('Connection error', { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="h-24 md:h-32"></div>

            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex justify-center space-x-4 mb-8">
                        <button 
                            className={`text-2xl font-serif ${isLogin ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'} pb-2`}
                            onClick={() => setIsLogin(true)}
                        >
                            Sign In
                        </button>
                        <button 
                            className={`text-2xl font-serif ${!isLogin ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'} pb-2`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                    placeholder="+91 9876543210"
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                placeholder="********"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-gold text-white font-bold py-3 px-4 rounded mt-4 hover:bg-opacity-90 transition-all uppercase tracking-wider"
                        >
                            {isLogin ? 'Login to Account' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
