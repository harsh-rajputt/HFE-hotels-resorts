import React, { useState, useEffect } from 'react';

export default function RoomForm({ room, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        maxGuests: '',
        image: '',
        location: ''
    });

    useEffect(() => {
        if (room) {
            setFormData(room);
        }
    }, [room]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = room ? 'PUT' : 'POST';
        const url = room ? `http://localhost:5000/api/rooms/${room._id}` : 'http://localhost:5000/api/rooms';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                onSuccess();
                if (!room) setFormData({ title: '', description: '', price: '', maxGuests: '', image: '', location: '' });
            })
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-brand-gold">
            <h3 className="text-xl font-serif text-brand-dark mb-4">{room ? 'Edit Room' : 'Add New Room'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Room Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
                <input name="location" placeholder="Location (e.g. Shimla)" value={formData.location} onChange={handleChange} className="border p-2 rounded" required />
                <input name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
                <input name="maxGuests" type="number" placeholder="Max Guests" value={formData.maxGuests} onChange={handleChange} className="border p-2 rounded" required />
                <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2 rounded" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded col-span-2" rows="3" required />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-brand-teal text-white px-6 py-2 rounded hover:bg-brand-dark transition-colors">
                    {room ? 'Update Room' : 'Create Room'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
