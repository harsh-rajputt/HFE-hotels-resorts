import express from 'express';
import Gallery from '../models/Gallery.js';
import upload from '../config/cloudinary.js';

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
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const galleryData = {
            title: req.body.title,
            category: req.body.category
        };

        if (req.file) {
            galleryData.imageUrl = req.file.path;
        } else if (req.body.imageUrl) {
            // Fallback if URL is manually sent
            galleryData.imageUrl = req.body.imageUrl;
        }

        const gallery = new Gallery(galleryData);
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
