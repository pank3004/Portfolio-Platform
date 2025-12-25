// Admin Login Page Component
// Login page for admin authentication with 2-step verification

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../utils/api';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(credentials);
      
      if (response.data.success && response.data.requiresOTP) {
        // Step 1 successful, redirect to OTP verification
        navigate('/admin/verify-otp', {
          state: {
            tempToken: response.data.tempToken,
            email: response.data.email
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1 className="section-title">Admin Login</h1>
          
          <div className="card">
            <div className="card-content">
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔐</span>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  fontSize: '0.9rem', 
                  color: '#666' 
                }}>
                  Two-Step Authentication Enabled
                </p>
              </div>

              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  {loading ? 'Verifying...' : 'Continue to OTP'}
                </button>
              </form>
              
              <p style={{ 
                marginTop: '1.5rem', 
                fontSize: '0.85rem', 
                color: '#666',
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#fff3cd',
                borderRadius: '4px',
                border: '1px solid #ffc107'
              }}>
                📧 After login, you'll receive a verification code via email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
