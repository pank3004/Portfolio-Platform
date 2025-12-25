// Add this at the very top of your otpService.js to debug on Render
console.log('=== NODEMAILER DEBUG ===');
console.log('Nodemailer version:', require('../node_modules/nodemailer/package.json').version);
console.log('createTransporter exists:', typeof require('nodemailer').createTransporter === 'function');
console.log('SENDGRID_API_KEY set:', !!process.env.SENDGRID_API_KEY);
console.log('EMAIL_USER set:', !!process.env.EMAIL_USER);
console.log('========================');

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Rest of your otpService.js code...
