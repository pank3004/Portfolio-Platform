// Blogs Page Component
// Display blogs and newsletters

import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../utils/api';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  // Fetch blogs when component loads
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data.blogs);
      setError(null);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs by type
  const filteredBlogs = filter === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.type === filter);

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Blogs & Newsletters</h1>
        
        {/* Filter buttons */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ margin: '0.5rem' }}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`btn ${filter === 'Blog' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ margin: '0.5rem' }}
            onClick={() => setFilter('Blog')}
          >
            Blogs
          </button>
          <button
            className={`btn ${filter === 'Newsletter' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ margin: '0.5rem' }}
            onClick={() => setFilter('Newsletter')}
          >
            Newsletters
          </button>
        </div>
        
        {filteredBlogs.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No content available.</p>
        ) : (
          <div className="card-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="card">
                {blog.image && (
                  <img 
                    src={`http://localhost:5000${blog.image}`} 
                    alt={blog.title}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <div className="tag" style={{ marginBottom: '1rem' }}>
                    {blog.type}
                  </div>
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-description">
                    {blog.content.substring(0, 150)}...
                  </p>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="card-tags">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  
                  <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
