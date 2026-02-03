import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Login attempt for:', username);

        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || 'dev_secret_key_123',
            { expiresIn: '1d' }
        );

        console.log('Login successful for:', username);

        res.json({
            success: true,
            username: user.username,
            token
        });

    } catch (err) {
        console.error('LOGIN ERROR:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Seed Admin (Updated to hash password)
router.post('/seed', async (req, res) => {
    try {
        // Check if admin already exists to prevent duplicates or overwrite
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash('adminpassword123', 10);

        const admin = new User({
            username: 'admin',
            password: hashedPassword
        });

        await admin.save();
        res.json({ message: 'Admin created with hashed password' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
