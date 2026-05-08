import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [user, setUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password } 
        : formData;

      const response = await axios.post(url, payload);

      setMessage({ type: 'success', text: response.data.message });

      if (isLogin) {
        // Save token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        // Automatically switch to login after successful signup
        setTimeout(() => {
          setIsLogin(true);
          setMessage({ type: '', text: '' });
        }, 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setFormData({ name: '', email: '', password: '' });
  };

  if (user) {
    return (
      <div className="app-container dashboard">
        <h2>Welcome, {user.name}! 👋</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p>You have successfully logged in and authenticated using JWT.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>{isLogin ? 'Secure Login' : 'Create Account'}</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <div className="toggle-text">
        {isLogin ? (
          <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
        )}
      </div>
    </div>
  );
}

export default App;
