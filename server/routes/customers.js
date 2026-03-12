import express from 'express';
import asyncHandler from 'express-async-handler';
import Customer from '../models/Customer.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, asyncHandler(async (req, res) => {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
}));

router.post('/', protect, asyncHandler(async (req, res) => {
    const customer = new Customer(req.body);
    const createdCustomer = await customer.save();
    res.status(201).json(createdCustomer);
}));

router.put('/:id', protect, asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        Object.assign(customer, req.body);
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } else {
        res.status(404);
        throw new Error('Customer not found');
    }
}));

router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        await customer.deleteOne();
        res.json({ message: 'Customer removed' });
    } else {
        res.status(404);
        throw new Error('Customer not found');
    }
}));

export default router;
