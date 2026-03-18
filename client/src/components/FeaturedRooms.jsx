import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Intersection Observer for scroll-reveal ── */
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

export default function FeaturedRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [headRef, headInView] = useInView(0.2);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/rooms`)
            .then(res => res.json())
            .then(data => { setRooms(data.slice(0, 3)); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    if (loading) return (
        <div className="py-24 text-center">
            <div className="inline-block w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <section id="destinations" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative accents */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 relative">
                {/* Section Header */}
                <div
                    ref={headRef}
                    className={`text-center mb-20 transition-all duration-1000 ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Curated For You</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mt-4 mb-6">Our Exclusive Stays</h2>
                    <div className="flex items-center gap-3 justify-center">
                        <div className="w-16 h-px bg-brand-gold/40" />
                        <div className="w-2 h-2 bg-brand-gold rotate-45" />
                        <div className="w-16 h-px bg-brand-gold/40" />
                    </div>
                </div>

                {/* Room Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {rooms.map((room, idx) => (
                        <RoomCard key={room._id} room={room} idx={idx} navigate={navigate} />
                    ))}
                </div>

                {/* View All */}
                <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <button
                        onClick={() => navigate('/rooms')}
                        className="group inline-flex items-center gap-3 border-2 border-brand-dark text-brand-dark px-10 py-4 font-display font-bold uppercase tracking-[0.15em] text-xs hover:bg-brand-dark hover:text-white transition-all duration-500"
                    >
                        View All Rooms
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

function RoomCard({ room, idx, navigate }) {
    const [ref, inView] = useInView(0.15);

    return (
        <div
            ref={ref}
            onClick={() => navigate(`/rooms/${room._id}`)}
            className={`group cursor-pointer bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-700 overflow-hidden ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-72">
                <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                    <span className="font-serif text-brand-dark font-bold">₹{room.price}</span>
                    <span className="text-[10px] font-display text-gray-400 uppercase ml-1">/ night</span>
                </div>

                {/* Location badge */}
                <div className="absolute bottom-4 left-4 bg-brand-teal/90 backdrop-blur-sm text-white px-3 py-1.5 text-[10px] uppercase tracking-widest font-display font-bold">
                    {room.location}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-serif text-xl text-brand-dark group-hover:text-brand-gold transition-colors duration-300 mb-2">{room.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{room.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-display uppercase tracking-wider">Max {room.maxGuests} guests</span>
                    <span className="text-brand-gold font-display text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Details <span className="text-sm">→</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
