import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.1) {
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

export default function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ location: '', category: '', checkIn: '', checkOut: '' });
    const navigate = useNavigate();
    const [headRef, headInView] = useInView(0.2);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchRooms();
    }, [filters]);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const queryParams = new URLSearchParams();
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.checkIn) queryParams.append('checkIn', filters.checkIn);
            if (filters.checkOut) queryParams.append('checkOut', filters.checkOut);

            const response = await fetch(`${apiUrl}/rooms?${queryParams.toString()}`);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-brand-sand flex flex-col">
            <Navbar variant="dark" />
            <div className="h-24 md:h-32"></div>

            <main className="flex-grow container mx-auto px-6 py-12">
                {/* Header */}
                <div
                    ref={headRef}
                    className={`text-center mb-16 transition-all duration-1000 ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Find Your Perfect Stay</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mt-3 mb-4">Discover Our Rooms</h1>
                    <div className="flex items-center gap-3 justify-center mb-6">
                        <div className="w-16 h-px bg-brand-gold/40" />
                        <div className="w-2 h-2 bg-brand-gold rotate-45" />
                        <div className="w-16 h-px bg-brand-gold/40" />
                    </div>
                    <p className="text-gray-500 max-w-xl mx-auto font-display text-sm">Handpicked accommodations across India's finest locations.</p>
                </div>

                {/* Filter Bar */}
                <div className={`bg-white/80 backdrop-blur-xl p-6 rounded-sm shadow-lg mb-12 border border-gray-100 transition-all duration-1000 delay-200 ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-display font-bold mb-1.5">Check-in</label>
                            <input type="date" name="checkIn" value={filters.checkIn} onChange={handleFilterChange} className="p-3 border border-gray-200 rounded-sm w-full md:w-44 outline-none focus:border-brand-gold transition-colors font-display text-sm" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-display font-bold mb-1.5">Check-out</label>
                            <input type="date" name="checkOut" value={filters.checkOut} onChange={handleFilterChange} className="p-3 border border-gray-200 rounded-sm w-full md:w-44 outline-none focus:border-brand-gold transition-colors font-display text-sm" min={filters.checkIn} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-display font-bold mb-1.5">Location</label>
                            <select name="location" value={filters.location} onChange={handleFilterChange} className="p-3 border border-gray-200 rounded-sm w-full md:w-52 outline-none focus:border-brand-gold transition-colors font-display text-sm bg-white">
                                <option value="">All Locations</option>
                                <option value="Shimla">Shimla</option>
                                <option value="Rishikesh">Rishikesh</option>
                                <option value="Ranikhet">Ranikhet</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-display font-bold mb-1.5">Category</label>
                            <select name="category" value={filters.category} onChange={handleFilterChange} className="p-3 border border-gray-200 rounded-sm w-full md:w-52 outline-none focus:border-brand-gold transition-colors font-display text-sm bg-white">
                                <option value="">All Categories</option>
                                <option value="Single">Single</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-end">
                            <label className="text-[10px] invisible mb-1.5">.</label>
                            <button
                                onClick={() => setFilters({ location: '', category: '', checkIn: '', checkOut: '' })}
                                className="text-brand-gold font-display font-bold text-xs uppercase tracking-widest px-5 py-3 border border-brand-gold/30 hover:bg-brand-gold hover:text-white transition-all duration-300"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Room Grid */}
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-gray-400 font-display text-lg">No rooms found matching your criteria.</p>
                        <button onClick={() => setFilters({ location: '', category: '', checkIn: '', checkOut: '' })} className="mt-4 text-brand-gold font-display font-bold text-sm uppercase tracking-wider">Clear filters →</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room, idx) => (
                            <RoomCard key={room._id} room={room} idx={idx} navigate={navigate} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

function RoomCard({ room, idx, navigate }) {
    const [ref, inView] = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`group cursor-pointer bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
            onClick={() => navigate(`/rooms/${room._id}`)}
        >
            <div className="h-64 overflow-hidden relative">
                <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg">
                    <span className="text-brand-dark font-serif font-bold">₹{room.price}</span>
                    <span className="text-[9px] text-gray-400 font-display uppercase ml-1">/ night</span>
                </div>
                <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest">
                    {room.category || 'Deluxe'}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors mb-1">{room.title}</h3>
                <p className="text-brand-teal text-xs font-display font-semibold uppercase tracking-wider mb-3 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {room.location}
                </p>
                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{room.description}</p>

                <button className="w-full btn-premium text-xs tracking-widest">
                    View Details & Book
                </button>
            </div>
        </div>
    );
}
