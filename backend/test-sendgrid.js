// Test SendGrid API Key
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Testing SendGrid Configuration ===');
console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
console.log('API Key preview:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 10) + '...' : 'NOT SET');
console.log('From Email:', process.env.SENDGRID_FROM_EMAIL);

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });

    console.log('\n📧 Attempting to send test email...');
    
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${process.env.SENDGRID_FROM_EMAIL}>`,
      to: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Test Email from Portfolio Platform',
      text: 'If you receive this, SendGrid is working!',
      html: '<b>If you receive this, SendGrid is working!</b>'
    });

    console.log('✅ SUCCESS! Email sent:', info.messageId);
    console.log('✅ Check your inbox:', process.env.SENDGRID_FROM_EMAIL);
  } catch (error) {
    console.error('❌ FAILED to send email:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

testEmail();
