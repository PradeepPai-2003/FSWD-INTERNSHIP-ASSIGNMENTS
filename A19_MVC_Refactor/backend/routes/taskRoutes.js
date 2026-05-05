const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Define routes
// GET all tasks: /api/tasks
router.get('/', getAllTasks);

// GET one task: /api/tasks/:id
router.get('/:id', getTaskById);

// CREATE task: /api/tasks (POST)
router.post('/', createTask);

// UPDATE task: /api/tasks/:id (PUT)
router.put('/:id', updateTask);

// DELETE task: /api/tasks/:id (DELETE)
router.delete('/:id', deleteTask);

// Export routes
module.exports = router;