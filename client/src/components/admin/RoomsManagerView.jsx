import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import RoomForm from '../RoomForm';

export default function RoomsManagerView() {
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);
    const { token } = useAuth();

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
            const toastId = toast.loading('Deleting room...');

            fetch(`${apiUrl}/rooms/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to delete');
                    return res.json();
                })
                .then(() => {
                    toast.success('Room deleted successfully', { id: toastId });
                    fetchRooms();
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Failed to delete room', { id: toastId });
                });
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

    return (
        <div className="space-y-6">
            <RoomForm
                key={editingRoom?._id || 'new'}
                room={editingRoom}
                onSuccess={handleSuccess}
                onCancel={editingRoom ? () => setEditingRoom(null) : null}
            />

            <div>
                <h2 className="text-2xl font-serif text-brand-dark mb-6">Manage Rooms</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rooms.map(room => (
                                <tr key={room._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {room.roomNumber || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {room.category || 'Deluxe'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ₹{room.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            room.status === 'Available' ? 'bg-green-100 text-green-800' :
                                            room.status === 'Booked' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {room.status || 'Available'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(room)} className="text-brand-teal hover:text-brand-dark mr-4">Edit</button>
                                        <button onClick={() => handleDelete(room._id)} className="text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {rooms.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No rooms found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
