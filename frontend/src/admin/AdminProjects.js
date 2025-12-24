// Admin Projects Management Component
// Create, edit, and delete projects

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProjectsAdmin, createProject, deleteProject } from '../utils/api';

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAllProjectsAdmin();
      setProjects(response.data.projects);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('technologies', formData.technologies);
    data.append('githubLink', formData.githubLink);
    data.append('liveLink', formData.liveLink);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await createProject(data);
      setMessage('Project created successfully!');
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubLink: '',
        liveLink: ''
      });
      setImageFile(null);
      setShowForm(false);
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error creating project');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setMessage('Project deleted successfully!');
        fetchProjects();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('Error deleting project');
        console.error('Error:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul className="admin-menu">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/projects" className="active">Manage Projects</Link></li>
          <li><Link to="/admin/study-materials">Manage Study Materials</Link></li>
          <li><Link to="/admin/blogs">Manage Blogs</Link></li>
          <li><Link to="/admin/ai-updates">Manage AI Updates</Link></li>
          <li><button onClick={handleLogout} style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            padding: '1rem 1.5rem',
            textAlign: 'left',
            width: '100%'
          }}>Logout</button></li>
        </ul>
      </div>

      <div className="admin-content">
        <h1>Manage Projects</h1>
        
        {message && <div className="success-message">{message}</div>}
        
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
          style={{ marginBottom: '2rem' }}
        >
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>

        {showForm && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-content">
              <h3>Create New Project</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    className="form-input"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">GitHub Link</label>
                  <input
                    type="url"
                    name="githubLink"
                    className="form-input"
                    value={formData.githubLink}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Live Demo Link</label>
                  <input
                    type="url"
                    name="liveLink"
                    className="form-input"
                    value={formData.liveLink}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                </div>
                
                <button type="submit" className="btn btn-success">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="table">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.description.substring(0, 50)}...</td>
                  <td>{project.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="btn btn-danger"
                      style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProjects;
