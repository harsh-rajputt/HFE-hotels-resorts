import express from 'express';
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── PUBLIC: Check room availability for given dates (no auth needed) ──────
// GET /api/bookings/check-availability?room=<id>&checkIn=<date>&checkOut=<date>
router.get('/check-availability', asyncHandler(async (req, res) => {
    const { room, checkIn, checkOut } = req.query;

    if (!room || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'room, checkIn and checkOut are required' });
    }

    const conflict = await Booking.findOne({
        room,
        status: { $nin: ['Cancelled'] },
        checkInDate:  { $lt: new Date(checkOut) },
        checkOutDate: { $gt: new Date(checkIn) }
    });

    if (conflict) {
        return res.json({
            available: false,
            bookedFrom: conflict.checkInDate,
            bookedTo:   conflict.checkOutDate
        });
    }

    res.json({ available: true });
}));

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
    const { room, checkInDate, checkOutDate } = req.body;
    const customerId = req.body.customer || req.user.id;

    // ── Duplicate / Overlap Check ──────────────────────────────────────────
    // Block if the same customer already has an active booking for the same
    // room whose dates overlap with the requested period.
    const overlapping = await Booking.findOne({
        customer: customerId,
        room,
        status: { $nin: ['Cancelled'] },          // ignore cancelled bookings
        checkInDate:  { $lt: new Date(checkOutDate) }, // existing check-in  < new check-out
        checkOutDate: { $gt: new Date(checkInDate) }   // existing check-out > new check-in
    });

    if (overlapping) {
        res.status(409);
        throw new Error(
            `You already have a booking for this room from ` +
            `${new Date(overlapping.checkInDate).toLocaleDateString()} to ` +
            `${new Date(overlapping.checkOutDate).toLocaleDateString()}. ` +
            `Please choose different dates.`
        );
    }

    // ── Also check if the room is already booked by ANYONE for these dates ─
    const roomTaken = await Booking.findOne({
        room,
        status: { $nin: ['Cancelled'] },
        checkInDate:  { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) }
    });

    if (roomTaken) {
        res.status(409);
        throw new Error(
            `This room is already booked from ` +
            `${new Date(roomTaken.checkInDate).toLocaleDateString()} to ` +
            `${new Date(roomTaken.checkOutDate).toLocaleDateString()}. ` +
            `Please choose different dates.`
        );
    }

    // ── Create Booking ─────────────────────────────────────────────────────
    const bookingData = {
        ...req.body,
        customer: customerId,
        bookedAt: new Date()   // exact booking timestamp
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
