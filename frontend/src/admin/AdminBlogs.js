// Admin Blogs Management (Simplified)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBlogsAdmin, createBlog, deleteBlog } from '../utils/api';

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', type: 'Blog', tags: '', author: 'Admin' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogsAdmin();
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await createBlog(data);
      setMessage('Blog created!');
      setShowForm(false);
      fetchBlogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error creating blog');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog?')) {
      try {
        await deleteBlog(id);
        fetchBlogs();
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul className="admin-menu">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/projects">Manage Projects</Link></li>
          <li><Link to="/admin/study-materials">Manage Study Materials</Link></li>
          <li><Link to="/admin/blogs" className="active">Manage Blogs</Link></li>
          <li><Link to="/admin/ai-updates">Manage AI Updates</Link></li>
          <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}>Logout</button></li>
        </ul>
      </div>

      <div className="admin-content">
        <h1>Manage Blogs</h1>
        {message && <div className="success-message">{message}</div>}
        
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
          {showForm ? 'Cancel' : 'Add New Blog'}
        </button>

        {showForm && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea className="form-textarea" style={{ minHeight: '200px' }} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Blog</option>
                    <option>Newsletter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input type="text" className="form-input" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="AI, Machine Learning" />
                </div>
                <div className="form-group">
                  <label className="form-label">Featured Image</label>
                  <input type="file" accept="image/*" className="form-input" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-success">Create Blog</button>
              </form>
            </div>
          </div>
        )}

        <div className="table">
          <table style={{ width: '100%' }}>
            <thead>
              <tr><th>Title</th><th>Type</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.type}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td><button onClick={() => handleDelete(blog._id)} className="btn btn-danger" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
