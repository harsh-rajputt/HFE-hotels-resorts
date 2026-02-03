import express from 'express';
import Room from '../models/Room.js';
import upload from '../config/cloudinary.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all rooms
router.get('/', async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new room (admin)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const roomData = req.body;
        if (req.file) {
            roomData.image = req.file.path;
        }

        const room = new Room(roomData);
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a room
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const roomData = req.body;
        if (req.file) {
            roomData.image = req.file.path;
        }

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, roomData, { new: true });
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a room
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
