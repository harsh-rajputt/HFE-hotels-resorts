import express from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/dashboard/stats
// Get overview statistics for the admin dashboard
router.get('/stats', protect, asyncHandler(async (req, res) => {
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    
    // Calculate total revenue from successful payments
    const payments = await Payment.find({ status: 'Success' });
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('customer', 'name');

    res.json({
        totalRooms,
        totalBookings,
        totalRevenue,
        recentBookings
    });
}));

export default router;
