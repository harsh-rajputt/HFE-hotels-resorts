import React from 'react';

export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg-final.png')" }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-brand-gold uppercase tracking-[0.2em] mb-4 text-sm md:text-base animate-fade-in-up">
                    Welcome to
                </h2>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-6 drop-shadow-lg animate-fade-in-up delay-100">
                    The HFE Group of Hotels & Resorts
                </h1>
                <p className="font-sans text-lg md:text-xl max-w-2xl text-white/90 mb-10 animate-fade-in-up delay-200">
                    Crafting unforgettable experiences in nature & adventure across <span className="text-brand-gold font-semibold">Shimla (HP), Rishikesh & Ranikhet(Uttarakhand)</span>.
                </p>

                <div className="animate-fade-in-up delay-300">
                    <a href="/gallery">
                        <button className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-brand-dark transition-all duration-300 font-serif uppercase tracking-widest text-sm">
                            Gallery
                        </button>
                    </a>
                </div>
            </div>


        </div>
    );
}
