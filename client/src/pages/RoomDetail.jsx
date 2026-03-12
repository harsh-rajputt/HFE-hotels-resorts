import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star } from 'lucide-react';

export default function RoomDetail() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Booking Form State
    const [bookingData, setBookingData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1
    });

    // Review Form State
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    const { user, token, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchRoomDetails();
        fetchReviews();
    }, [id]);

    const fetchRoomDetails = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/rooms/${id}`);
            if (res.ok) {
                setRoom(await res.json());
            } else {
                toast.error('Room not found');
                navigate('/rooms');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/reviews/room/${id}`);
            if (res.ok) {
                setReviews(await res.json());
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleBookingChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const calculateTotal = () => {
        if (!bookingData.checkInDate || !bookingData.checkOutDate || !room) return 0;
        const start = new Date(bookingData.checkInDate);
        const end = new Date(bookingData.checkOutDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays > 0 ? diffDays : 1) * room.price;
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please login to book a room');
            navigate('/user-auth', { state: { from: { pathname: `/rooms/${id}` } } });
            return;
        }

        const totalAmount = calculateTotal();
        const toastId = toast.loading('Processing booking & payment...');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            
            // 1. Create Booking as Pending
            const bookingRes = await fetch(`${apiUrl}/bookings`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    room: id,
                    customer: user._id, // Assumes user object has _id
                    checkInDate: bookingData.checkInDate,
                    checkOutDate: bookingData.checkOutDate,
                    guests: bookingData.guests,
                    totalAmount,
                    status: 'Pending',
                    paymentStatus: 'Unpaid'
                })
            });

            if (!bookingRes.ok) throw new Error('Booking failed');
            const newBooking = await bookingRes.json();

            // 2. Obtain Stripe Session (or Mock Session)
            const paymentRes = await fetch(`${apiUrl}/payments/create-checkout-session`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingId: newBooking._id,
                    amount: totalAmount,
                    paymentMethod: 'Credit Card'
                })
            });

            if (!paymentRes.ok) throw new Error('Payment sessions failed');
            const sessionData = await paymentRes.json();

            toast.success('Redirecting to secure gateway...', { id: toastId });
            
            // Redirect the user to Stripe Checkout (or our mock dashboard fallback)
            window.location.href = sessionData.url;

        } catch (error) {
            toast.error('Transaction Failed. Try again.', { id: toastId });
            console.error(error);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return toast.error('Login to post a review');
        
        const toastId = toast.loading('Posting review...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/reviews`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    room: id,
                    rating: reviewData.rating,
                    comment: reviewData.comment
                })
            });

            if (res.ok) {
                toast.success('Review posted!', { id: toastId });
                setReviewData({ rating: 5, comment: '' });
                fetchReviews();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Could not post review', { id: toastId });
            }
        } catch (error) {
            toast.error('Error posting review', { id: toastId });
        }
    };

    if (loading) return <div className="text-center py-20 min-h-screen">Loading room details...</div>;
    if (!room) return <div className="text-center py-20 min-h-screen">Room not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="h-24 md:h-32"></div>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row mb-12">
                    {/* Image Section */}
                    <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                        <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-serif text-brand-dark font-bold">{room.title}</h1>
                                <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {room.category || 'Deluxe'}
                                </span>
                            </div>
                            <p className="text-brand-dark font-medium mb-6 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {room.location}
                            </p>
                            <p className="text-gray-600 mb-6">{room.description}</p>
                            
                            <hr className="my-6 border-gray-100" />
                            
                            <div className="text-2xl font-bold text-gray-800 mb-6">
                                ₹{room.price} <span className="text-sm text-gray-500 font-normal">/ night</span>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBooking} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4">Book this Room</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Check-in</label>
                                    <input type="date" name="checkInDate" required min={new Date().toISOString().split('T')[0]} value={bookingData.checkInDate} onChange={handleBookingChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Check-out</label>
                                    <input type="date" name="checkOutDate" required min={bookingData.checkInDate || new Date().toISOString().split('T')[0]} value={bookingData.checkOutDate} onChange={handleBookingChange} className="w-full p-2 border rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-500 mb-1">Guests (Max {room.maxGuests})</label>
                                    <input type="number" name="guests" min="1" max={room.maxGuests} value={bookingData.guests} onChange={handleBookingChange} className="w-full p-2 border rounded" required />
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-4 text-sm font-bold text-gray-700">
                                <span>Total Estimate:</span>
                                <span>₹{calculateTotal()}</span>
                            </div>

                            <button type="submit" className="w-full bg-brand-dark hover:bg-brand-gold text-white py-3 rounded uppercase font-bold transition-colors">
                                Pay & Book Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-serif text-brand-dark mb-6 border-b pb-2">Guest Reviews</h2>
                    
                    {/* Add Review */}
                    {isAuthenticated && user?.role === 'customer' ? (
                        <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">Write a Review</h4>
                            <div className="flex gap-2 mb-4 items-center">
                                <label className="text-sm font-medium mr-2">Rating:</label>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                        key={star} 
                                        size={24} 
                                        className={`cursor-pointer transition-colors hover:scale-110 ${star <= reviewData.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`}
                                        onClick={() => setReviewData({...reviewData, rating: star})}
                                    />
                                ))}
                            </div>
                            <textarea 
                                value={reviewData.comment} 
                                onChange={(e) => setReviewData({...reviewData, comment: e.target.value})} 
                                placeholder="Share your experience..." 
                                className="w-full p-3 border rounded mb-3" 
                                rows="3" 
                                required 
                            />
                            <button type="submit" className="bg-brand-gold text-white px-6 py-2 rounded font-medium hover:bg-brand-dark transition-colors">Submit Review</button>
                        </form>
                    ) : (
                        <p className="text-sm text-gray-500 mb-8 italic">Please log in as a customer to write a review.</p>
                    )}

                    {/* Review List */}
                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold">
                                        {review.customer?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{review.customer?.name || 'Anonymous'}</p>
                                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="ml-auto flex text-brand-gold gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                        )) : (
                            <p className="text-gray-500">No reviews yet for this room. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
