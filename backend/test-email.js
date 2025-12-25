// Quick test to check if nodemailer is working
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing nodemailer...');
console.log('nodemailer:', nodemailer);
console.log('createTransport:', typeof nodemailer.createTransport);

if (typeof nodemailer.createTransport === 'function') {
  console.log('✅ nodemailer.createTransport is available!');
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    console.log('✅ Transporter created successfully!');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password set:', !!process.env.EMAIL_PASSWORD);
    
    // Try to verify connection
    transporter.verify(function(error, success) {
      if (error) {
        console.log('❌ SMTP Connection Error:', error.message);
      } else {
        console.log('✅ Server is ready to take our messages');
      }
      process.exit();
    });
    
  } catch (error) {
    console.log('❌ Error creating transporter:', error);
  }
} else {
  console.log('❌ nodemailer.createTransport is NOT a function!');
  console.log('This means nodemailer is not properly installed.');
}
