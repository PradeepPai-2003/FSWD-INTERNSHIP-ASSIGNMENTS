const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        
        // Use in-memory DB if no MONGO_URI is provided
        if (!uri || uri === 'mongodb://127.0.0.1:27017/connect-stack-db') {
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            console.log('Using in-memory MongoDB for testing');
        }

        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log('MongoDB connection error:', err);
    }
};
connectDB();

// Routes
// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new user
app.post('/api/users', async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
