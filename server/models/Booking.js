import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Unpaid', 'Partial', 'Paid', 'Refunded'], default: 'Unpaid' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
