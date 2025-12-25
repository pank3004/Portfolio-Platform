// Test SendGrid HTTP API
// Run with: node test-sendgrid-http.js

require('dotenv').config();
const sgMail = require('@sendgrid/mail');

console.log('=== Testing SendGrid HTTP API ===');
console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
console.log('API Key preview:', process.env.SENDGRID_API_KEY?.substring(0, 10) + '...');
console.log('From Email:', process.env.EMAIL_USER);
console.log('');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Test email
async function testSendGrid() {
  console.log('📧 Sending test email via SendGrid HTTP API...');
  
  const msg = {
    to: process.env.EMAIL_USER,
    from: process.env.EMAIL_USER, // Must be verified in SendGrid
    subject: 'Test Email - SendGrid HTTP API',
    text: 'This is a test email sent via SendGrid HTTP API',
    html: '<p>This is a test email sent via <strong>SendGrid HTTP API</strong></p><p>✅ If you receive this, your setup is working!</p>'
  };

  try {
    const response = await sgMail.send(msg);
    console.log('✅ Email sent successfully!');
    console.log('Status Code:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    console.log('');
    console.log('✅ SendGrid HTTP API is working correctly!');
    console.log('You can now deploy to Render safely.');
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    
    if (error.response) {
      console.error('Error details:', error.response.body);
    }
    
    console.log('');
    console.log('Please check:');
    console.log('1. SENDGRID_API_KEY is valid (not expired)');
    console.log('2. Sender email is verified in SendGrid:');
    console.log('   https://app.sendgrid.com/settings/sender_auth/senders');
    console.log('3. API key has "Mail Send" permissions');
    
    return false;
  }
}

testSendGrid().then(success => {
  process.exit(success ? 0 : 1);
});
