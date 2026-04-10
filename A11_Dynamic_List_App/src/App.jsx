import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  // Add task
  const addTask = () => {
    if (task.trim() === "") return;
    setList([...list, task]);
    setTask("");
  };

  // Delete task
  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Delete all tasks
  const deleteAll = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      setList([]);
    }
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">📝 My Tasks</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="task-input"
          />
          <button onClick={addTask} className="btn btn-add">
            Add
          </button>
        </div>

        <div className="task-section">
          {list.length === 0 ? (
            <p className="empty-msg">No tasks yet. Add one to get started!</p>
          ) : (
            <ul className="task-list">
              {list.map((item, index) => (
                <li key={index} className="task-item">
                  <span className="task-text">{item}</span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {list.length > 0 && (
          <div className="footer">
            <p>Total Tasks: {list.length}</p>
            <button onClick={deleteAll} className="btn btn-delete-all">
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;