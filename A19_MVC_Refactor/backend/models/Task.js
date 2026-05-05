const mongoose = require('mongoose');

// Define what a Task should look like
const taskSchema = new mongoose.Schema(
  {
    // Task title (required, must always be filled)
    title: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces
    },
    
    // Task description (optional)
    description: {
      type: String,
      trim: true,
    },
    
    // Is task completed? (true = done, false = not done)
    isCompleted: {
      type: Boolean,
      default: false, // Default is "not completed"
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;