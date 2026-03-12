import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ['Manager', 'Receptionist', 'Cleaner', 'Admin', 'Other'], required: true },
    phone: { type: String, required: true },
    email: { type: String },
    shift: { type: String, enum: ['Morning', 'Evening', 'Night'], default: 'Morning' },
    salary: { type: Number },
    status: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: 'Active' },
    hireDate: { type: Date, default: Date.now },
    attendance: [{
        date: { type: Date, required: true },
        status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half-day'], required: true },
        remarks: { type: String }
    }]
});

export default mongoose.model('Staff', StaffSchema);
