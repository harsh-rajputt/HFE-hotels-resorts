import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hfe_hotels';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');

        try {
            const hashedPassword = await bcrypt.hash('adminpassword123', 10);

            const existingAdmin = await User.findOne({ username: 'admin' });
            if (existingAdmin) {
                console.log('Admin user already exists. Updating password to ensure match...');
                existingAdmin.password = hashedPassword;
                await existingAdmin.save();
                console.log('Admin password updated to: adminpassword123 (hashed)');
            } else {
                console.log('Admin user not found. Creating new admin...');
                const admin = new User({
                    username: 'admin',
                    password: hashedPassword
                });
                await admin.save();
                console.log('Admin user created successfully.');
            }
        } catch (error) {
            console.error('Error during seeding:', error);
        } finally {
            console.log('Seeding complete. Disconnecting...');
            mongoose.disconnect();
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
