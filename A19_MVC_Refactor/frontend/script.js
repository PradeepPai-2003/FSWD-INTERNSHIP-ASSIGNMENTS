// API URL where backend is running
const API_URL = 'http://localhost:5000/api/tasks';

// ===== GET DOM ELEMENTS =====
const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// ===== WHEN PAGE LOADS, LOAD ALL TASKS =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded! Loading tasks...');
  loadTasks();
});

// ===== WHEN FORM IS SUBMITTED, CREATE NEW TASK =====
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Don't refresh page
  console.log('Form submitted!');
  await createTask();
});

// ===== FUNCTION: CREATE TASK =====
async function createTask() {
  // Get values from input fields
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  // Check if title is empty
  if (!title) {
    alert('Please enter a task title');
    return;
  }

  try {
    console.log('Creating task:', { title, description });

    // Send POST request to backend
    const response = await fetch(API_URL, {
      method: 'POST', // We're creating, not reading
      headers: {
        'Content-Type': 'application/json', // Tell backend we're sending JSON
      },
      body: JSON.stringify({ title, description }), // Convert to JSON string
    });

    // Check if request was successful
    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const data = await response.json();
    console.log('✅ Task created:', data);

    // Clear the form
    taskForm.reset();

    // Reload task list
    await loadTasks();
  } catch (error) {
    console.error('❌ Error creating task:', error);
    alert('Error: ' + error.message);
  }
}

// ===== FUNCTION: LOAD ALL TASKS =====
async function loadTasks() {
  try {
    console.log('Fetching tasks from:', API_URL);

    // Send GET request to backend
    const response = await fetch(API_URL);

    // Check if request was successful
    if (!response.ok) {
      throw new Error('Failed to load tasks');
    }

    const data = await response.json();
    const tasks = data.data || []; // Get tasks array

    console.log('✅ Loaded tasks:', tasks);

    // Update task count
    taskCount.textContent = tasks.length;

    // Clear task list
    taskList.innerHTML = '';

    // If no tasks, show message
    if (tasks.length === 0) {
      taskList.innerHTML = '<p class="no-tasks">No tasks yet. Create your first task!</p>';
      return;
    }

    // Display each task
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  } catch (error) {
    console.error('❌ Error loading tasks:', error);
    taskList.innerHTML = `
      <p class="no-tasks">
        ⚠️ Error loading tasks.<br>
        Make sure the backend server is running on http://localhost:5000
      </p>
    `;
  }
}

// ===== FUNCTION: CREATE TASK HTML ELEMENT =====
function createTaskElement(task) {
  // Create a div for the task
  const div = document.createElement('div');
  
  // Add class names
  div.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
  
  // Create the HTML content
  div.innerHTML = `
    <div class="task-content">
      <!-- Task Title -->
      <div class="task-title">${escapeHtml(task.title)}</div>
      
      <!-- Task Description (if it exists) -->
      ${
        task.description
          ? `<div class="task-description">${escapeHtml(task.description)}</div>`
          : ''
      }
      
      <!-- When task was created -->
      <div class="task-meta">
        Created: ${new Date(task.createdAt).toLocaleString()}
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="task-actions">
      <!-- Complete/Undo Button -->
      <button 
        class="btn-small btn-complete ${task.isCompleted ? 'undo' : ''}"
        onclick="toggleTask('${task._id}', ${task.isCompleted})"
      >
        ${task.isCompleted ? '↩️ Undo' : '✓ Complete'}
      </button>
      
      <!-- Delete Button -->
      <button 
        class="btn-small btn-delete"
        onclick="deleteTask('${task._id}')"
      >
        🗑️ Delete
      </button>
    </div>
  `;
  
  return div;
}

// ===== FUNCTION: TOGGLE TASK COMPLETION =====
async function toggleTask(id, isCurrentlyCompleted) {
  try {
    console.log('Toggling task:', id);

    // Send PUT request to update task
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // We're updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCompleted: !isCurrentlyCompleted, // Flip the value
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    console.log('✅ Task updated');
    
    // Reload task list
    await loadTasks();
  } catch (error) {
    console.error('❌ Error toggling task:', error);
    alert('Error: ' + error.message);
  }
}

// ===== FUNCTION: DELETE TASK =====
async function deleteTask(id) {
  // Ask user for confirmation
  if (!confirm('Are you sure you want to delete this task?')) {
    return; // User clicked "No"
  }

  try {
    console.log('Deleting task:', id);

    // Send DELETE request
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE', // We're deleting
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    console.log('✅ Task deleted');
    
    // Reload task list
    await loadTasks();
  } catch (error) {
    console.error('❌ Error deleting task:', error);
    alert('Error: ' + error.message);
  }
}

// ===== SECURITY FUNCTION: PREVENT XSS ATTACKS =====
// This prevents hackers from injecting malicious code through task titles
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          