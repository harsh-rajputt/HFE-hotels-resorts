import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

export default function Ranikhet() {
    const [loaded, setLoaded] = useState(false);
    const [contentRef, contentInView] = useInView(0.1);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => setLoaded(true), 100);
    }, []);

    return (
        <div className="min-h-screen bg-brand-sand">
            <Navbar variant="dark" />

            {/* ── Hero Banner ── */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
                    style={{ backgroundImage: "url('/hero-bg-final.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-brand-sand" />
                <div className="absolute top-0 left-8 md:left-16 w-px h-full bg-white/10" />
                <div className="absolute top-0 right-8 md:right-16 w-px h-full bg-white/10" />

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
                    <span className={`inline-block border border-brand-gold/60 text-brand-gold uppercase tracking-[0.35em] px-6 py-2 text-xs font-display font-semibold bg-brand-gold/5 backdrop-blur-sm mb-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Uttarakhand
                    </span>
                    <h1 className={`font-serif text-4xl sm:text-5xl md:text-7xl drop-shadow-2xl transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="block">Ranikhet</span>
                        <span className="block text-brand-gold text-3xl sm:text-4xl md:text-5xl mt-2">Nature's Majesty & Military's Pride</span>
                    </h1>
                    <div className={`flex items-center gap-4 mt-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-12 md:w-20 h-px bg-brand-gold/60" />
                        <div className="w-2 h-2 bg-brand-gold rotate-45" />
                        <div className="w-12 md:w-20 h-px bg-brand-gold/60" />
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="container mx-auto px-6 py-20">
                <div ref={contentRef} className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
                    {/* Sticky Image */}
                    <div className={`w-full lg:w-5/12 transition-all duration-1000 ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="lg:sticky lg:top-32">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-brand-gold/10 rounded-sm -z-10 group-hover:bg-brand-gold/15 transition-colors duration-500" />
                                <img
                                    src="/hero-bg-final.png"
                                    alt="Bella Vista Chalet"
                                    className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-white font-display text-sm uppercase tracking-widest">Bella Vista Chalet</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`w-full lg:w-7/12 transition-all duration-1000 delay-200 ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Explore</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-3 mb-6">Ranikhet (Uttarakhand)</h2>

                        <div className="space-y-5 text-gray-500 leading-relaxed font-display text-sm mb-10">
                            <p>
                                Discover the serene charm of Ranikhet, a picturesque hill station and cantonment town in Uttarakhand's Almora district. Surrounded by majestic Himalayan peaks, Ranikhet offers breathtaking panoramic views, tranquil environment, and a rich cultural heritage. Explore ancient temples like Jhula Devi Temple and Katarmal Sun Temple, or stroll through the beautiful Chaubatia Gardens. As the home of the Kumaon Regiment, Ranikhet exudes a sense of pride and tradition.
                            </p>
                        </div>

                        <h3 className="text-2xl font-serif text-brand-dark mb-3">Bella Vista Chalet</h3>
                        <p className="text-gray-500 font-display text-sm leading-relaxed mb-10">
                            Escape to the lap of luxury at <strong className="text-brand-dark">Bella Vista Chalet</strong>, nestled in the heart of Ranikhet's breathtaking Kumaon region. This stunning 3BHK independent villa offers unparalleled Himalayan views from every room, inviting you to unwind in serenity. With its majestic surroundings and luxurious amenities, Bella Vista Chalet is the perfect retreat for those seeking a tranquil and rejuvenating getaway.
                        </p>

                        {/* Highlights */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-brand-gold" />
                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold">What Awaits You</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {[
                                'Panoramic Himalayan Views',
                                '3BHK Independent Villa',
                                'Chaubatia Gardens Nearby',
                                'Jhula Devi Temple Visit',
                                'Kumaon Regiment Museum',
                                'Peaceful Mountain Retreat',
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`flex gap-3 items-center p-4 bg-white rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ${
                                        contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                    }`}
                                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                                >
                                    <div className="w-2 h-2 bg-brand-gold rounded-full flex-shrink-0" />
                                    <span className="text-gray-600 font-display text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/rooms">
                            <button className="btn-premium rounded-full text-xs tracking-widest font-display">
                                Bella Vista Chalet (Ranikhet) →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
