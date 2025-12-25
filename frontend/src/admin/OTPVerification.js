// OTP Verification Component
// Screen for entering OTP received via email

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../utils/api';

function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  const tempToken = location.state?.tempToken;
  const email = location.state?.email;

  useEffect(() => {
    // Redirect if no temp token
    if (!tempToken) {
      navigate('/admin/login');
      return;
    }

    // Countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tempToken, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOTP({ otp }, tempToken);
      
      if (response.data.success) {
        setSuccess('OTP verified! Redirecting to dashboard...');
        
        // Save token to localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminEmail', response.data.admin.email);
        
        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResendLoading(true);

    try {
      const response = await resendOTP(tempToken);
      
      if (response.data.success) {
        setSuccess('New OTP sent to your email!');
        setTimer(300); // Reset timer
        setOtp(''); // Clear OTP input
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: '450px', margin: '0 auto' }}>
          <h1 className="section-title">🔐 Verify Your Identity</h1>
          
          <div className="card">
            <div className="card-content">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '0.5rem',
                  filter: 'grayscale(100%)'
                }}>
                  📧
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  We've sent a 6-digit verification code to:
                </p>
                <p style={{ 
                  fontWeight: 'bold', 
                  color: '#667eea',
                  marginTop: '0.5rem',
                  fontSize: '1.05rem'
                }}>
                  {email || 'your email'}
                </p>
              </div>

              {error && (
                <div className="error-message" style={{ marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{ 
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '0.75rem 1rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  border: '1px solid #c3e6cb'
                }}>
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ textAlign: 'center', display: 'block' }}>
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="form-input"
                    value={otp}
                    onChange={handleChange}
                    placeholder="000000"
                    maxLength={6}
                    required
                    autoFocus
                    style={{
                      textAlign: 'center',
                      fontSize: '1.8rem',
                      letterSpacing: '0.5rem',
                      fontWeight: 'bold',
                      fontFamily: 'monospace'
                    }}
                  />
                  <small style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    color: timer > 60 ? '#28a745' : '#dc3545',
                    marginTop: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {timer > 0 ? `Code expires in ${formatTime(timer)}` : 'Code expired'}
                  </small>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading || otp.length !== 6 || timer === 0}
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading || timer > 240}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    backgroundColor: 'transparent',
                    color: '#667eea',
                    border: '1px solid #667eea',
                    borderRadius: '4px',
                    cursor: timer > 240 ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    opacity: timer > 240 ? 0.5 : 1
                  }}
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </button>

                <p style={{ 
                  marginTop: '1.5rem', 
                  fontSize: '0.85rem', 
                  color: '#666',
                  textAlign: 'center'
                }}>
                  Didn't receive the code? Check your spam folder or click resend.
                </p>
              </form>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => navigate('/admin/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
