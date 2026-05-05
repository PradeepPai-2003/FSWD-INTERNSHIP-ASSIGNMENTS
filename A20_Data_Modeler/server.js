require('dotenv').config();



















const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');

// Import routes
const userRoutes = require('./server/routes/userRoutes');
const postRoutes = require('./server/routes/postRoutes');
const commentRoutes = require('./server/routes/commentRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Server is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});