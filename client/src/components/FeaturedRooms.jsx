import React, { useEffect, useState } from 'react';

export default function FeaturedRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from backend (ensure server is running on port 5000)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/rooms`)
            .then(res => res.json())
            .then(data => {
                setRooms(data.slice(0, 3)); // Show only first 3 rooms
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20 font-serif text-xl text-brand-teal">Loading luxury suites...</div>;

    return (
        <section id="destinations" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-brand-dark mb-4">Our Exclusive Stays</h2>
                    <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {rooms.map(room => (
                        <div key={room._id} className="group cursor-pointer bg-brand-sand/20 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative overflow-hidden h-80">
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 font-serif text-brand-dark shadow-sm">
                                    ₹{room.price} <span className="text-xs font-sans text-gray-500 uppercase">/ night</span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-serif text-2xl group-hover:text-brand-gold transition-colors">{room.title}</h3>
                                    <span className="text-sm font-medium text-brand-teal uppercase tracking-wider">{room.location}</span>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">{room.description}</p>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <span className="text-sm text-gray-500">Max Guests: {room.maxGuests}</span>
                                    <button className="text-brand-gold uppercase tracking-widest text-sm font-semibold hover:text-brand-teal transition-colors flex items-center gap-2">
                                        View Details <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
