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

    const inputClass = "w-full px-5 py-4 bg-brand-sand/30 border border-gray-200 rounded-sm font-display text-sm text-brand-dark placeholder:text-gray-400 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-all duration-300";

    return (
        <div className="min-h-screen bg-brand-sand flex flex-col">
            <Navbar variant="dark" />
            <div className="h-24 md:h-32"></div>

            <div className="flex-grow flex items-center justify-center px-6 py-12">
                <div className="max-w-md w-full">
                    {/* Card */}
                    <div className="bg-white p-10 rounded-sm shadow-xl border-t-2 border-brand-gold animate-fade-slide-up">
                        {/* Header */}
                        {!isForgotPassword ? (
                            <div className="flex justify-center gap-8 mb-10">
                                <button 
                                    className={`relative text-xl font-serif pb-3 transition-colors ${isLogin ? 'text-brand-dark' : 'text-gray-300 hover:text-gray-500'}`}
                                    onClick={() => setIsLogin(true)}
                                    type="button"
                                >
                                    Sign In
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transition-transform duration-300 origin-left ${isLogin ? 'scale-x-100' : 'scale-x-0'}`} />
                                </button>
                                <button 
                                    className={`relative text-xl font-serif pb-3 transition-colors ${!isLogin ? 'text-brand-dark' : 'text-gray-300 hover:text-gray-500'}`}
                                    onClick={() => setIsLogin(false)}
                                    type="button"
                                >
                                    Register
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transition-transform duration-300 origin-left ${!isLogin ? 'scale-x-100' : 'scale-x-0'}`} />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center mb-10">
                                <h2 className="text-2xl font-serif text-brand-dark">Reset Password</h2>
                                <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3" />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 text-sm text-center border border-red-100 font-display animate-fade-in">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && !isForgotPassword && (
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-display font-bold mb-2">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" required={!isLogin && !isForgotPassword} />
                                </div>
                            )}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-display font-bold mb-2">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
                            </div>
                            {!isLogin && !isForgotPassword && (
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-display font-bold mb-2">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 9876543210" required={!isLogin && !isForgotPassword} />
                                </div>
                            )}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-display font-bold">{isForgotPassword ? 'New Password' : 'Password'}</label>
                                    {isLogin && !isForgotPassword && (
                                        <button 
                                            type="button" 
                                            onClick={() => setIsForgotPassword(true)}
                                            className="text-[10px] uppercase tracking-wider text-brand-gold hover:text-brand-dark font-display font-bold transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" required />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-premium mt-2 text-xs tracking-[0.2em] font-display"
                            >
                                {isForgotPassword ? 'Reset Password' : (isLogin ? 'Sign In →' : 'Create Account →')}
                            </button>
                            
                            {isForgotPassword && (
                                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(false)}
                                        className="text-xs text-gray-400 hover:text-brand-dark transition-colors font-display uppercase tracking-wider"
                                    >
                                        ← Back to Login
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
