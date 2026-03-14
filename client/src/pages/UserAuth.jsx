import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
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
        const isReset = isForgotPassword;
        const toastId = toast.loading(isReset ? 'Resetting password...' : (isLogin ? 'Logging in...' : 'Registering...'));
        
        let endpoint = isLogin ? '/auth/customer/login' : '/auth/customer/register';
        if (isReset) endpoint = '/auth/customer/reset-password';
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const payload = isReset 
                ? { email: formData.email, newPassword: formData.password }
                : formData;

            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                if (isReset) {
                    toast.success(data.message || 'Password reset successful!', { id: toastId });
                    setIsForgotPassword(false);
                    setFormData({ ...formData, password: '' });
                } else {
                    login({ ...data.customer, role: 'customer' }, data.token);
                    toast.success(isLogin ? `Welcome back, ${data.customer.name}!` : 'Registration successful!', { id: toastId });
                    navigate(from, { replace: true });
                }
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
                    {!isForgotPassword ? (
                        <div className="flex justify-center space-x-4 mb-8">
                            <button 
                                className={`text-2xl font-serif ${isLogin ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'} pb-2`}
                                onClick={() => setIsLogin(true)}
                                type="button"
                            >
                                Sign In
                            </button>
                            <button 
                                className={`text-2xl font-serif ${!isLogin ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'} pb-2`}
                                onClick={() => setIsLogin(false)}
                                type="button"
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center mb-8">
                            <h2 className="text-2xl font-serif text-brand-dark border-b-2 border-brand-gold pb-2">Reset Password</h2>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && !isForgotPassword && (
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                    placeholder="John Doe"
                                    required={!isLogin && !isForgotPassword}
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
                        {!isLogin && !isForgotPassword && (
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                                    placeholder="+91 9876543210"
                                    required={!isLogin && !isForgotPassword}
                                />
                            </div>
                        )}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-gray-700 text-sm font-bold">{isForgotPassword ? 'New Password' : 'Password'}</label>
                                {isLogin && !isForgotPassword && (
                                    <button 
                                        type="button" 
                                        onClick={() => setIsForgotPassword(true)}
                                        className="text-xs text-brand-gold hover:text-brand-dark font-medium transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
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
                            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Login to Account' : 'Create Account')}
                        </button>
                        
                        {isForgotPassword && (
                            <div className="text-center mt-4 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsForgotPassword(false)}
                                    className="text-sm text-gray-500 hover:text-brand-dark transition-colors"
                                >
                                    ← Back to Login
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
