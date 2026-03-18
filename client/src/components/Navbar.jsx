import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ── Shared SVG icon ───────────────────────────────────────────────────── */
const UserIcon = ({ size = 26 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

/* ── Desktop logout button (needs its own useAuth call) ────────────────── */
function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-sans text-left"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
        </button>
    );
}

/* ── Mobile logout button ──────────────────────────────────────────────── */
function MobileLogoutButton({ onClose }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <button
            onClick={() => { logout(); onClose(); navigate('/'); }}
            className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
        </button>
    );
}

/* ── Main Navbar ───────────────────────────────────────────────────────── */
export default function Navbar({ variant = 'default' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    /* Close mobile menu automatically on every route change */
    useEffect(() => {
        setIsMenuOpen(false);
        setIsMobileDestinationsOpen(false);
    }, [location.pathname]);

    /* Scroll detect */
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Close menu on window resize back to desktop */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isDark = variant === 'dark' || isScrolled;
    const closeMobile = () => setIsMenuOpen(false);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" onClick={closeMobile}>
                    <img src="/logo.png" alt="HFE Logo" className="h-16 object-contain" />
                </Link>

                {/* ── Desktop Menu ── */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link to="/" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Home</Link>
                    <Link to="/rooms" className={`font-sans text-sm tracking-wide font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Rooms</Link>

                    {/* Destinations dropdown */}
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

                    {/* User icon + hover dropdown */}
                    <div className="relative group py-4">
                        <button
                            className={`hover:text-brand-gold transition-colors focus:outline-none cursor-pointer ${isDark ? 'text-brand-dark' : 'text-white'}`}
                            aria-label="User menu"
                        >
                            <UserIcon size={26} />
                        </button>

                        <div className="absolute right-0 top-full w-52 bg-white shadow-xl rounded-b-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-2 border-brand-gold z-50">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-sans">Signed in as</p>
                                        <p className="text-brand-dark font-bold font-serif truncate mt-0.5">{user?.name}</p>
                                    </div>
                                    <Link
                                        to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition-colors border-b border-gray-100 font-sans"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                        </svg>
                                        My Profile
                                    </Link>
                                    <LogoutButton />
                                </>
                            ) : (
                                <Link
                                    to="/user-auth"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition-colors font-sans"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>

                    <Link to="/rooms" className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm flex items-center justify-center">
                        Book Now
                    </Link>
                </div>

                {/* ── Mobile Hamburger Button ── */}
                <button
                    className={`${isDark ? 'text-brand-dark' : 'text-white'} md:hidden text-2xl cursor-pointer hover:text-brand-gold transition-colors focus:outline-none`}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* ── Mobile Slide-Down Menu ── */}
            <div
                className={`md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col space-y-4 py-4 px-6">

                    <Link to="/" className="text-brand-dark font-medium hover:text-brand-gold" onClick={closeMobile}>Home</Link>
                    <Link to="/rooms" className="text-brand-dark font-medium hover:text-brand-gold" onClick={closeMobile}>Rooms</Link>

                    {/* Destinations accordion */}
                    <div className="flex flex-col space-y-2">
                        <button
                            className="flex justify-between items-center text-brand-dark font-medium hover:text-brand-gold cursor-pointer w-full text-left"
                            onClick={() => setIsMobileDestinationsOpen(prev => !prev)}
                        >
                            <span>Destinations</span>
                            <span className="text-xs">{isMobileDestinationsOpen ? '▴' : '▾'}</span>
                        </button>
                        {isMobileDestinationsOpen && (
                            <div className="flex flex-col space-y-2 pl-4 border-l-2 border-gray-200 mt-1">
                                <Link to="/shimla" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={closeMobile}>Shimla (HP)</Link>
                                <Link to="/rishikesh" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={closeMobile}>Rishikesh (UK)</Link>
                                <Link to="/ranikhet" className="text-gray-600 hover:text-brand-gold text-sm block py-1" onClick={closeMobile}>Ranikhet (UK)</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/gallery" className="text-brand-dark font-medium hover:text-brand-gold" onClick={closeMobile}>Gallery</Link>
                    <a href="/#contact" className="text-brand-dark font-medium hover:text-brand-gold" onClick={closeMobile}>Contact</a>

                    {/* ── Mobile user section ── */}
                    <div className="border-t border-gray-100 pt-4">
                        {isAuthenticated ? (
                            <div className="flex flex-col space-y-3">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-sans">
                                    Signed in as{' '}
                                    <span className="font-bold text-brand-dark">{user?.name?.split(' ')[0]}</span>
                                </p>
                                <Link
                                    to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                                    onClick={closeMobile}
                                    className="text-brand-dark font-medium hover:text-brand-gold transition-colors flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    My Profile
                                </Link>
                                <MobileLogoutButton onClose={closeMobile} />
                            </div>
                        ) : (
                            <Link
                                to="/user-auth"
                                onClick={closeMobile}
                                className="text-brand-dark hover:text-brand-gold transition-colors flex items-center gap-2 font-medium"
                            >
                                <UserIcon size={20} />
                                Login / Register
                            </Link>
                        )}
                    </div>

                    <Link
                        to="/rooms"
                        onClick={closeMobile}
                        className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm w-full text-center"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
