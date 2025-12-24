// Admin AI Updates Management (Simplified)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAIUpdatesAdmin, createAIUpdate, deleteAIUpdate } from '../utils/api';

function AdminAIUpdates() {
  const [updates, setUpdates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', sourceLink: '', category: 'General AI' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    fetchUpdates();
  }, [navigate]);

  const fetchUpdates = async () => {
    try {
      const response = await getAllAIUpdatesAdmin();
      setUpdates(response.data.updates);
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
      await createAIUpdate(data);
      setMessage('Update created!');
      setShowForm(false);
      fetchUpdates();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error creating update');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this update?')) {
      try {
        await deleteAIUpdate(id);
        fetchUpdates();
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
          <li><Link to="/admin/blogs">Manage Blogs</Link></li>
          <li><Link to="/admin/ai-updates" className="active">Manage AI Updates</Link></li>
          <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}>Logout</button></li>
        </ul>
      </div>

      <div className="admin-content">
        <h1>Manage AI Updates</h1>
        {message && <div className="success-message">{message}</div>}
        
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
          {showForm ? 'Cancel' : 'Add New Update'}
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
                  <textarea className="form-textarea" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Source Link</label>
                  <input type="url" className="form-input" value={formData.sourceLink} onChange={(e) => setFormData({...formData, sourceLink: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input type="file" accept="image/*" className="form-input" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-success">Create Update</button>
              </form>
            </div>
          </div>
        )}

        <div className="table">
          <table style={{ width: '100%' }}>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {updates.map((update) => (
                <tr key={update._id}>
                  <td>{update.title}</td>
                  <td>{update.category}</td>
                  <td>{new Date(update.createdAt).toLocaleDateString()}</td>
                  <td><button onClick={() => handleDelete(update._id)} className="btn btn-danger" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAIUpdates;
