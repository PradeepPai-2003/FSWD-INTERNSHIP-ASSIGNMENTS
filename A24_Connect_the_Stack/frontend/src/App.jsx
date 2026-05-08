import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Fetch users when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to connect to backend. Is the server running?');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Please enter both name and email');

    try {
      const response = await axios.post(API_URL, { name, email });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setError(null);
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Connect the Stack</h1>
        <p>A Full-Stack MERN Application</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser} className="form-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-primary">Add User</button>
        </form>
      </div>

      <div className="card">
        <h2>Registered Users</h2>
        {users.length === 0 ? (
          <p className="empty-state">No users found. Add one above!</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <button 
                  onClick={() => handleDeleteUser(user._id)} 
                  className="btn-danger"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
