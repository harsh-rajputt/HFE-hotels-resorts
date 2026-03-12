import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all reviews for a room
router.get('/room/:roomId', asyncHandler(async (req, res) => {
    const reviews = await Review.find({ room: req.params.roomId })
        .populate('customer', 'name')
        .sort({ createdAt: -1 });
    res.json(reviews);
}));

// POST new rating/review (must be logged in)
router.post('/', protect, asyncHandler(async (req, res) => {
    const { room, rating, comment } = req.body;
    
    // Check if customer already reviewed
    const existingReview = await Review.findOne({ room, customer: req.user.id });
    if (existingReview) {
        res.status(400);
        throw new Error('You have already reviewed this room');
    }

    const review = new Review({
        room,
        customer: req.user.id,
        rating: Number(rating),
        comment
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
}));

export default router;
