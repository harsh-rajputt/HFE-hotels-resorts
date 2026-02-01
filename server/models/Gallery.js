import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Gallery', gallerySchema);
