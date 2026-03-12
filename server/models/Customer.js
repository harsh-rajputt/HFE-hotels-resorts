import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    idProofType: { type: String }, // e.g. Passport, Aadhar
    idProofNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Customer', CustomerSchema);
