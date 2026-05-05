// ===== IMPORTS =====
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import connection function
const connectDB = require('./config/database');

// Import routes
const taskRoutes = require('./routes/taskRoutes');

// ===== CREATE APP =====
const app = express();

// ===== CONNECT TO DATABASE =====
connectDB();

// ===== MIDDLEWARE (Tools that process requests) =====

// Allow requests from different websites
app.use(cors());

// Parse JSON data from requests
app.use(express.json());

// ===== ROUTES =====

// Test route - Check if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Task API Server is Running!',
    version: '1.0',
    endpoints: '/api/tasks'
  });
});

// Register task routes at /api/tasks
app.use('/api/tasks', taskRoutes);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api/tasks`);
});