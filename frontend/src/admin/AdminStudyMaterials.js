// Admin Study Materials Management (Simplified)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMaterialsAdmin, createMaterial, deleteMaterial } from '../utils/api';

function AdminStudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Python',
    type: 'Link',
    fileUrl: '',
    content: ''
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    fetchMaterials();
  }, [navigate]);

  const fetchMaterials = async () => {
    try {
      const response = await getAllMaterialsAdmin();
      setMaterials(response.data.materials);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('file', file);

    try {
      await createMaterial(data);
      setMessage('Material created!');
      setShowForm(false);
      fetchMaterials();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error creating material');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this material?')) {
      try {
        await deleteMaterial(id);
        fetchMaterials();
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
          <li><Link to="/admin/study-materials" className="active">Manage Study Materials</Link></li>
          <li><Link to="/admin/blogs">Manage Blogs</Link></li>
          <li><Link to="/admin/ai-updates">Manage AI Updates</Link></li>
          <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}>Logout</button></li>
        </ul>
      </div>

      <div className="admin-content">
        <h1>Manage Study Materials</h1>
        {message && <div className="success-message">{message}</div>}
        
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
          {showForm ? 'Cancel' : 'Add New Material'}
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
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Python</option>
                    <option>Machine Learning</option>
                    <option>Deep Learning</option>
                    <option>Generative AI</option>
                    <option>Agentic AI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Link</option>
                    <option>PDF</option>
                    <option>Text</option>
                  </select>
                </div>
                {formData.type === 'Link' && (
                  <div className="form-group">
                    <label className="form-label">URL</label>
                    <input type="url" className="form-input" value={formData.fileUrl} onChange={(e) => setFormData({...formData, fileUrl: e.target.value})} />
                  </div>
                )}
                {formData.type === 'PDF' && (
                  <div className="form-group">
                    <label className="form-label">Upload PDF</label>
                    <input type="file" accept=".pdf" className="form-input" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                )}
                {formData.type === 'Text' && (
                  <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea className="form-textarea" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea>
                  </div>
                )}
                <button type="submit" className="btn btn-success">Create Material</button>
              </form>
            </div>
          </div>
        )}

        <div className="table">
          <table style={{ width: '100%' }}>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Type</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.category}</td>
                  <td>{m.type}</td>
                  <td><button onClick={() => handleDelete(m._id)} className="btn btn-danger" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminStudyMaterials;
