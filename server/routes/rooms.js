import express from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room.js';
import upload from '../config/cloudinary.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all rooms
router.get('/', asyncHandler(async (req, res) => {
    let rooms = await Room.find();
    // If no rooms, seed mock data validly into DB so they have real IDs
    if (rooms.length === 0) {
        const mockRooms = [
            {
                title: 'Luxury Suite Shimla',
                description: 'Experience the mountains in comfort.',
                price: 5000,
                maxGuests: 4,
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop',
                location: 'Shimla'
            },
            {
                title: 'River View Camp Rishikesh',
                description: 'Adventure awaits by the river.',
                price: 3000,
                maxGuests: 2,
                image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
                location: 'Rishikesh'
            }
        ];
        rooms = await Room.insertMany(mockRooms);
    }
    res.json(rooms);
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
