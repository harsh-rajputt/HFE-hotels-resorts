import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxGuests: { type: Number, default: 2 },
    image: { type: String, required: true },
    amenities: [String],
    location: { type: String, default: 'General' } // e.g., Shimla, Rishikesh
});

export default mongoose.model('Room', RoomSchema);
