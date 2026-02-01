import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// GET all images
router.get('/', async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new image
router.post('/', async (req, res) => {
    const gallery = new Gallery({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        category: req.body.category
    });

    try {
        const newImage = await gallery.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE image
router.delete('/:id', async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        await image.deleteOne();
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
