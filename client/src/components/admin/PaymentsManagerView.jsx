import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Printer } from 'lucide-react';

export default function PaymentsManagerView() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/payments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setPayments(await res.json());
            } else {
                toast.error('Failed to load payments');
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            toast.error('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleRefund = async (paymentId) => {
        if (!window.confirm('Are you sure you want to process a refund for this transaction? This action cannot be fully undone.')) return;
        
        const toastId = toast.loading('Processing refund via gateway...');
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/payments/refund/${paymentId}`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });

            if (res.ok) {
                toast.success('Refund processed successfully', { id: toastId });
                fetchPayments();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Failed to refund', { id: toastId });
            }
        } catch (error) {
            toast.error('Server connection error', { id: toastId });
        }
    };

    const handlePrintInvoice = (payment) => {
        // Create a printable window
        const printWindow = window.open('', '_blank');
        const invoiceHtml = `
            <html>
                <head>
                    <title>Invoice - ${payment.transactionId}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; }
                        h1 { color: #1a365d; }
                        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; }
                        .details { margin-bottom: 40px; }
                        table { w-full: 100%; border-collapse: collapse; margin-top: 20px; width: 100%; }
                        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; }
                        th { background-color: #f8fafc; color: #475569; }
                        .total { text-align: right; margin-top: 20px; font-size: 1.25rem; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <h1>HFE Hotels & Resorts</h1>
                            <p>GSTIN: 22AAAAA0000A1Z5</p>
                        </div>
                        <div style="text-align: right;">
                            <h2>INVOICE</h2>
                            <p><strong>Date:</strong> ${new Date(payment.paymentDate).toLocaleDateString()}</p>
                            <p><strong>Txn ID:</strong> ${payment.transactionId}</p>
                        </div>
                    </div>
                    <div class="details">
                        <h3>Bill To:</h3>
                        <p><strong>Name:</strong> ${payment.customer?.name || 'N/A'}</p>
                        <p><strong>Email:</strong> ${payment.customer?.email || 'N/A'}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th style="text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Room Booking - ${payment.booking?.room?.title || 'Unknown Room'}</td>
                                <td>${payment.paymentMethod}</td>
                                <td>${payment.status}</td>
                                <td style="text-align: right;">₹${payment.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="total">
                        <p>Total Paid: ₹${payment.amount}</p>
                    </div>
                    <p style="margin-top: 50px; text-align: center; color: #64748b; font-size: 0.875rem;">Thank you for your business. This is a computer-generated invoice.</p>
                </body>
                <script>
                    window.onload = () => { window.print(); window.close(); }
                </script>
            </html>
        `;
        printWindow.document.write(invoiceHtml);
        printWindow.document.close();
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Success': return 'bg-green-100 text-green-800';
            case 'Refunded': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            case 'Pending':
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-brand-dark">Payment Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Track transactions, process refunds, and generate booking invoices.</p>
                </div>
            </div>

            <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                {loading ? (
                    <div className="text-center py-10">Loading payments...</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID & Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-brand-dark">{payment.transactionId || 'Manual Entry'}</div>
                                        <div className="text-sm text-gray-500">{new Date(payment.paymentDate).toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{payment.customer?.name || 'Deleted User'}</div>
                                        <div className="text-xs text-gray-500">Booking ID: {payment.booking?._id?.substring(0, 8) || 'N/A'}...</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium border">
                                            {payment.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        ₹{payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handlePrintInvoice(payment)} 
                                                className="text-brand-teal hover:text-brand-dark flex items-center gap-1"
                                                title="Print Invoice"
                                            >
                                                <Printer size={16} /> Print
                                            </button>
                                            
                                            {payment.status === 'Success' && (
                                                <button 
                                                    onClick={() => handleRefund(payment._id)} 
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    Refund
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No payment history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
