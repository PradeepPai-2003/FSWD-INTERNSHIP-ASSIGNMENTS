const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect using the URI from .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    // If connection successful, print this message
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Database:', conn.connection.name);
    
    return conn;
  } catch (error) {
    // If connection fails, print error message
    console.error('❌ MongoDB Connection Error:');
    console.error(error.message);
    
    // Stop the program (don't continue if no database)
    process.exit(1);
  }
};

// Export the function so we can use it in server.js
module.exports = connectDB;