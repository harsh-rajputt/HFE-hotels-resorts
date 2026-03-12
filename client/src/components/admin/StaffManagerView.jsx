import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Edit, Trash2 } from 'lucide-react';

export default function StaffManagerView() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        role: 'Cleaner',
        phone: '',
        email: '',
        shift: 'Morning',
        salary: '',
        status: 'Active'
    });

    const [attendanceData, setAttendanceData] = useState({
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
        remarks: ''
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/staff`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setStaff(await res.json());
        } catch (error) {
            toast.error('Failed to load staff data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleAttendanceChange = (e) => setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });

    const resetForm = () => {
        setFormData({ name: '', role: 'Cleaner', phone: '', email: '', shift: 'Morning', salary: '', status: 'Active' });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name, role: member.role, phone: member.phone, email: member.email || '',
            shift: member.shift, salary: member.salary || '', status: member.status
        });
        setEditingId(member._id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading(editingId ? 'Updating staff...' : 'Adding staff...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const url = editingId ? `${apiUrl}/staff/${editingId}` : `${apiUrl}/staff`;
            const method = editingId ? 'PUT' : 'POST';

            const payload = { ...formData, salary: Number(formData.salary) };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success(editingId ? 'Staff updated' : 'Staff added', { id: toastId });
                resetForm();
                fetchStaff();
            } else {
                toast.error('Failed to save staff', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;
        const toastId = toast.loading('Deleting...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/staff/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Deleted', { id: toastId });
                fetchStaff();
            } else {
                toast.error('Failed to delete', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    const openAttendance = (member) => {
        setSelectedStaff(member);
        setShowAttendanceModal(true);
        setAttendanceData({ date: new Date().toISOString().split('T')[0], status: 'Present', remarks: '' });
    };

    const submitAttendance = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Marking attendance...');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/staff/${selectedStaff._id}/attendance`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(attendanceData)
            });

            if (res.ok) {
                toast.success('Attendance marked', { id: toastId });
                setShowAttendanceModal(false);
                fetchStaff(); // refresh to show updated records
            } else {
                toast.error('Failed to mark attendance', { id: toastId });
            }
        } catch (err) {
            toast.error('Connection error', { id: toastId });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-brand-dark">Staff Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage personnel, salaries, shifts, and attendance.</p>
                </div>
                <button 
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-brand-gold text-white px-4 py-2 rounded hover:bg-brand-dark transition-colors font-medium"
                >
                    {showForm ? 'Close Form' : '+ Add Staff'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-brand-teal">
                    <h3 className="text-xl font-serif text-brand-dark mb-4">{editingId ? 'Edit Staff Member' : 'New Staff Registration'}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="Manager">Manager</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Cleaner">Cleaner</option>
                                <option value="Admin">Admin</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9876543210" className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@hotel.com" className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Shift</label>
                            <select name="shift" value={formData.shift} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="Morning">Morning (6 AM - 2 PM)</option>
                                <option value="Evening">Evening (2 PM - 10 PM)</option>
                                <option value="Night">Night (10 PM - 6 AM)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Monthly Salary (₹)</label>
                            <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="e.g. 25000" className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Employment Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                        <button type="submit" className="bg-brand-teal text-white px-6 py-2 rounded hover:bg-brand-dark transition-colors font-bold">
                            {editingId ? 'Update Record' : 'Save Staff Record'}
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading personnel records...</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Shift</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {staff.map(member => (
                                <tr key={member._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                        <div className="text-sm text-gray-500">{member.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-semibold">{member.role}</div>
                                        <div className="text-xs text-gray-500">{member.shift} Shift</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹{member.salary?.toLocaleString() || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            member.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            member.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => openAttendance(member)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1" title="Mark Attendance">
                                                <Calendar size={16} /> <span className="hidden lg:inline">Attendance</span>
                                            </button>
                                            <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1" title="Edit">
                                                <Edit size={16} /> <span className="hidden lg:inline">Edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(member._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {staff.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No staff members assigned.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Attendance Modal */}
            {showAttendanceModal && selectedStaff && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-serif text-brand-dark mb-1">Mark Attendance</h3>
                        <p className="text-gray-500 text-sm mb-4">Employee: <span className="font-bold text-gray-800">{selectedStaff.name}</span></p>
                        
                        <form onSubmit={submitAttendance} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input type="date" name="date" value={attendanceData.date} onChange={handleAttendanceChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" value={attendanceData.status} onChange={handleAttendanceChange} className="w-full border p-2 rounded" required>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Late">Late</option>
                                    <option value="Half-day">Half-day</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                                <input name="remarks" value={attendanceData.remarks} onChange={handleAttendanceChange} placeholder="e.g. Arrived 2 hours late" className="w-full border p-2 rounded" />
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <button type="submit" className="flex-1 bg-brand-teal text-white py-2 rounded hover:bg-brand-dark font-medium transition-colors">Save</button>
                                <button type="button" onClick={() => setShowAttendanceModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
