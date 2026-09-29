require('dotenv').config();
const mongoose = require('mongoose');
const ServiceCenter = require('../src/models/ServiceCenter');

const CENTER_ID = '6ab030edfb8baa6b361738db';

async function openCenter() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB connected');

        const center = await ServiceCenter.findByIdAndUpdate(
            CENTER_ID,
            { $set: { isOpen: true } },
            { new: true }
        );

        if (!center) {
            console.log('Service center not found');
            return;
        }

        console.log('Center:', center.name);
        console.log('isOpen:', center.isOpen);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

openCenter();