// Skills Page Component
// Display technical skills

import React from 'react';

function Skills() {
  // Define skills by category
  const skillsData = [
    {
      category: 'Python',
      skills: ['Core Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Object-Oriented Programming']
    },
    {
      category: 'Machine Learning',
      skills: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning', 'Feature Engineering', 'Model Evaluation']
    },
    {
      category: 'Deep Learning',
      skills: ['TensorFlow', 'PyTorch', 'Neural Networks', 'CNN', 'RNN', 'Transfer Learning']
    },
    {
      category: 'Generative AI',
      skills: ['Large Language Models', 'GPT', 'Prompt Engineering', 'Fine-tuning', 'RAG Systems']
    },
    {
      category: 'Agentic AI',
      skills: ['LangChain', 'AI Agents', 'Multi-Agent Systems', 'Tool Usage', 'Autonomous Systems']
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">My Skills</h1>
        
        <div className="card-grid">
          {skillsData.map((skillCategory, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h2 className="card-title">{skillCategory.category}</h2>
                <div className="card-tags">
                  {skillCategory.skills.map((skill, idx) => (
                    <span key={idx} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
