// Import the Task model
const Task = require('../models/Task');

// ===== CREATE - Add a new task =====
exports.createTask = async (req, res) => {
  try {
    // Get title and description from request
    const { title, description } = req.body;

    // Check if title is provided
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title',
      });
    }

    // Create new task in database
    const newTask = await Task.create({
      title,
      description,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      data: newTask,
    });
  } catch (error) {
    // Send error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== READ - Get all tasks =====
exports.getAllTasks = async (req, res) => {
  try {
    // Get all tasks from database, newest first
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Send tasks as response
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== READ - Get one task by ID =====
exports.getTaskById = async (req, res) => {
  try {
    // Get ID from the URL
    const { id } = req.params;

    // Find task with that ID
    const task = await Task.findById(id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Send task as response
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== UPDATE - Change a task =====
exports.updateTask = async (req, res) => {
  try {
    // Get ID from URL and data from request
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    // Find task and update it
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true } // Return updated task
    );

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Send updated task as response
    res.status(200).json({
      success: true,
      message: 'Task updated successfully!',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== DELETE - Remove a task =====
exports.deleteTask = async (req, res) => {
  try {
    // Get ID from URL
    const { id } = req.params;

    // Find and delete task
    const task = await Task.findByIdAndDelete(id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully!',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};