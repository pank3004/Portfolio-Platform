// OTP Service
// Handles OTP generation, validation, and email sending

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure email transporter
function createTransporter() {
  // Check if using SendGrid (recommended for production)
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransporter({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey', // This is literal string 'apikey'
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
  // Fallback to Gmail (for local development only)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    console.log('⚠️  Using Gmail SMTP - This may not work on cloud platforms like Render');
    return nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  
  throw new Error('Email configuration missing. Please set SENDGRID_API_KEY or EMAIL_USER/EMAIL_PASSWORD');
}

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Calculate OTP expiry time (5 minutes from now)
const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
};

// Send OTP via Email
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    // Determine sender email
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER || 'noreply@portfolio.com';
    
    const mailOptions = {
      from: `"Portfolio Platform Security" <${fromEmail}>`,
      to: email,
      subject: '🔐 Your Login Verification Code',
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

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
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
