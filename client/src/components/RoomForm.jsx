import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function RoomForm({ room, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        maxGuests: '',
        image: '',
        location: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (room) {
            setFormData(room);
        }
    }, [room]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const { token } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const method = room ? 'PUT' : 'POST';
        const url = room ? `${apiUrl}/rooms/${room._id}` : `${apiUrl}/rooms`;

        const toastId = toast.loading(room ? 'Updating room...' : 'Creating room...');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('maxGuests', formData.maxGuests);
        data.append('location', formData.location);

        if (imageFile) {
            data.append('image', imageFile);
        } else if (formData.image && typeof formData.image === 'string') {
            data.append('image', formData.image);
        }

        fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save room');
                return res.json();
            })
            .then(data => {
                toast.success(room ? 'Room updated!' : 'Room created!', { id: toastId });
                onSuccess();
                if (!room) {
                    setFormData({ title: '', description: '', price: '', maxGuests: '', image: '', location: '' });
                    setImageFile(null);
                }
            })
            .catch(err => {
                console.error(err);
                toast.error('Error saving room. Please try again.', { id: toastId });
            });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-brand-gold">
            <h3 className="text-xl font-serif text-brand-dark mb-4">{room ? 'Edit Room' : 'Add New Room'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Room Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
                <input name="location" placeholder="Location (e.g. Shimla)" value={formData.location} onChange={handleChange} className="border p-2 rounded" required />
                <input name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
                <input name="maxGuests" type="number" placeholder="Max Guests" value={formData.maxGuests} onChange={handleChange} className="border p-2 rounded" required />

                {/* Image Upload Input */}
                <div className="border p-2 rounded">
                    <label className="block text-sm text-gray-500 mb-1">Room Image</label>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="w-full" />
                    {formData.image && typeof formData.image === 'string' && (
                        <p className="text-xs text-gray-400 mt-1 truncate">Current: {formData.image}</p>
                    )}
                </div>

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
