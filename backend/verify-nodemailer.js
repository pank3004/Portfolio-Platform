// Quick script to verify nodemailer installation
// Run: node verify-nodemailer.js

try {
  const nodemailer = require('nodemailer');
  const version = require('./node_modules/nodemailer/package.json').version;
  
  console.log('✅ Nodemailer loaded successfully!');
  console.log('📦 Version:', version);
  console.log('🔍 createTransporter available:', typeof nodemailer.createTransporter === 'function');
  
  if (typeof nodemailer.createTransporter === 'function') {
    console.log('✅ All good! nodemailer.createTransporter is working');
  } else {
    console.log('❌ ERROR: createTransporter is not a function!');
  }
} catch (error) {
  console.error('❌ Error loading nodemailer:', error.message);
}
