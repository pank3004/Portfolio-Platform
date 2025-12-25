// AI Updates Page Component
// Display latest AI and tech updates

import React, { useState, useEffect } from 'react';
import { getAllAIUpdates } from '../utils/api';

// Backend base URL for images

                                   // for producction 
const BACKEND_URL = 'https://portfolio-platform-paff.onrender.com';

                                  // for local
// const BACKEND_URL = 'http://localhost:5000';  // for local

function AIUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AI updates when component loads
  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await getAllAIUpdates();
      setUpdates(response.data.updates);
      setError(null);
    } catch (err) {
      setError('Failed to load AI updates. Please try again later.');
      console.error('Error fetching AI updates:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading AI updates...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">AI & Tech Updates</h1>
        
        {updates.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No updates available yet.</p>
        ) : (
          <div className="card-grid">
            {updates.map((update) => (
              <div key={update._id} className="card">
                {update.image && (
                  <img 
                    src={`${BACKEND_URL}${update.image}`} 
                    alt={update.title}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <div className="tag" style={{ marginBottom: '1rem' }}>
                    {update.category}
                  </div>
                  <h3 className="card-title">{update.title}</h3>
                  <p className="card-description">{update.content}</p>
                  
                  {update.sourceLink && (
                    <a 
                      href={update.sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ marginTop: '1rem' }}
                    >
                      Read Source
                    </a>
                  )}
                  
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    {new Date(update.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIUpdates;
