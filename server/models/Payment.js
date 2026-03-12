import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer'], required: true },
    transactionId: { type: String }, // For online payments
    status: { type: String, enum: ['Success', 'Failed', 'Pending', 'Refunded'], default: 'Success' },
    paymentDate: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', PaymentSchema);
