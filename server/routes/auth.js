import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Login
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt for:', username);

    const user = await User.findOne({ username });

    if (!user) {
        res.status(401);
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid credentials');
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
}));

// Seed Admin (Updated to hash password)
router.post('/seed', asyncHandler(async (req, res) => {
    // Check if admin already exists to prevent duplicates or overwrite
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash('adminpassword123', 10);

    const admin = new User({
        username: 'admin',
        password: hashedPassword
    });

    await admin.save();
    res.json({ message: 'Admin created with hashed password' });
}));

export default router;
