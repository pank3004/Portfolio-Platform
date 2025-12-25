// Admin Settings Component
// Page for admin to reset email and password

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetEmail, resetPassword } from '../utils/api';

function AdminSettings() {
  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    });
    setEmailError('');
    setEmailSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');
    setEmailLoading(true);

    try {
      const response = await resetEmail(emailData);
      
      if (response.data.success) {
        setEmailSuccess('Email updated successfully! Please login again.');
        
        // Update stored email
        localStorage.setItem('adminEmail', emailData.newEmail);
        
        // Clear form
        setEmailData({ newEmail: '', password: '' });
        
        // Logout after 2 seconds
        setTimeout(() => {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminEmail');
          navigate('/admin/login');
        }, 2000);
      }
    } catch (err) {
      setEmailError(err.response?.data?.message || 'Failed to update email');
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await resetPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response.data.success) {
        setPasswordSuccess('Password updated successfully!');
        
        // Clear form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="section-title">⚙️ Admin Settings</h1>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            
            {/* Reset Email Card */}
            <div className="card">
              <div className="card-content">
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>📧 Change Email</h3>
                
                {emailError && (
                  <div className="error-message" style={{ marginBottom: '1rem' }}>
                    {emailError}
                  </div>
                )}

                {emailSuccess && (
                  <div style={{ 
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #c3e6cb'
                  }}>
                    {emailSuccess}
                  </div>
                )}
                
                <form onSubmit={handleEmailSubmit}>
                  <div className="form-group">
                    <label className="form-label">New Email</label>
                    <input
                      type="email"
                      name="newEmail"
                      className="form-input"
                      value={emailData.newEmail}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Current Password (for verification)</label>
                    <input
                      type="password"
                      name="password"
                      className="form-input"
                      value={emailData.password}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={emailLoading}
                  >
                    {emailLoading ? 'Updating...' : 'Update Email'}
                  </button>

                  <p style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.85rem', 
                    color: '#dc3545'
                  }}>
                    ⚠️ You will be logged out after changing your email.
                  </p>
                </form>
              </div>
            </div>

            {/* Reset Password Card */}
            <div className="card">
              <div className="card-content">
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>🔒 Change Password</h3>
                
                {passwordError && (
                  <div className="error-message" style={{ marginBottom: '1rem' }}>
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div style={{ 
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #c3e6cb'
                  }}>
                    {passwordSuccess}
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="form-input"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-input"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                    />
                    <small style={{ color: '#666', fontSize: '0.85rem' }}>
                      Must be at least 6 characters
                    </small>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-input"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => navigate('/admin/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                fontSize: '0.95rem',
                textDecoration: 'underline'
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
