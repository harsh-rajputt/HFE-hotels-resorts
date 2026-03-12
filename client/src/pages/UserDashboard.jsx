import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'customer') {
            navigate('/user-auth', { replace: true });
            return;
        }

        const queryParams = new URLSearchParams(location.search);
        const paymentStatus = queryParams.get('payment');
        const txnId = queryParams.get('txnId');

        if (paymentStatus === 'success' && txnId) {
            confirmPayment(txnId);
        } else {
            fetchMyBookings();
        }
    }, [isAuthenticated, user, navigate, token, location.search]);

    const confirmPayment = async (txnId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/payments/confirm`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ transactionId: txnId })
            });
            if (res.ok) {
                toast.success('Payment successfully processed!');
                // Remove query params to prevent re-triggering on refresh
                navigate('/user-dashboard', { replace: true });
            } else {
                toast.error('Payment confirmation struggled. Please contact support.');
            }
        } catch (error) {
            console.error('Confirm error', error);
        } finally {
            fetchMyBookings();
        }
    };

    const fetchMyBookings = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/bookings/mybookings`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setBookings(await res.json());
            } else {
                toast.error('Failed to load bookings');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;

        const toastId = toast.loading('Cancelling booking...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            // Technically in a real app, this should calculate refunds and just update status to 'Cancelled'
            // rather than completely deleting it. Here, we update the status.
            const res = await fetch(`${apiUrl}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ status: 'Cancelled' })
            });

            if (res.ok) {
                toast.success('Booking Cancelled Successfully', { id: toastId });
                fetchMyBookings();
            } else {
                toast.error('Failed to cancel booking', { id: toastId });
            }
        } catch (error) {
            toast.error('Error connecting to server', { id: toastId });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    if (loading) return <div className="text-center py-20 min-h-screen">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="h-24 md:h-32"></div>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div>
                            <h1 className="text-3xl font-serif text-brand-dark font-bold">Welcome, {user?.name || 'Guest'}</h1>
                            <p className="text-gray-600 font-medium">Manage your bookings and profile</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 px-4 py-2 hover:bg-red-100 rounded transition-colors font-bold"
                        >
                            Log Out
                        </button>
                    </div>

                    <h2 className="text-2xl font-serif text-brand-dark mb-6">Booking History</h2>
                    
                    {bookings.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p className="text-gray-500 mb-4">You have no booking history.</p>
                            <button 
                                onClick={() => navigate('/rooms')}
                                className="bg-brand-gold text-white px-6 py-2 rounded uppercase tracking-wider font-bold hover:bg-brand-dark transition-colors"
                            >
                                Browse Rooms
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <div key={booking._id} className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:shadow-md transition-shadow">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="font-bold text-lg text-brand-dark">{booking.room?.title || 'Room Unavailable'}</h3>
                                        <p className="text-sm text-gray-500 mb-1">
                                            <strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()} | <strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Guests:</strong> {booking.guests} | <strong>Total Amount:</strong> ₹{booking.totalAmount}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                                                booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                Status: {booking.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                                                booking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-800' : 
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                Payment: {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => navigate(`/rooms/${booking.room?._id}`)}
                                            className="text-brand-teal hover:text-brand-dark px-4 py-2 bg-teal-50 rounded font-bold text-sm"
                                        >
                                            View Room
                                        </button>
                                        {booking.status !== 'Cancelled' && (
                                            <button 
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="text-red-500 hover:text-red-700 px-4 py-2 bg-red-50 rounded font-bold text-sm"
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
