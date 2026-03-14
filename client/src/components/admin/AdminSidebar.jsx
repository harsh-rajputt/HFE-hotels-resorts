import React from 'react';
import { 
    LayoutDashboard, 
    Home, 
    CalendarCheck, 
    Users, 
    CreditCard, 
    UserCog, 
    MessageSquare,
    Image as ImageIcon,
    LogOut
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'rooms', label: 'Rooms & Categories', icon: Home },
        { id: 'bookings', label: 'Bookings & Calendar', icon: CalendarCheck },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'staff', label: 'Staff Management', icon: UserCog },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'messages', label: 'Messages', icon: MessageSquare }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-96px)] fixed left-0 top-24 overflow-y-auto hidden md:flex flex-col z-40">
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold font-serif text-brand-dark">Admin Panel</h2>
            </div>
            
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                            activeTab === item.id 
                            ? 'bg-brand-gold bg-opacity-10 text-brand-gold font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t mt-auto">
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
