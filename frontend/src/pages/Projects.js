// Projects Page Component
// Display all portfolio projects

import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../utils/api';

                                   // for producction 
const BACKEND_URL = 'https://portfolio-platform-paff.onrender.com';

                                  // for local
// const BACKEND_URL = 'http://localhost:5000';  // for local

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects when component loads
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAllProjects();
      setProjects(response.data.projects);
      setError(null);
    } catch (err) {
      setError('Failed to load projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">My Projects</h1>
        
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No projects available yet.</p>
        ) : (
          <div className="card-grid">
            {projects.map((project) => (
              <div key={project._id} className="card">
                {project.image && (
                  <img 
                    src={`${BACKEND_URL}${project.image}`} 
                    alt={project.title}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="card-tags">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Live Demo
                      </a>
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

export default Projects;
