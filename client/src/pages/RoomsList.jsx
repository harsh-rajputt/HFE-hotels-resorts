import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ location: '', category: '', checkIn: '', checkOut: '' });
    const navigate = useNavigate();

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

    const filteredRooms = rooms; // Filtering is now handled by the backend

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="h-24 md:h-32"></div>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Discover Our Rooms</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect accommodation for your stay, filtering by location or style.</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-center">
                    <input type="date" name="checkIn" value={filters.checkIn} onChange={handleFilterChange} className="p-3 border rounded w-full md:w-48 outline-none" placeholder="Check In" />
                    <input type="date" name="checkOut" value={filters.checkOut} onChange={handleFilterChange} className="p-3 border rounded w-full md:w-48 outline-none" placeholder="Check Out" min={filters.checkIn} />

                    <select name="location" value={filters.location} onChange={handleFilterChange} className="p-3 border rounded w-full md:w-64 outline-none">
                        <option value="">All Locations</option>
                        <option value="Shimla">Shimla</option>
                        <option value="Rishikesh">Rishikesh</option>
                        <option value="Ranikhet">Ranikhet</option>
                    </select>
                    <select name="category" value={filters.category} onChange={handleFilterChange} className="p-3 border rounded w-full md:w-64 outline-none">
                        <option value="">All Categories</option>
                        <option value="Single">Single</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                    </select>
                    <button onClick={() => setFilters({location: '', category: '', checkIn: '', checkOut: ''})} className="text-brand-gold font-medium px-4">
                        Clear Filters
                    </button>
                </div>

                {/* Room Grid */}
                {loading ? (
                    <div className="text-center py-20">Loading rooms...</div>
                ) : filteredRooms.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No rooms found matching your criteria.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRooms.map(room => (
                            <div key={room._id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-brand-dark font-bold text-sm shadow-sm">
                                        ₹{room.price} / night
                                    </div>
                                    <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {room.category || 'Deluxe'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif font-bold text-gray-800">{room.title}</h3>
                                    </div>
                                    <p className="text-brand-gold text-sm font-semibold mb-4 uppercase flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {room.location}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 md:h-10">{room.description}</p>
                                    
                                    <button 
                                        onClick={() => navigate(`/rooms/${room._id}`)}
                                        className="w-full bg-brand-dark hover:bg-brand-gold text-white px-4 py-3 rounded uppercase tracking-wider text-sm font-bold transition-colors"
                                    >
                                        View Details & Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
