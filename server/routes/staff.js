import express from 'express';
import asyncHandler from 'express-async-handler';
import Staff from '../models/Staff.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, asyncHandler(async (req, res) => {
    const staff = await Staff.find().sort({ hireDate: -1 });
    res.json(staff);
}));

router.post('/', protect, asyncHandler(async (req, res) => {
    const staffMember = new Staff(req.body);
    const createdStaff = await staffMember.save();
    res.status(201).json(createdStaff);
}));

router.put('/:id', protect, asyncHandler(async (req, res) => {
    const staffMember = await Staff.findById(req.params.id);
    if (staffMember) {
        Object.assign(staffMember, req.body);
        const updatedStaff = await staffMember.save();
        res.json(updatedStaff);
    } else {
        res.status(404);
        throw new Error('Staff member not found');
    }
}));

router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const staffMember = await Staff.findById(req.params.id);
    if (staffMember) {
        await staffMember.deleteOne();
        res.json({ message: 'Staff member removed' });
    } else {
        res.status(404);
        throw new Error('Staff member not found');
    }
}));

// PUT add attendance record
router.put('/:id/attendance', protect, asyncHandler(async (req, res) => {
    const { date, status, remarks } = req.body;
    const staffMember = await Staff.findById(req.params.id);

    if (staffMember) {
        // Basic check to see if attendance already exists for this date, replacing if yes, or pushing if no.
        const attendanceDate = new Date(date).setHours(0,0,0,0);
        
        const existingIndex = staffMember.attendance.findIndex(a => 
            new Date(a.date).setHours(0,0,0,0) === attendanceDate
        );

        if (existingIndex >= 0) {
            staffMember.attendance[existingIndex].status = status;
            staffMember.attendance[existingIndex].remarks = remarks;
        } else {
            staffMember.attendance.push({ date, status, remarks });
        }

        const updatedStaff = await staffMember.save();
        res.json(updatedStaff);
    } else {
        res.status(404);
        throw new Error('Staff member not found');
    }
}));

export default router;
