import express from 'express';
import Contact from '../models/Contact.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all messages (for admin)
router.get('/', protect, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new message (public endpoint for users to submit form)
router.post('/', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        phone: req.body.phone,
        message: req.body.message
    });

    try {
        const newMessage = await contact.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE message (for admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
