// models/Task.js
// This defines what a Task looks like in the database

import mongoose from "mongoose";

// Define the structure of a Task
const taskSchema = new mongoose.Schema(
  {
    // Field 1: Title (required, max 100 characters)
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // Removes extra spaces
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    // Field 2: Description (optional)
    description: {
      type: String,
      trim: true,
      default: "", // Empty string if not provided
    },

    // Field 3: Status (only specific values allowed)
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // Field 4: Priority (high, medium, or low)
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Field 5: Due Date (optional)
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Auto-adds createdAt and updatedAt fields
  }
);

// Create and export the Task model
const Task = mongoose.model("Task", taskSchema);

export default Task;