import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxGuests: { type: Number, default: 2 },
    image: { type: String, required: true },
    amenities: [String],
    location: { type: String, default: 'General' }, // e.g., Shimla, Rishikesh
    category: { type: String, enum: ['Single', 'Deluxe', 'Suite'], default: 'Deluxe' },
    roomNumber: { type: String }, // e.g. "101", "102A"
    status: { type: String, enum: ['Available', 'Booked', 'Maintenance'], default: 'Available' }
});

export default mongoose.model('Room', RoomSchema);
