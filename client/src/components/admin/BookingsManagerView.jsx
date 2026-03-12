import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function BookingsManagerView() {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [customers, setCustomers] = useState([]);
    
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        customer: '',
        room: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        totalAmount: '',
        status: 'Pending',
        paymentStatus: 'Unpaid'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const headers = { 'Authorization': `Bearer ${token}` };

            const [bookingsRes, roomsRes, customersRes] = await Promise.all([
                fetch(`${apiUrl}/bookings`, { headers }),
                fetch(`${apiUrl}/rooms`), // Public route
                fetch(`${apiUrl}/customers`, { headers })
            ]);

            if (bookingsRes.ok) setBookings(await bookingsRes.json());
            if (roomsRes.ok) setRooms(await roomsRes.json());
            if (customersRes.ok) setCustomers(await customersRes.json());

        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating booking...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success('Booking created successfully!', { id: toastId });
                setShowForm(false);
                setFormData({
                    customer: '', room: '', checkInDate: '', checkOutDate: '',
                    guests: 1, totalAmount: '', status: 'Pending', paymentStatus: 'Unpaid'
                });
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Failed to create booking', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    const updateStatus = async (bookingId, newStatus) => {
        if (!window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;
        
        const toastId = toast.loading(`Updating status to ${newStatus}...`);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success(`Booking ${newStatus}`, { id: toastId });
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Failed to update', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-800';
            case 'Checked-in': return 'bg-green-100 text-green-800';
            case 'Checked-out': return 'bg-gray-100 text-gray-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Pending':
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-brand-dark">Manage Bookings</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-brand-gold text-white px-4 py-2 rounded hover:bg-brand-dark transition-colors font-medium"
                >
                    {showForm ? 'Cancel Form' : '+ Create Booking'}
                </button>
            </div>

            {/* Create Booking Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-brand-gold">
                    <h3 className="text-xl font-serif text-brand-dark mb-4">New Booking Request</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Customer</label>
                            <select name="customer" value={formData.customer} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select Customer...</option>
                                {customers.map(c => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Room</label>
                            <select name="room" value={formData.room} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select Room...</option>
                                {rooms.map(r => <option key={r._id} value={r._id}>{r.roomNumber ? `No. ${r.roomNumber} - ` : ''}{r.title} (₹{r.price}/night)</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Check-in Date</label>
                            <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Check-out Date</label>
                            <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Total Amount (₹)</label>
                            <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Guests</label>
                            <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Booking Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Checked-in">Checked-in</option>
                                <option value="Checked-out">Checked-out</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Payment Status</label>
                            <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Partial">Partial</option>
                                <option value="Paid">Paid</option>
                                <option value="Refunded">Refunded</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-brand-teal text-white px-6 py-2 rounded hover:bg-brand-dark transition-colors font-bold">
                        Save Booking
                    </button>
                </form>
            )}

            {/* Bookings Table */}
            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                {loading ? (
                    <div className="text-center py-10">Loading bookings...</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest & Room</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-brand-dark">{booking.customer?.name || 'Unknown'}</div>
                                        <div className="text-sm text-gray-500">{booking.room?.title} {booking.room?.roomNumber ? `(No. ${booking.room.roomNumber})` : ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">In: {new Date(booking.checkInDate).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-500">Out: {new Date(booking.checkOutDate).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ₹{booking.totalAmount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex flex-col space-y-2">
                                            {booking.status === 'Confirmed' && (
                                                <button onClick={() => updateStatus(booking._id, 'Checked-in')} className="text-brand-teal hover:text-brand-dark text-left">Set Checked-in</button>
                                            )}
                                            {booking.status === 'Checked-in' && (
                                                <button onClick={() => updateStatus(booking._id, 'Checked-out')} className="text-brand-teal hover:text-brand-dark text-left">Set Checked-out</button>
                                            )}
                                            {booking.status === 'Pending' && (
                                                <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="text-brand-teal hover:text-brand-dark text-left">Confirm</button>
                                            )}
                                            {booking.status !== 'Cancelled' && booking.status !== 'Checked-out' && (
                                                <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="text-red-500 hover:text-red-700 text-left">Cancel</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No booking history available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
