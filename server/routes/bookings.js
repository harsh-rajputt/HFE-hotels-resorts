import express from 'express';
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mybookings', protect, asyncHandler(async (req, res) => {
    // req.user.id is populated from verifyToken
    console.log('Fetching bookings for customer:', req.user.id);
    const bookings = await Booking.find({ customer: req.user.id })
        .populate('room')
        .sort({ createdAt: -1 });
    res.json(bookings);
}));

router.get('/', protect, asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate('customer').populate('room').sort({ createdAt: -1 });
    res.json(bookings);
}));

router.post('/', protect, asyncHandler(async (req, res) => {
    // If not provided in body, use authenticated user id
    const bookingData = { 
        ...req.body, 
        customer: req.body.customer || req.user.id 
    };
    const booking = new Booking(bookingData);
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
}));

router.put('/:id', protect, asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        Object.assign(booking, req.body);
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
}));

router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        await booking.deleteOne();
        res.json({ message: 'Booking removed' });
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
}));

export default router;
