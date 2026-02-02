import React, { useState, useEffect } from 'react';

export default function Navbar({ variant = 'default' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);

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
                <div className="flex items-center">
                    <img src="/logo.png" alt="HFE Logo" className="h-16 object-contain" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="/" className={`font-sans font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Home</a>
                    <div className="relative group py-4">
                        <a href="/#destinations" className={`font-sans font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>
                            Destinations ▾
                        </a>
                        <div className="absolute left-0 top-full w-48 bg-white shadow-xl rounded-b-md overflow-hidden hidden group-hover:block border-t-2 border-brand-gold">
                            <a href="/shimla" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors border-b border-gray-100 font-serif">Shimla (HP)</a>
                            <a href="/rishikesh" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors border-b border-gray-100 font-serif">Rishikesh (UK)</a>
                            <a href="/ranikhet" className="block px-4 py-3 text-sm text-brand-dark hover:bg-brand-gold hover:text-white transition-colors font-serif">Ranikhet (UK)</a>
                        </div>
                    </div>
                    <a href="/#about" className={`font-sans font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>About</a>
                    <a href="/#contact" className={`font-sans font-medium hover:text-brand-gold transition-colors ${isDark ? 'text-brand-dark' : 'text-white'}`}>Contact</a>

                    <button className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm">
                        Book Now
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div
                    className="md:hidden text-brand-gold text-2xl cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
                    <a href="/" className="text-brand-dark font-medium hover:text-brand-gold">Home</a>
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
                                <a href="/shimla" className="text-gray-600 hover:text-brand-gold text-sm block py-1">Shimla (HP)</a>
                                <a href="/rishikesh" className="text-gray-600 hover:text-brand-gold text-sm block py-1">Rishikesh (UK)</a>
                                <a href="/ranikhet" className="text-gray-600 hover:text-brand-gold text-sm block py-1">Ranikhet (UK)</a>
                            </div>
                        )}
                    </div>
                    <a href="/#about" className="text-brand-dark font-medium hover:text-brand-gold">About</a>
                    <a href="/#contact" className="text-brand-dark font-medium hover:text-brand-gold">Contact</a>
                    <a href="/gallery" className="text-brand-dark font-medium hover:text-brand-gold">Gallery</a>
                    <button className="bg-brand-gold text-white px-6 py-2 rounded-none font-serif hover:bg-opacity-90 transition-all uppercase tracking-wider text-sm w-full">
                        Book Now
                    </button>
                </div>
            )}
        </nav>
    );
}
