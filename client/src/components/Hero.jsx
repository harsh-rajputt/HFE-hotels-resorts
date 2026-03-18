import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with parallax-like zoom */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
                style={{ backgroundImage: "url('/hero-bg-final.png')" }}
            >
                {/* Darker cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
            </div>

            {/* Decorative side lines */}
            <div className="absolute top-0 left-8 md:left-16 w-px h-full bg-white/10" />
            <div className="absolute top-0 right-8 md:right-16 w-px h-full bg-white/10" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
                {/* Subtitle badge */}
                <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <span className="inline-block border border-brand-gold/60 text-brand-gold uppercase tracking-[0.35em] px-6 py-2 text-xs md:text-sm font-display font-semibold bg-brand-gold/5 backdrop-blur-sm">
                        Welcome To
                    </span>
                </div>

                {/* Main Title */}
                <h1 className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mt-8 mb-6 leading-[0.95] drop-shadow-2xl transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="block">The HFE Group of</span>
                    <span className="block text-brand-gold mt-2">Hotels & Resorts</span>
                </h1>

                {/* Divider */}
                <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
                    <div className="w-12 md:w-20 h-px bg-brand-gold/60" />
                    <div className="w-2 h-2 bg-brand-gold rotate-45" />
                    <div className="w-12 md:w-20 h-px bg-brand-gold/60" />
                </div>

                <p className={`font-display text-base md:text-lg max-w-2xl text-white/80 mb-12 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    Crafting unforgettable experiences in nature & adventure across{' '}
                    <span className="text-brand-gold font-semibold">Shimla, Rishikesh & Ranikhet</span>
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all duration-1000 delay-[1100ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <Link to="/rooms">
                        <button className="group relative bg-brand-gold text-white px-10 py-4 font-display font-bold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/30">
                            <span className="relative z-10">Book Your Stay</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </button>
                    </Link>
                    <Link to="/gallery">
                        <button className="group border-2 border-white/40 text-white px-10 py-4 font-display uppercase tracking-[0.2em] text-xs backdrop-blur-sm hover:border-brand-gold hover:text-brand-gold transition-all duration-500">
                            Explore Gallery
                        </button>
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1300ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-display">Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-brand-gold/60 to-transparent animate-pulse" />
            </div>
        </div>
    );
}
