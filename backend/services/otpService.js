// OTP Service
// Handles OTP generation, validation, and email sending
// Uses SendGrid HTTP API (works on ALL platforms including Render)

const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid HTTP API initialized');
} else {
  console.error('❌ SENDGRID_API_KEY not set - email sending will fail');
}

console.log('=== EMAIL SERVICE DEBUG ===');
console.log('📦 Using: @sendgrid/mail (HTTP API)');
console.log('🔑 SENDGRID_API_KEY set:', !!process.env.SENDGRID_API_KEY);
console.log('📧 EMAIL_USER set:', !!process.env.EMAIL_USER);
console.log('========================');

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Calculate OTP expiry time (5 minutes from now)
const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
};

// Send OTP via Email using SendGrid HTTP API
const sendOTPEmail = async (email, otp) => {
  try {
    console.log('📧 Attempting to send OTP email via SendGrid HTTP API...');
    console.log('📧 Recipient:', email);
    console.log('📧 From:', process.env.EMAIL_USER);

    // Determine sender email
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER || 'noreply@portfolio.com';
    
    const msg = {
      to: email,
      from: fromEmail, // Must be verified in SendGrid
      subject: '🔐 Your Login Verification Code',
      text: `Your OTP for login is: ${otp}. It will expire in 5 minutes.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .otp-box {
              background-color: #f8f9fa;
              border: 2px dashed #667eea;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              display: inline-block;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              text-align: left;
            }
            .warning-title {
              font-weight: bold;
              color: #856404;
              margin-bottom: 5px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6c757d;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Admin Login Verification</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
                Hello Admin,
              </p>
              <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
                You've requested to log in to your Portfolio Platform admin panel. 
                Use the verification code below to complete your login:
              </p>
              
              <div class="otp-box">
                <div style="font-size: 14px; color: #666; margin-bottom: 10px;">
                  Your Verification Code
                </div>
                <div class="otp-code">${otp}</div>
              </div>
              
              <p style="font-size: 14px; color: #666; margin: 20px 0;">
                This code will expire in <strong style="color: #dc3545;">5 minutes</strong> 
                and can only be used once.
              </p>
              
              <div class="warning">
                <div class="warning-title">⚠️ Security Notice</div>
                <div style="font-size: 13px; color: #856404;">
                  • Never share this code with anyone<br>
                  • If you didn't request this code, someone may be trying to access your account<br>
                  • Contact support immediately if you suspect unauthorized access
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 5px 0;">Portfolio Platform Admin Security</p>
              <p style="margin: 5px 0;">This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email using SendGrid HTTP API
    const response = await sgMail.send(msg);
    console.log('✅ OTP email sent successfully via SendGrid HTTP API');
    console.log('✅ Response status:', response[0].statusCode);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    
    // Log detailed error information from SendGrid
    if (error.response) {
      console.error('SendGrid Error Body:', error.response.body);
    }
    
    throw new Error('Failed to send OTP email');
  }
};

// Validate OTP
const validateOTP = (storedOTP, storedExpiry, inputOTP, isUsed) => {
  // Check if OTP has been used
  if (isUsed) {
    return { valid: false, message: 'OTP has already been used' };
  }

  // Check if OTP has expired
  if (new Date() > new Date(storedExpiry)) {
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }

  // Check if OTP matches
  if (storedOTP !== inputOTP) {
    return { valid: false, message: 'Invalid OTP. Please try again.' };
  }

  return { valid: true, message: 'OTP verified successfully' };
};

module.exports = {
  generateOTP,
  getOTPExpiry,
  sendOTPEmail,
  validateOTP
};
