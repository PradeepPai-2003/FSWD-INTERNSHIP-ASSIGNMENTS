// utils/validators.js
// Helper functions for input validation

export const validateTaskInput = (data) => {
  const errors = [];

  // Validate title
  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push("Title is required and must be a non-empty string");
  } else if (data.title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  // Validate description
  if (data.description && typeof data.description === 'string' && data.description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  // Validate status
  const validStatuses = ["pending", "in-progress", "completed"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
  }

  // Validate priority
  const validPriorities = ["low", "medium", "high"];
  if (data.priority && !validPriorities.includes(data.priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(", ")}`);
  }

  // Validate due date
  if (data.dueDate && isNaN(Date.parse(data.dueDate))) {
    errors.push("Invalid date format for dueDate");
  }

  return errors;
};
