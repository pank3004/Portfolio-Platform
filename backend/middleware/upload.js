// File Upload Middleware
// This configures Multer for handling file uploads with Cloudinary

const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio-uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed file types
    resource_type: 'auto', // Automatically detect resource type (image/pdf)
    public_id: (req, file) => {
      // Create unique filename: timestamp + random number
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = uniqueSuffix + '-' + file.originalname.replace(/\.[^/.]+$/, "");
      return fileName;
    }
  }
});

// Filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  // Get file extension
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Allow only PDF, JPG, JPEG, and PNG files
  if (ext === '.pdf' || ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDF and image files are allowed'), false); // Reject file
  }
};

// Create multer upload instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

module.exports = upload;
