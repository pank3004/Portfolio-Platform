// Admin Dashboard Component
// Main dashboard for admin panel

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul className="admin-menu">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/projects">Manage Projects</Link></li>
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

      {/* Main Content */}
      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>Logged in as: {localStorage.getItem('adminEmail')}</p>
        
        <div className="card-grid" style={{ marginTop: '2rem' }}>
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">📁 Projects</h3>
              <p className="card-description">Manage your portfolio projects</p>
              <Link to="/admin/projects" className="btn btn-primary">
                Manage
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3 className="card-title">📚 Study Materials</h3>
              <p className="card-description">Upload and manage learning materials</p>
              <Link to="/admin/study-materials" className="btn btn-primary">
                Manage
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3 className="card-title">✍️ Blogs</h3>
              <p className="card-description">Create and manage blog posts</p>
              <Link to="/admin/blogs" className="btn btn-primary">
                Manage
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3 className="card-title">🤖 AI Updates</h3>
              <p className="card-description">Post AI and tech updates</p>
              <Link to="/admin/ai-updates" className="btn btn-primary">
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
