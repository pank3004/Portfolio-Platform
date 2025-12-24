// About Page Component
// Information about education, journey, and goals

import React from 'react';

function About() {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">About Me</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-content">
              <h2 className="card-title">My Journey</h2>
              <p className="card-description">
                I'm passionate about Artificial Intelligence and Machine Learning. 
                My journey started with Python programming and evolved into deep learning, 
                generative AI, and agentic AI systems. I love building intelligent solutions 
                that solve real-world problems.
              </p>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-content">
              <h2 className="card-title">Education</h2>
              <p className="card-description">
                <strong>Bachelor's Degree in Computer Science</strong><br/>
                [Your University Name]<br/>
                Year: [Your Year]<br/><br/>
                Relevant Coursework: Machine Learning, Deep Learning, Data Structures, 
                Algorithms, Artificial Intelligence
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Goals & Vision</h2>
              <p className="card-description">
                My goal is to become an expert in AI and contribute to cutting-edge 
                research and development. I aim to work on projects that leverage 
                machine learning and generative AI to create impactful solutions. 
                Through this platform, I share my learning journey and help others 
                learn about AI and related technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
