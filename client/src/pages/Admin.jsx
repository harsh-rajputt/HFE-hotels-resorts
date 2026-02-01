import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RoomForm from '../components/RoomForm';
import AdminGalleryManager from '../components/AdminGalleryManager';

export default function Admin() {
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);

    const fetchRooms = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/rooms`)
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            fetch(`${apiUrl}/rooms/${id}`, { method: 'DELETE' })
                .then(() => fetchRooms())
                .catch(err => console.error(err));
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        window.scrollTo(0, 0);
    };

    const handleSuccess = () => {
        setEditingRoom(null);
        fetchRooms();
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-brand-sand">
            <Navbar />
            <div className="pt-24 container mx-auto px-4 pb-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif text-brand-dark flex-grow text-center">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* Gallery Management Section */}
                <AdminGalleryManager />

                <RoomForm
                    room={editingRoom}
                    onSuccess={handleSuccess}
                    onCancel={editingRoom ? () => setEditingRoom(null) : null}
                />

                <h2 className="text-2xl font-serif text-brand-dark mb-6">Manage Rooms</h2>
                <div className="grid gap-4">
                    {rooms.map(room => (
                        <div key={room._id} className="bg-white p-4 shadow flex justify-between items-center rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <img src={room.image} alt={room.title} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-serif text-lg font-bold">{room.title}</h3>
                                    <p className="text-sm text-gray-500">{room.location} • ₹{room.price}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(room)} className="text-brand-teal hover:text-brand-dark px-3 py-1 font-medium">Edit</button>
                                <button onClick={() => handleDelete(room._id)} className="text-red-500 hover:text-red-700 px-3 py-1 font-medium">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
