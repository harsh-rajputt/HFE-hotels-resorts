import React, { useState, useEffect } from 'react';

export default function AdminGalleryManager() {
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState({ title: '', imageUrl: '', category: 'General' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/gallery`)
            .then(res => res.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(err => console.error('Error fetching images:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewImage(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

        const formData = new FormData();
        formData.append('title', newImage.title);
        formData.append('category', newImage.category);
        if (newImage.file) {
            formData.append('image', newImage.file);
        }

        fetch(`${apiUrl}/gallery`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setImages([data, ...images]);
                setNewImage({ title: '', imageUrl: '', category: 'General', file: null });
                // Reset file input
                e.target.reset();
            })
            .catch(err => console.error('Error adding image:', err));
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/gallery/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    setImages(images.filter(img => img._id !== id));
                }
            })
            .catch(err => console.error('Error deleting image:', err));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Gallery Management</h2>

            {/* Add Image Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-brand-dark">Add New Application Image</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Image Title (Optional)"
                        value={newImage.title}
                        onChange={handleInputChange}
                        className="p-2 border rounded focus:outline-none focus:border-brand-gold"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setNewImage(prev => ({ ...prev, file: e.target.files[0] }))}
                        accept="image/*"
                        required
                        className="p-2 border rounded focus:outline-none focus:border-brand-gold bg-white"
                    />
                    <select
                        name="category"
                        value={newImage.category}
                        onChange={handleInputChange}
                        className="p-2 border rounded focus:outline-none focus:border-brand-gold"
                    >
                        <option value="General">General</option>
                        <option value="Rooms">Rooms</option>
                        <option value="Dining">Dining</option>
                        <option value="Activities">Activities</option>
                    </select>
                </div>
                <button type="submit" className="bg-brand-gold text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors font-medium">
                    Add to Gallery
                </button>
            </form>

            {/* Image List */}
            <h3 className="text-lg font-semibold mb-4 text-brand-dark">Current Images ({images.length})</h3>
            {loading ? (
                <p>Loading gallery...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map(img => (
                        <div key={img._id} className="relative group border rounded-lg overflow-hidden">
                            <img src={img.imageUrl} alt={img.title} className="w-full h-32 object-cover" />
                            <div className="p-2 bg-white text-xs">
                                <p className="font-bold truncate">{img.title || 'Untitled'}</p>
                                <p className="text-gray-500">{img.category}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(img._id)}
                                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                title="Delete Image"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
