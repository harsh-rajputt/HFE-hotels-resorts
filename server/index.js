import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import roomRoutes from './routes/rooms.js';
import galleryRoutes from './routes/gallery.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('HFE Group Hotel Server is running');
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hfe_hotels';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
