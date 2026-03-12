import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/admin/AdminSidebar';

// Views
import DashboardView from '../components/admin/DashboardView';
import RoomsManagerView from '../components/admin/RoomsManagerView';
import BookingsManagerView from '../components/admin/BookingsManagerView';
import CustomersManagerView from '../components/admin/CustomersManagerView';
import PaymentsManagerView from '../components/admin/PaymentsManagerView';
import StaffManagerView from '../components/admin/StaffManagerView';
import AdminGalleryManager from '../components/AdminGalleryManager';
import AdminContactManager from '../components/AdminContactManager';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success('Logged out successfully');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView />;
            case 'rooms':
                return <RoomsManagerView />;
            case 'bookings':
                return <BookingsManagerView />;
            case 'customers':
                return <CustomersManagerView />;
            case 'payments':
                return <PaymentsManagerView />;
            case 'staff':
                return <StaffManagerView />;
            case 'gallery':
                return <AdminGalleryManager />;
            case 'messages':
                return <AdminContactManager />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navbar */}
            <Navbar />
            
            {/* Main content with sidebar layout */}
            <div className="flex flex-1 pt-16">
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
                
                {/* Main panel */}
                <main className="flex-1 ml-0 md:ml-64 p-6 overflow-y-auto">
                    {/* Mobile nav indicator */}
                    <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-serif text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h2>
                        <select 
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="p-2 border border-gray-200 rounded text-sm outline-none"
                        >
                            <option value="dashboard">Dashboard</option>
                            <option value="rooms">Rooms</option>
                            <option value="bookings">Bookings</option>
                            <option value="customers">Customers</option>
                            <option value="payments">Payments</option>
                            <option value="staff">Staff</option>
                            <option value="gallery">Gallery</option>
                            <option value="messages">Messages</option>
                        </select>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}
