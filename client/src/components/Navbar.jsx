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

    /* Scroll detect with throttling */
    useEffect(() => {
        const handleScroll = () => {
            const shouldScroll = window.scrollY > 50;
            if (isScrolled !== shouldScroll) setIsScrolled(shouldScroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

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
        <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
            isDark 
                ? 'bg-white/80 backdrop-blur-lg shadow-xl py-3' 
                : 'bg-transparent py-5'
        }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo Section */}
                <Link to="/" onClick={closeMobile} className="group relative transition-transform duration-300 hover:scale-105">
                    <img src="/logo.png" alt="HFE Logo" className="h-14 md:h-16 w-14 md:w-16 object-cover rounded-full border-2 border-brand-gold/30 shadow-md" />
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-500" />
                </Link>

                {/* ── Desktop Menu ── */}
                <div className="hidden md:flex items-center space-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <Link to="/" className={`nav-link font-display text-sm tracking-widest uppercase font-semibold ${isDark ? 'text-brand-dark' : 'text-white'}`}>Home</Link>
                        <Link to="/rooms" className={`nav-link font-display text-sm tracking-widest uppercase font-semibold ${isDark ? 'text-brand-dark' : 'text-white'}`}>Rooms</Link>

                        {/* Destinations dropdown */}
                        <div className="relative group/dest py-4">
                            <span className={`nav-link font-display text-sm tracking-widest uppercase font-semibold cursor-pointer flex items-center gap-1 ${isDark ? 'text-brand-dark' : 'text-white'}`}>
                                Locations <span className="text-[10px] transform group-hover/dest:rotate-180 transition-transform duration-300">▼</span>
                            </span>
                            <div className="absolute left-0 top-full w-56 bg-white/95 backdrop-blur-xl shadow-2xl rounded-sm overflow-hidden opacity-0 translate-y-2 pointer-events-none group-hover/dest:opacity-100 group-hover/dest:translate-y-0 group-hover/dest:pointer-events-auto transition-all duration-300 border-t-2 border-brand-gold">
                                <Link to="/shimla" className="block px-6 py-4 text-xs tracking-widest font-display text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 border-b border-gray-50 uppercase">Shimla (HP)</Link>
                                <Link to="/rishikesh" className="block px-6 py-4 text-xs tracking-widest font-display text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 border-b border-gray-50 uppercase">Rishikesh (UK)</Link>
                                <Link to="/ranikhet" className="block px-6 py-4 text-xs tracking-widest font-display text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 uppercase">Ranikhet (UK)</Link>
                            </div>
                        </div>

                        <Link to="/gallery" className={`nav-link font-display text-sm tracking-widest uppercase font-semibold ${isDark ? 'text-brand-dark' : 'text-white'}`}>Gallery</Link>
                        <a href="/#contact" className={`nav-link font-display text-sm tracking-widest uppercase font-semibold ${isDark ? 'text-brand-dark' : 'text-white'}`}>Contact</a>
                    </div>

                    <div className="flex items-center space-x-6 border-l border-gray-200/50 pl-8">
                        {/* User Profile */}
                        <div className="relative group/user py-4">
                            <button className={`hover:text-brand-gold transition-all duration-300 flex items-center gap-2 group ${isDark ? 'text-brand-dark' : 'text-white'}`}>
                                <div className="p-2.5 rounded-full border border-current opacity-70 group-hover:opacity-100 group-hover:bg-brand-gold/10 transition-all">
                                    <UserIcon size={20} />
                                </div>
                            </button>

                            <div className="absolute right-0 top-full w-60 bg-white shadow-2xl rounded-sm overflow-hidden opacity-0 translate-y-2 pointer-events-none group-hover/user:opacity-100 group-hover/user:translate-y-0 group-hover/user:pointer-events-auto transition-all duration-300 border-t-2 border-brand-gold z-50">
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-display font-bold">Welcome back,</p>
                                            <p className="text-brand-dark text-lg font-serif font-bold truncate mt-1 leading-tight">{user?.name}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-sm font-display font-medium"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                                </svg>
                                                My Dashboard
                                            </Link>
                                            <LogoutButton />
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-2">
                                        <Link
                                            to="/user-auth"
                                            className="flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-sm font-display font-medium"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                                            </svg>
                                            Log In / Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Link to="/rooms" className="btn-premium rounded-full text-xs tracking-widest animate-pulse hover:animate-none">
                            Book Your Stay
                        </Link>
                    </div>
                </div>

                {/* ── Mobile Hamburger ── */}
                <button
                    className={`${isDark ? 'text-brand-dark' : 'text-white'} md:hidden p-2 rounded-lg transition-all active:scale-95`}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </div>
                </button>
            </div>

            {/* ── Mobile Slide-Down ── */}
            <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-out z-40 ${
                isMenuOpen ? 'max-h-screen border-t border-gray-100 shadow-2xl' : 'max-h-0'
            }`}>
                <div className="bg-white/95 backdrop-blur-xl px-8 py-10 flex flex-col space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                        <Link to="/" className="text-2xl font-serif text-brand-dark hover:text-brand-gold" onClick={closeMobile}>Home</Link>
                        <Link to="/rooms" className="text-2xl font-serif text-brand-dark hover:text-brand-gold" onClick={closeMobile}>Rooms</Link>
                        
                        {/* Mobile Destinations */}
                        <div className="space-y-4">
                            <button
                                className="w-full flex justify-between items-center text-2xl font-serif text-brand-dark"
                                onClick={() => setIsMobileDestinationsOpen(prev => !prev)}
                            >
                                <span>Destinations</span>
                                <span className={`text-sm transition-transform duration-300 ${isMobileDestinationsOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            <div className={`space-y-4 pl-6 overflow-hidden transition-all duration-300 ${isMobileDestinationsOpen ? 'max-h-40 py-2' : 'max-h-0'}`}>
                                <Link to="/shimla" className="block text-lg text-gray-500 hover:text-brand-gold" onClick={closeMobile}>Shimla</Link>
                                <Link to="/rishikesh" className="block text-lg text-gray-500 hover:text-brand-gold" onClick={closeMobile}>Rishikesh</Link>
                                <Link to="/ranikhet" className="block text-lg text-gray-500 hover:text-brand-gold" onClick={closeMobile}>Ranikhet</Link>
                            </div>
                        </div>

                        <Link to="/gallery" className="text-2xl font-serif text-brand-dark" onClick={closeMobile}>Gallery</Link>
                        <a href="/#contact" className="text-2xl font-serif text-brand-dark" onClick={closeMobile}>Contact</a>
                    </div>

                    <div className="border-t border-gray-100 pt-8 flex flex-col space-y-6">
                        {isAuthenticated ? (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-display font-black">Logged in as</p>
                                    <p className="text-2xl font-serif font-bold text-brand-dark mt-1">{user?.name}</p>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Link
                                        to={user?.role === 'customer' ? '/user-dashboard' : '/admin'}
                                        onClick={closeMobile}
                                        className="text-lg font-display font-medium text-brand-teal flex items-center gap-3"
                                    >
                                        <div className="p-2 border border-brand-teal rounded-full"><UserIcon size={18} /></div>
                                        Go to Profile
                                    </Link>
                                    <MobileLogoutButton onClose={closeMobile} />
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/user-auth"
                                onClick={closeMobile}
                                className="btn-premium rounded-full text-center"
                            >
                                Sign In / Register
                            </Link>
                        )}
                        
                        <Link
                            to="/rooms"
                            onClick={closeMobile}
                            className="w-full border-2 border-brand-gold text-brand-gold py-4 text-center font-display font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-white transition-all rounded-full"
                        >
                            Book Your Stay
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

