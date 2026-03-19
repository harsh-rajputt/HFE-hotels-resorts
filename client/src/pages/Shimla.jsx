import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpeg';

const galleryImages = [img1, img2, img3, img4, img5, img6, img7];

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

export default function Shimla() {
    const [loaded, setLoaded] = useState(false);
    const [contentRef, contentInView] = useInView(0.1);
    const [attractRef, attractInView] = useInView(0.1);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => setLoaded(true), 100);
    }, []);

    const inHouse = [
        { title: 'Unique Accommodations', desc: 'Mud-House Eco Cottages & Adventure Swiss Tents' },
        { title: 'Dining Delights', desc: 'Hillyard Bistro (In-house Restaurant)' },
        { title: 'Natural Wonders', desc: 'Scenic Sunrise & Sunset View, Apple Orchards, Himalaya Range View' },
        { title: 'Fun & Games', desc: 'Kids Play Area, Indoor & Outdoor Games' },
        { title: 'Adventure Zone', desc: 'Bonfire, Jungle-Picnic, Trekking, Birding, Camping' },
    ];

    const nearby = [
        { title: 'Cultural Experiences', desc: 'Stone Kumbh Temple, Chail Palace, Mahabir Temple' },
        { title: 'Adventure Hotspots', desc: 'Highest Cricket Ground (Chail), Himalayan Nature Park (Kufri)' },
        { title: 'Nature Escapes', desc: 'Forest & Mountain Trekking Areas' },
    ];

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
                        Himachal Pradesh
                    </span>
                    <h1 className={`font-serif text-4xl sm:text-5xl md:text-7xl drop-shadow-2xl transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="block">Shimla</span>
                        <span className="block text-brand-gold text-3xl sm:text-4xl md:text-5xl mt-2">The Queen of Hills</span>
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
                                    alt="Clouds Hill-Top Camp"
                                    className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-white font-display text-sm uppercase tracking-widest">Clouds Hill-Top Camp</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`w-full lg:w-7/12 transition-all duration-1000 delay-200 ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Explore</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-3 mb-6">Himachal Pradesh</h2>

                        <div className="space-y-5 text-gray-500 leading-relaxed font-display text-sm mb-10">
                            <p>
                                Himachal Pradesh is a beautiful state of India in the western Himalayas, known for its stunning natural scenery, rich cultural heritage, and diverse wildlife. Himachal has lots of surprises for tourists like: Snow-Capped mountains, Lush green apple orchards, Trekking trails, Scenic Valleys, Lakes, Temples, Monasteries, Adventure sports, Cultural festivals, and many more...
                            </p>
                        </div>

                        <h3 className="text-2xl font-serif text-brand-dark mb-3">Clouds Hill-Top Camp</h3>
                        <p className="text-gray-500 font-display text-sm leading-relaxed mb-10">
                            Escape to the enchanting Clouds Hill-Top Camp, nestled midway between Chail and Kufri in the Shimla District. Surrounded by lush apple orchards and majestic mountains, our eco-friendly mud houses and adventure tents offer breathtaking views of the hills and valleys. Under the expert management of The HFE Group of Hotels & Resorts, enjoy adventurous and comfortable stays with all essential amenities.
                        </p>

                        {/* In-House Attractions */}
                        <div ref={attractRef}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-px bg-brand-gold" />
                                <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold">In-House Attractions</h4>
                            </div>
                            <div className="space-y-4 mb-12">
                                {inHouse.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex gap-4 items-start p-4 bg-white rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ${
                                            attractInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                        }`}
                                        style={{ transitionDelay: `${i * 100}ms` }}
                                    >
                                        <div className="w-2 h-2 bg-brand-gold rounded-full mt-1.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-display font-bold text-brand-dark text-sm">{item.title}: </span>
                                            <span className="text-gray-500 font-display text-sm">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Nearby */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-px bg-brand-gold" />
                                <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold">Nearby Attractions</h4>
                            </div>
                            <div className="space-y-4 mb-12">
                                {nearby.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex gap-4 items-start p-4 bg-white rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ${
                                            attractInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                        }`}
                                        style={{ transitionDelay: `${(inHouse.length + i) * 100}ms` }}
                                    >
                                        <div className="w-2 h-2 bg-brand-teal rounded-full mt-1.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-display font-bold text-brand-dark text-sm">{item.title}: </span>
                                            <span className="text-gray-500 font-display text-sm">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link to="/rooms">
                            <button className="btn-premium rounded-full text-xs tracking-widest font-display">
                                Clouds Hill-Top Camp (Shimla) →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Location Gallery ── */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Discover</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mt-3">Glimpses of Shimla</h2>
                        <div className="w-16 h-px bg-brand-gold mx-auto mt-6" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {galleryImages.map((img, i) => (
                            <div 
                                key={i} 
                                className={`relative group overflow-hidden rounded-sm shadow-md ${
                                    i === 0 ? 'col-span-2 row-span-2' : 
                                    i === 3 ? 'col-span-2 row-span-1' : ''
                                }`}
                            >
                                <img 
                                    src={img} 
                                    alt={`Shimla view ${i + 1}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
