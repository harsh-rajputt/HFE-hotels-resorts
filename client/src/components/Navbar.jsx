import React, { useState, useEffect } from 'react';

export default function Navbar({ variant = 'default' }) {
    const [isScrolled, setIsScrolled] = useState(false);

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

                {/* Mobile Menu Button (Placeholder) */}
                <div className="md:hidden text-brand-gold text-2xl cursor-pointer">
                    ☰
                </div>
            </div>
        </nav>
    );
}
