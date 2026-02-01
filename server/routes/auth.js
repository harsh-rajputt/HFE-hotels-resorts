import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Login attempt for:', username);
        // Simple plain text password check for this MVP as requested
        // In production, use bcrypt for hashing
        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', user.username);
        console.log('Password match:', user.password === password);

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return a simple success flag/dummy token
        res.json({ success: true, username: user.username });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Admin (One-time use helper)
router.post('/seed', async (req, res) => {
    try {
        const admin = new User({
            username: 'admin',
            password: 'adminpassword123'
        });
        await admin.save();
        res.json({ message: 'Admin created' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
