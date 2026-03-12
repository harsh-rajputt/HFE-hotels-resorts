import express from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room.js';
import upload from '../config/cloudinary.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

import Booking from '../models/Booking.js';

// GET all rooms (with optional availability filtering)
router.get('/', asyncHandler(async (req, res) => {
    const { checkIn, checkOut, location, category } = req.query;
    
    // Base filter
    let filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (category) filter.category = category;

    // Filter unavailable rooms if dates are provided
    if (checkIn && checkOut) {
        // Find existing bookings that overlap with requested dates
        const overlappingBookings = await Booking.find({
            status: { $nin: ['Cancelled'] },
            $or: [
                { checkInDate: { $lte: new Date(checkOut) }, checkOutDate: { $gte: new Date(checkIn) } }
            ]
        });

        const bookedRoomIds = overlappingBookings.map(b => b.room);
        filter._id = { $nin: bookedRoomIds };
    }

    let rooms = await Room.find(filter);

    // If no rooms overall, we seed mock data only if no query params to avoid seeding during a search
    if (rooms.length === 0 && Object.keys(req.query).length === 0) {
        const mockRooms = [
            {
                title: 'Luxury Suite Shimla',
                description: 'Experience the mountains in comfort.',
                price: 5000,
                maxGuests: 4,
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop',
                location: 'Shimla',
                category: 'Suite',
                roomNumber: '101',
                status: 'Available'
            },
            {
                title: 'River View Camp Rishikesh',
                description: 'Adventure awaits by the river.',
                price: 3000,
                maxGuests: 2,
                image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
                location: 'Rishikesh',
                category: 'Single',
                roomNumber: '102',
                status: 'Available'
            }
        ];
        rooms = await Room.insertMany(mockRooms);
    }
    
    res.json(rooms);
}));

// GET single room
router.get('/:id', asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
        res.status(404);
        throw new Error('Room not found');
    }
    res.json(room);
}));

// POST a new room (admin)
router.post('/', verifyToken, upload.single('image'), asyncHandler(async (req, res) => {
    const { title, price, location } = req.body;

    // Basic Validation
    if (!title || !price || !location) {
        res.status(400);
        throw new Error('Please provide title, price, and location');
    }

    const roomData = req.body;
    if (req.file) {
        roomData.image = req.file.path;
    }

    const room = new Room(roomData);
    const newRoom = await room.save();
    res.status(201).json(newRoom);
}));

// PUT (Update) a room
router.put('/:id', verifyToken, upload.single('image'), asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
        res.status(404);
        throw new Error('Room not found');
    }

    const roomData = req.body;
    if (req.file) {
        roomData.image = req.file.path;
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, roomData, { new: true });
    res.json(updatedRoom);
}));

// DELETE a room
router.delete('/:id', verifyToken, asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
        res.status(404);
        throw new Error('Room not found');
    }

    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
}));

export default router;
