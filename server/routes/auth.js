import express from 'express';
import User from '../models/User.js';
import Customer from '../models/Customer.js';
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

// --- Customer Auth --- 

// Register Customer
router.post('/customer/register', asyncHandler(async (req, res) => {
    const { name, email, password, phone, address, idProofType, idProofNumber } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
        res.status(400);
        throw new Error('Customer with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = new Customer({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        idProofType,
        idProofNumber
    });

    const savedCustomer = await customer.save();

    const token = jwt.sign(
        { id: savedCustomer._id, role: 'customer' },
        process.env.JWT_SECRET || 'dev_secret_key_123',
        { expiresIn: '7d' }
    );

    res.status(201).json({
        success: true,
        customer: { _id: savedCustomer._id, name: savedCustomer.name, email: savedCustomer.email },
        token
    });
}));

// Login Customer
router.post('/customer/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: customer._id, role: 'customer' },
        process.env.JWT_SECRET || 'dev_secret_key_123',
        { expiresIn: '7d' }
    );

    res.json({
        success: true,
        customer: { _id: customer._id, name: customer.name, email: customer.email },
        token
    });
}));

// Reset Customer Password
router.post('/customer/reset-password', asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer) {
        res.status(404);
        throw new Error('No account found with that email address');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    customer.password = hashedPassword;
    await customer.save();

    res.json({
        success: true,
        message: 'Password reset successfully. You can now login.'
    });
}));

export default router;
