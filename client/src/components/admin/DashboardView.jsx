import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
    Users, 
    CalendarCheck, 
    CreditCard, 
    Hotel, 
    TrendingUp,
    Clock
} from 'lucide-react';

export default function DashboardView() {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        totalRooms: 0,
        totalBookings: 0,
        totalRevenue: 0,
        recentBookings: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/dashboard/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif text-brand-dark mb-6">Dashboard Overview</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <Hotel size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Rooms</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalRooms}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <CalendarCheck size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Guests</p>
                        <p className="text-2xl font-bold text-gray-800">{/* Placeholder */} 0</p>
                    </div>
                </div>
            </div>

            {/* Recent Bookings & placeholder for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-brand-dark" /> Revenue Overview
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                        <p className="text-gray-400">Chart visualization will be added here in reports module</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-brand-dark" /> Recent Bookings
                    </h3>
                    
                    {stats.recentBookings && stats.recentBookings.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recentBookings.map((booking) => (
                                <div key={booking._id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-sm">{booking.customer?.name || 'Unknown'}</p>
                                        <p className="text-xs text-gray-500">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-8">No recent bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
