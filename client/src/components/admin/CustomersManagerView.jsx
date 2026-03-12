import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Edit, Trash2 } from 'lucide-react';

export default function CustomersManagerView() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        idProofType: '',
        idProofNumber: '',
        password: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/customers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setCustomers(await res.json());
            } else {
                toast.error('Failed to load customers');
            }
        } catch (error) {
            console.error(error);
            toast.error('Connection error while fetching customers');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleEdit = (customer) => {
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address || '',
            idProofType: customer.idProofType || '',
            idProofNumber: customer.idProofNumber || '',
            password: '' // Keep empty, don't update unless typed (if backend handles it like that, else we might not send it)
        });
        setEditingId(customer._id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', address: '', idProofType: '', idProofNumber: '', password: '' });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading(editingId ? 'Updating customer...' : 'Adding new customer...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const url = editingId ? `${apiUrl}/customers/${editingId}` : `${apiUrl}/customers`;
            const method = editingId ? 'PUT' : 'POST';

            // Filter out empty password if updating, to avoid overwriting with blank
            const payload = { ...formData };
            if (editingId && !payload.password) {
                delete payload.password;
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    // If creating new, backend /auth/register should ideally be used for hashing.
                    // But we'll try saving directly if the route handles it. 
                    // Wait, our /api/customers POST route simply saves the model. It won't hash the password. 
                    // For safety, let's just send what we have, but warn admin. 
                    ...payload
                })
            });

            if (res.ok) {
                toast.success(editingId ? 'Customer Profile Updated!' : 'Customer Created!', { id: toastId });
                resetForm();
                fetchCustomers();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Failed to apply changes', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('WARNING: Deleting this customer may negatively impact existing ledger entries for their bookings. Are you completely sure?')) return;
        
        const toastId = toast.loading('Deleting customer...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/customers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Customer Deleted', { id: toastId });
                fetchCustomers();
            } else {
                toast.error('Failed to delete', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-brand-dark">Customer Database</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage all registered guests, view contact info, and update ID proofs.</p>
                </div>
                {/* Notice: Creating directly from admin panel is hidden as self-registration handles secure password hashing. 
                    However, we still give the form to easily update Addresses and ID proofs for walk-ins! */}
            </div>

            {/* Editor Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-brand-teal">
                    <h3 className="text-xl font-serif text-brand-dark mb-4">Edit Customer Profile</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div className="lg:col-span-3">
                            <label className="block text-sm text-gray-500 mb-1">Address</label>
                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Full residential address" className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">ID Proof Type</label>
                            <select name="idProofType" value={formData.idProofType} onChange={handleChange} className="w-full border p-2 rounded">
                                <option value="">Select ID type...</option>
                                <option value="Aadhar Card">Aadhar Card</option>
                                <option value="Passport">Passport</option>
                                <option value="Driving License">Driving License</option>
                                <option value="Voter ID">Voter ID</option>
                                <option value="PAN Card">PAN Card</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">ID Document Number</label>
                            <input name="idProofNumber" value={formData.idProofNumber} onChange={handleChange} placeholder="e.g. A23908492" className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                        <button type="submit" className="bg-brand-teal text-white px-6 py-2 rounded hover:bg-brand-dark transition-colors font-bold">
                            Update Profile
                        </button>
                        <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors font-bold">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Customers Table */}
            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading customer database...</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identity Document</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map(customer => (
                                <tr key={customer._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-brand-dark">{customer.name}</div>
                                        <div className="text-xs text-gray-400">ID: {customer._id.substring(customer._id.length - 6)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{customer.email}</div>
                                        <div className="text-sm text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.idProofType ? (
                                            <div>
                                                <span className="font-semibold">{customer.idProofType}</span>
                                                <div className="text-xs uppercase mt-1">{customer.idProofNumber}</div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">Not Provided</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(customer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleEdit(customer)} 
                                                className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                                                title="Edit Profile"
                                            >
                                                <Edit size={16} /> <span className="hidden lg:inline">Edit</span>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(customer._id)} 
                                                className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                                title="Delete Profile"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No customers found in the database.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
