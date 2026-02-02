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

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const method = room ? 'PUT' : 'POST';
        const url = room ? `${apiUrl}/rooms/${room._id}` : `${apiUrl}/rooms`;

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('maxGuests', formData.maxGuests);
        data.append('location', formData.location);
        // Only append image if a file is selected or if we want to preserve the existing one (though backend handles preservation if no file sent)
        // Actually, for file upload, we usually only send 'image' if there's a new file.
        // But if it's a string (URL) from existing room, we might want to send it?
        // Our backend logic: if (req.file) update image.
        // If we don't send image field, it won't be updated.
        // But for POST, we need an image.
        if (imageFile) {
            data.append('image', imageFile);
        } else if (formData.image && typeof formData.image === 'string') {
            // If it's a URL (existing image), we can send it as text, but multer might ignore it if it expects a file for 'image' field?
            // Actually, multer processes 'image' field. If it's not a file, req.file is undefined.
            // But verify if backend accepts body.image if req.file is missing.
            // My backend code: if (req.file) roomData.image = req.file.path.
            // It also takes `const roomData = req.body;`.
            // So if I append `image` as string to FormData, it will be in req.body.image.
            data.append('image', formData.image);
        }

        fetch(url, {
            method,
            body: data
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save room');
                return res.json();
            })
            .then(data => {
                onSuccess();
                if (!room) {
                    setFormData({ title: '', description: '', price: '', maxGuests: '', image: '', location: '' });
                    setImageFile(null);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error saving room. Please try again.');
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
