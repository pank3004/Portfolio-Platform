// Study Materials Page Component
// Display learning materials organized by category

import React, { useState, useEffect } from 'react';
import { getAllMaterials } from '../utils/api';

function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Python', 'Machine Learning', 'Deep Learning', 'Generative AI', 'Agentic AI'];

  // Fetch materials when component loads
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await getAllMaterials();
      setMaterials(response.data.materials);
      setError(null);
    } catch (err) {
      setError('Failed to load study materials. Please try again later.');
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter materials by selected category
  const filteredMaterials = selectedCategory === 'All' 
    ? materials 
    : materials.filter(m => m.category === selectedCategory);

  if (loading) {
    return <div className="loading">Loading study materials...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Study Materials</h1>
        
        {/* Category Filter */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              style={{ margin: '0.5rem' }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredMaterials.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No materials available in this category.</p>
        ) : (
          <div className="card-grid">
            {filteredMaterials.map((material) => (
              <div key={material._id} className="card">
                <div className="card-content">
                  <div className="tag" style={{ marginBottom: '1rem' }}>
                    {material.category}
                  </div>
                  <h3 className="card-title">{material.title}</h3>
                  <p className="card-description">{material.description}</p>
                  
                  <div style={{ marginTop: '1rem' }}>
                    {material.type === 'PDF' && material.fileUrl && (
                      <a 
                        href={`http://localhost:5000${material.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        View PDF
                      </a>
                    )}
                    {material.type === 'Link' && material.fileUrl && (
                      <a 
                        href={material.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Open Link
                      </a>
                    )}
                    {material.type === 'Text' && material.content && (
                      <div style={{ 
                        marginTop: '1rem', 
                        padding: '1rem', 
                        background: '#f8f9fa', 
                        borderRadius: '5px' 
                      }}>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{material.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyMaterials;
