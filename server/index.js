import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import roomRoutes from './routes/rooms.js';
import galleryRoutes from './routes/gallery.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import dashboardRoutes from './routes/dashboard.js';
import customerRoutes from './routes/customers.js';
import bookingRoutes from './routes/bookings.js';
import paymentRoutes from './routes/payments.js';
import staffRoutes from './routes/staff.js';
import reviewsRoutes from './routes/reviews.js';

import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow all origins (Vercel, localhost, mobile browsers)
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman) OR any origin
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight OPTIONS requests
app.use(express.json());


app.use('/api/rooms', roomRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reviews', reviewsRoutes);

app.get('/', (req, res) => {
    res.send('HFE Group Hotel Server is running');
});

// Error Handler (must be last)
app.use(errorHandler);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hfe_hotels';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('URI used:', MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
