// Contact Page Component
// Contact information and form

import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Contact Me</h1>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Contact Information */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-content">
              <h3 className="card-title">Get In Touch</h3>
              <p className="card-description">
                <strong>Email:</strong> pankajkumawatew3004@gmail.com<br/>
                <strong>LinkedIn:</strong> https://www.linkedin.com/in/pankaj-kumawat-212527257/<br/>
                <strong>GitHub:</strong> https://github.com/pank3004<br/>
                <strong>Twitter:</strong> @yourhandle
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Send a Message</h3>
              
              {submitted && (
                <div className="success-message">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
