import React, { useEffect, useState } from 'react';

export default function AdminContactManager() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/contact`)
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            })
            .catch(err => console.error('Error fetching messages:', err));
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/contact/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    setMessages(messages.filter(msg => msg._id !== id));
                }
            })
            .catch(err => console.error('Error deleting message:', err));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Messages Support</h2>

            {loading ? (
                <p>Loading messages...</p>
            ) : messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Subject</th>
                                <th className="py-3 px-4 text-left">Message</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {messages.map(msg => (
                                <tr key={msg._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        <p className="font-medium">{msg.name}</p>
                                        <p className="text-gray-500 text-xs">{msg.email}</p>
                                        <p className="text-gray-500 text-xs">{msg.phone}</p>
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium">{msg.subject}</td>
                                    <td className="py-3 px-4 text-sm max-w-xs truncate" title={msg.message}>
                                        {msg.message}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
