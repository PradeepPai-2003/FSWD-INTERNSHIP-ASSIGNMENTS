import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelect, setRoleSelect] = useState('user');

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(token ? jwtDecode(token).role : null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const showMessage = (msg, error = false) => {
    setMessage(msg);
    setIsError(error);
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5005/api/register', { username, password, role: roleSelect });
      showMessage('Registration successful! You can now log in.', false);
    } catch (err) {
      showMessage(err.response?.data?.message || 'Registration failed', true);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5005/api/login', { username, password });
      const { token, role } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUserRole(role);
      showMessage('Login successful!', false);
    } catch (err) {
      showMessage(err.response?.data?.message || 'Login failed', true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserRole(null);
    showMessage('Logged out successfully', false);
  };

  const accessDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage(res.data.message, false);
    } catch (err) {
      showMessage('Failed to load dashboard', true);
    }
  };

  const accessAdminPanel = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage(res.data.message, false);
    } catch (err) {
      showMessage(err.response?.data?.message || 'Access Denied', true);
    }
  };

  return (
    <div className="card">
      <h2>🛡️ Role Guard</h2>
      
      {!token ? (
        <>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <select onChange={e => setRoleSelect(e.target.value)} value={roleSelect}>
            <option value="user">Register as Normal User</option>
            <option value="admin">Register as Admin</option>
          </select>
          <button onClick={handleRegister}>Sign Up</button>
          <button style={{background: '#10b981'}} onClick={handleLogin}>Log In</button>
        </>
      ) : (
        <>
          <h3>Welcome, {userRole.toUpperCase()}</h3>
          <button onClick={accessDashboard}>Access User Dashboard</button>
          
          {userRole === 'admin' && (
            <button className="admin-btn" onClick={accessAdminPanel}>Access Admin Panel</button>
          )}
          
          {userRole === 'user' && (
             <button className="admin-btn" onClick={accessAdminPanel}>Force Try Admin Route</button>
          )}

          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </>
      )}

      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
