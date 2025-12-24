// File Upload Middleware
// This configures Multer for handling file uploads (PDFs, images)

const multer = require('multer');
const path = require('path');

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  // Set destination folder for uploads
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
  },
  // Set filename for uploaded files
  filename: function (req, file, cb) {
    // Create unique filename: timestamp + original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
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
