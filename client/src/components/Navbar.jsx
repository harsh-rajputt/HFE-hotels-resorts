import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ variant = 'default' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
    const { isAuthenticated, user } = useAuth(); // NEW

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDark = variant === 'dark' || isScrolled;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <img src="/logo.png" alt="HFE Logo" className="h-16 object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link to="/" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Home</Link>
                    <Link to="/rooms" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Rooms</Link>
                    <div className="relative group py-4">
                        <span className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors cursor-pointer ${isDark ? 'text-brand-dark' : 'text-white'}`}>
                            Destinations ▾
                        </span>
                        <div className="absolute left-0 top-full w-48 bg-white shadow-xl rounded-b-md overflow-hidden hidden group-hover:block border-t-2 border-brand-gold">
                            <Link to="/shimla" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors border-b border-gray-100 font-serif">Shimla (HP)</Link>
                            <Link to="/rishikesh" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors border-b border-gray-100 font-serif">Rishikesh (UK)</Link>
                            <Link to="/ranikhet" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors font-serif">Ranikhet (UK)</Link>
                        </div>
                    </div>
                    <Link to="/gallery" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Gallery</Link>
                    <a href="/#contact" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Contact</a>

                    {isAuthenticated ? (
                        <Link 
                            to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                            className="text-brand-gold font-bold text-sm hover:text-brand-dark transition-colors tracking-wide underline"
                        >
                            {user?.role === 'customer' ? `Hi, ${user?.name?.split(' ')[0]}` : 'Admin Panel'}
                        </Link>
                    ) : (
                        <Link to="/user-auth" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors underline ${isDark ? 'text-brand-dark' : 'text-white'}`}>
                            Login
                        </Link>
                    )}

                    <Link to="/rooms" className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm flex items-center justify-center">
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div
                    className={`${isDark ? 'text-brand-dark' : 'text-white'} md:hidden text-2xl cursor-pointer hover:text-brand-gold transition-colors`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
                    <Link to="/" className="text-brand-dark font-medium hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <div className="flex flex-col space-y-2">
                        <div
                            className="flex justify-between items-center text-brand-dark font-medium hover:text-brand-gold cursor-pointer"
                            onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                        >
                            <span>Destinations</span>
                            <span>{isMobileDestinationsOpen ? '▴' : '▾'}</span>
                        </div>

                        {isMobileDestinationsOpen && (
                            <div className="flex flex-col space-y-2 pl-4 border-l-2 border-brand-sand mt-2">
                                <Link to="/shimla" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={() => setIsMenuOpen(false)}>Shimla (HP)</Link>
                                <Link to="/rishikesh" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={() => setIsMenuOpen(false)}>Rishikesh (UK)</Link>
                                <Link to="/ranikhet" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={() => setIsMenuOpen(false)}>Ranikhet (UK)</Link>
                            </div>
                        )}
                    </div>
                    <a href="/#about" className="text-brand-dark font-medium hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="/#contact" className="text-brand-dark font-medium hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    <Link to="/gallery" className="text-brand-dark font-medium hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    
                    {/* Login / Dashboard link for mobile */}
                    {isAuthenticated ? (
                        <Link
                            to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-brand-gold font-bold hover:text-brand-dark transition-colors"
                        >
                            {user?.role === 'customer' ? `Hi, ${user?.name?.split(' ')[0]}` : 'Admin Panel'}
                        </Link>
                    ) : (
                        <Link
                            to="/user-auth"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-brand-dark font-medium hover:text-brand-gold transition-colors"
                        >
                            Login / Register
                        </Link>
                    )}

                    <Link
                        to="/rooms"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm w-full text-center"
                    >
                        Book Now
                    </Link>
                </div>
            )}
        </nav>
    );
}

