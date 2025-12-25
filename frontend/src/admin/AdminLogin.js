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
  const [loadingMessage, setLoadingMessage] = useState('Verifying...');
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
    setLoadingMessage('Verifying...');

    // Show "waking up" message after 5 seconds
    const wakingTimeout = setTimeout(() => {
      setLoadingMessage('Waking up server... (This may take 30-60 seconds on first request)');
    }, 5000);

    try {
      const response = await loginAdmin(credentials);
      clearTimeout(wakingTimeout);
      
      if (response.data.success && response.data.requiresOTP) {
        setLoadingMessage('Sending OTP...');
        // Step 1 successful, redirect to OTP verification
        navigate('/admin/verify-otp', {
          state: {
            tempToken: response.data.tempToken,
            email: response.data.email
          }
        });
      }
    } catch (err) {
      clearTimeout(wakingTimeout);
      
      // Better error messages
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. The server might be sleeping. Please try again.');
      } else if (err.response?.status === 500) {
        setError(err.response?.data?.message || 'Server error. Please check if email is configured correctly.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      }
      
      console.error('Login error:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data
      });
    } finally {
      setLoading(false);
      clearTimeout(wakingTimeout);
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

              {error && (
                <div className="error-message" style={{ 
                  whiteSpace: 'pre-wrap',
                  marginBottom: '1rem'
                }}>
                  {error}
                </div>
              )}
              
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  {loading ? loadingMessage : 'Continue to OTP'}
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

              {loading && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#e7f3ff',
                  border: '1px solid #b3d9ff',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: '#004085',
                  textAlign: 'center'
                }}>
                  ⏳ First request may take 30-60 seconds if the server was sleeping...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
