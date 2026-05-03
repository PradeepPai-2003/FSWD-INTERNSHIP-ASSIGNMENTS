// routes/taskRoutes.js
// This file maps URLs to controller functions

import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/taskController.js";

// Create a router
const router = express.Router();

// ═══════════════════════════════════════════
// Routes for /api/tasks (no ID)
// ═══════════════════════════════════════════
router
  .route("/")
  .get(getAllTasks)        // GET  /api/tasks       → See all tasks
  .post(createTask)        // POST /api/tasks       → Create new task
  .delete(deleteAllTasks); // DELETE /api/tasks     → Delete all tasks

// ═══════════════════════════════════════════
// Routes for /api/tasks/:id (with ID)
// ═══════════════════════════════════════════
router
  .route("/:id")
  .get(getTaskById)    // GET    /api/tasks/:id  → See one task
  .put(updateTask)     // PUT    /api/tasks/:id  → Update a task
  .delete(deleteTask); // DELETE /api/tasks/:id  → Delete one task

// Export the router
export default router;