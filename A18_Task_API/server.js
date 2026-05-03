// server.js
// This is the MAIN FILE - where everything connects together

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// ══════════════════════════════════════════
// MIDDLEWARE (processes all requests)
// ══════════════════════════════════════════
app.use(express.json()); // Parse JSON in request body
app.use(express.urlencoded({ extended: true })); // Parse form data

// ══════════════════════════════════════════
// HOME ROUTE (just to check server is running)
// ══════════════════════════════════════════
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Task Manager API is running!",
    version: "1.0.0",
    endpoints: {
      getAllTasks: "GET /api/tasks",
      createTask: "POST /api/tasks",
      getTaskById: "GET /api/tasks/:id",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
    },
  });
});

// ══════════════════════════════════════════
// API ROUTES
// ══════════════════════════════════════════
app.use("/api/tasks", taskRoutes);

// ══════════════════════════════════════════
// 404 HANDLER (if URL not found)
// ══════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ══════════════════════════════════════════
// GLOBAL ERROR HANDLER
// ══════════════════════════════════════════
app.use(errorHandler);

// ══════════════════════════════════════════
// START THE SERVER
// ══════════════════════════════════════════
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Test the API using Postman`);
  console.log(`🛑 Press Ctrl + C to stop the server`);
});