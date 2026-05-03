// controllers/taskController.js
// This file contains all the logic for each API operation

import Task from "../models/Task.js";
import { validateTaskInput } from "../utils/validators.js";

// ========================================
// 1. GET ALL TASKS
// ========================================
export const getAllTasks = async (req, res) => {
  try {
    // Build filter based on query parameters (?status=pending&priority=high)
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    // Find all tasks matching the filter, sorted by newest first
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    // Send response
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================================
// 2. GET A SINGLE TASK BY ID
// ========================================
export const getTaskById = async (req, res) => {
  try {
    // Get the task ID from the URL (/api/tasks/:id)
    const task = await Task.findById(req.params.id);

    // If task doesn't exist
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Send the task
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================================
// 3. CREATE A NEW TASK
// ========================================
export const createTask = async (req, res) => {
  try {
    // Validate input
    const errors = validateTaskInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join("; ") });
    }

    // Get the data from request body
    const { title, description, status, priority, dueDate } = req.body;

    // Create the task in MongoDB
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    // Send the newly created task back
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================================
// 4. UPDATE A TASK
// ========================================
export const updateTask = async (req, res) => {
  try {
    // Validate input (only validate fields that are being updated)
    if (Object.keys(req.body).length > 0) {
      const errors = validateTaskInput(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ success: false, message: errors.join("; ") });
      }
    }

    // Find task by ID and update it with new data
    const task = await Task.findByIdAndUpdate(
      req.params.id,      // Which task to update
      req.body,           // What to update
      {
        new: true,        // Return the UPDATED version, not the old one
        runValidators: true, // Check validation rules again
      }
    );

    // If task doesn't exist
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Send the updated task
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================================
// 5. DELETE A TASK
// ========================================
export const deleteTask = async (req, res) => {
  try {
    // Find and delete the task
    const task = await Task.findByIdAndDelete(req.params.id);

    // If task doesn't exist
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Send success message
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================================
// 6. DELETE ALL TASKS (Bonus)
// ========================================
export const deleteAllTasks = async (req, res) => {
  try {
    // Delete all tasks from database
    await Task.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All tasks deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};