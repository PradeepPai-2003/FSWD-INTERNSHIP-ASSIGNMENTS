import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(false);

  // Form states
  const [userForm, setUserForm] = useState({ username: '', email: '', password: '' });
  const [postForm, setPostForm] = useState({ 
    title: '', content: '', description: '', author: '', category: 'Technology', tags: '' 
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/users');
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/posts');
      setPosts(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users', userForm);
      alert('✅ User created!');
      setUserForm({ username: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      alert('❌ ' + error.response?.data?.message);
    }
  };

  // Create post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...postForm,
        tags: postForm.tags.split(',').map(tag => tag.trim())
      };
      await API.post('/posts', postData);
      alert('✅ Post created!');
      setPostForm({ title: '', content: '', description: '', author: '', category: 'Technology', tags: '' });
      fetchPosts();
    } catch (error) {
      alert('❌ ' + error.response?.data?.message);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.delete(`/users/${id}`);
        alert('✅ User deleted!');
        fetchUsers();
      } catch (error) {
        console.error(error);
        alert('❌ Error deleting user');
      }
    }
  };

  // Delete post
  const deletePost = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.delete(`/posts/${id}`);
        alert('✅ Post deleted!');
        fetchPosts();
      } catch (error) {
        console.error(error);
        alert('❌ Error deleting post');
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchUsers();
      fetchPosts();
    }, 0);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Blog Platform - MongoDB Schema Demo</h1>
        <p>Test Create, Read, Update, Delete operations</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📄 Blog Posts
        </button>
      </div>

      {/* USERS SECTION */}
      {activeTab === 'users' && (
        <div className="section">
          <div className="container">
            <div className="form-section">
              <h2>Create New User</h2>
              <form onSubmit={handleCreateUser}>
                <input
                  type="text"
                  placeholder="Username"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                  required
                />
                <button type="submit">Create User</button>
              </form>
            </div>

            <div className="list-section">
              <h2>All Users ({users.length})</h2>
              {loading ? <p>Loading...</p> : (
                <div className="user-list">
                  {users.map(user => (
                    <div key={user._id} className="card">
                      <h3>{user.username}</h3>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Bio:</strong> {user.bio || 'No bio'}</p>
                      <p className="small">ID: {user._id}</p>
                      <button 
                        className="btn-danger"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POSTS SECTION */}
      {activeTab === 'posts' && (
        <div className="section">
          <div className="container">
            <div className="form-section">
              <h2>Create New Post</h2>
              <form onSubmit={handleCreatePost}>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Post Content (min 10 chars)"
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  rows="4"
                  required
                ></textarea>
                <input
                  type="text"
                  placeholder="Description"
                  value={postForm.description}
                  onChange={(e) => setPostForm({...postForm, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Author ID (copy from Users tab)"
                  value={postForm.author}
                  onChange={(e) => setPostForm({...postForm, author: e.target.value})}
                  required
                />
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                >
                  <option>Technology</option>
                  <option>Lifestyle</option>
                  <option>Business</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                />
                <button type="submit">Create Post</button>
              </form>
            </div>

            <div className="list-section">
              <h2>All Blog Posts ({posts.length})</h2>
              {loading ? <p>Loading...</p> : (
                <div className="post-list">
                  {posts.map(post => (
                    <div key={post._id} className="post-card">
                      <h3>{post.title}</h3>
                      <p><strong>Author:</strong> {post.author?.username || 'Unknown'}</p>
                      <p><strong>Category:</strong> {post.category}</p>
                      <p><strong>Tags:</strong> {post.tags.join(', ') || 'None'}</p>
                      <p className="preview">{post.content.substring(0, 100)}...</p>
                      <div className="stats">
                        <span>👁️ {post.views} views</span>
                        <span>❤️ {post.likes} likes</span>
                      </div>
                      <p className="small">ID: {post._id}</p>
                      <button 
                        className="btn-danger"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>✨ MongoDB Schema Design Demo - MERN Stack</p>
      </footer>
    </div>
  );
}