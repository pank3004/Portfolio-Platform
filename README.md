# Portfolio Platform - MERN Stack

A full-featured portfolio website with content management system built using MongoDB, Express.js, React, and Node.js.

## 📋 Features

- **Portfolio Website**: Showcase your projects, skills, and experience
- **Content Management**: Admin panel to manage projects, blogs, study materials, and AI updates
- **Study Materials Platform**: Organize learning resources by category (Python, ML, DL, Generative AI, Agentic AI)
- **Blog & Newsletter**: Publish articles and newsletters
- **AI Updates**: Share latest AI and tech news
- **Authentication**: Secure two-step JWT-based admin authentication with OTP verification
- **Two-Factor Auth**: Email-based OTP verification for enhanced security
- **Admin Security**: Protected credential reset with JWT authentication
- **File Uploads**: Support for images and PDFs
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Project Structure

```
portfolio-platform/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication & file upload
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── .env             # Environment variables
│   ├── server.js        # Express server
│   └── package.json     # Backend dependencies
└── frontend/
    ├── public/          # Static files
    ├── src/
    │   ├── admin/       # Admin panel components
    │   ├── components/  # Reusable components
    │   ├── pages/       # Public pages
    │   ├── utils/       # API utilities
    │   ├── App.js       # Main app component
    │   ├── App.css      # Global styles
    │   └── index.js     # React entry point
    └── package.json     # Frontend dependencies
```

## 🚀 Installation Guide

### Prerequisites

Before you start, make sure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the instructions
4. Open Command Prompt and verify:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install MongoDB

**Option A: Local Installation**
1. Visit https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for your operating system
3. Run the installer
4. During installation, select "Install MongoDB as a Service"
5. Start MongoDB service:
   - Windows: It should start automatically
   - Check if running: Open Services and look for "MongoDB"

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `backend/.env` with your connection string

### Step 3: Install Project Dependencies

Open Command Prompt or Terminal and navigate to the project folder:

```bash
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform
```

**Install Backend Dependencies:**
```bash
cd backend
npm install
```

**Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

The `.env` file is already created in the `backend` folder. You need to add your email credentials:

```
MONGODB_URI=mongodb://localhost:27017/portfolio_db
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123

# Email Configuration (REQUIRED for OTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

**⚠️ IMPORTANT - Gmail App Password Setup:**

For OTP to work, you need a Gmail App Password (NOT your regular Gmail password):

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Go back to Security and click **App passwords**
5. Select **Mail** and **Other (Custom name)**
6. Name it "Portfolio OTP" and click **Generate**
7. Copy the 16-character password (no spaces)
8. Paste it in `.env` as `EMAIL_PASSWORD`
9. Set `EMAIL_USER` to your Gmail address

**If using MongoDB Atlas:**
Replace `MONGODB_URI` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
```

### Step 5: Admin User Auto-Creation ✨

**Good News!** The admin user is automatically created when you start the server!

When you start the backend server for the FIRST TIME, it will:
1. Check if any admin exists in the database
2. If NO admin exists, it automatically creates one with:
   - Email: admin@portfolio.com
   - Password: admin123
3. You'll see a success message in the console

**You don't need to do anything!** Just start the server and the admin will be ready.

⚠️ **IMPORTANT**: After your first login, please change the default password for security!

## ▶️ Running the Application

You need to run both backend and frontend servers:

### Terminal 1 - Backend Server

```bash
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\backend
npm start
```

Backend will run on: http://localhost:5000

### Terminal 2 - Frontend Server

Open a new terminal:

```bash
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\frontend
npm start
```

Frontend will run on: http://localhost:3000

The browser should automatically open. If not, visit http://localhost:3000

## 📱 Using the Application

### Public Pages

- **Home**: http://localhost:3000/
- **About**: http://localhost:3000/about
- **Skills**: http://localhost:3000/skills
- **Projects**: http://localhost:3000/projects
- **Study Materials**: http://localhost:3000/study-materials
- **Blogs**: http://localhost:3000/blogs
- **AI Updates**: http://localhost:3000/ai-updates
- **Contact**: http://localhost:3000/contact

### Admin Panel

1. **Login (Two-Step Process)**: http://localhost:3000/admin/login
   
   **Step 1 - Email & Password:**
   - Email: admin@portfolio.com
   - Password: admin123
   - Click "Continue to OTP"
   
   **Step 2 - OTP Verification:**
   - Check your email for the 6-digit code
   - Enter the OTP within 5 minutes
   - Click "Verify & Login"
   - You're now logged in with full access!

2. **Dashboard**: http://localhost:3000/admin/dashboard

3. **Settings**: http://localhost:3000/admin/settings
   - Change your admin email
   - Change your admin password
   - Both require current password verification

4. **Manage Content**:
   - Projects: http://localhost:3000/admin/projects
   - Study Materials: http://localhost:3000/admin/study-materials
   - Blogs: http://localhost:3000/admin/blogs
   - AI Updates: http://localhost:3000/admin/ai-updates

### How to Upload Content

**Adding a Project:**
1. Go to Admin Panel → Manage Projects
2. Click "Add New Project"
3. Fill in the form:
   - Title: Project name
   - Description: What the project does
   - Technologies: Comma-separated list (e.g., React, Node.js, MongoDB)
   - GitHub Link: Repository URL
   - Live Link: Deployed project URL
   - Image: Upload a screenshot
4. Click "Create Project"

**Adding Study Material:**
1. Go to Admin Panel → Manage Study Materials
2. Click "Add New Material"
3. Choose category (Python, ML, DL, Generative AI, Agentic AI)
4. Choose type:
   - **Link**: External URL to a resource
   - **PDF**: Upload a PDF file
   - **Text**: Write content directly
5. Click "Create Material"

**Adding a Blog:**
1. Go to Admin Panel → Manage Blogs
2. Click "Add New Blog"
3. Fill in title and content
4. Choose type: Blog or Newsletter
5. Add tags (optional)
6. Upload featured image (optional)
7. Click "Create Blog"

**Adding AI Update:**
1. Go to Admin Panel → Manage AI Updates
2. Click "Add New Update"
3. Fill in title and content
4. Add source link
5. Specify category
6. Click "Create Update"

## 🔧 API Endpoints

### Authentication
- POST `/api/auth/create-admin` - Create admin user
- POST `/api/auth/login` - Step 1: Email & password verification (returns temp token)
- POST `/api/auth/verify-otp` - Step 2: OTP verification (returns access token)
- POST `/api/auth/resend-otp` - Resend OTP if expired
- POST `/api/auth/reset-email` - Change admin email (JWT protected)
- POST `/api/auth/reset-password` - Change admin password (JWT protected)
- GET `/api/auth/me` - Get current admin info (JWT protected)

### Projects
- GET `/api/projects` - Get all active projects
- GET `/api/projects/:id` - Get single project
- POST `/api/projects` - Create project (admin)
- PUT `/api/projects/:id` - Update project (admin)
- DELETE `/api/projects/:id` - Delete project (admin)

### Study Materials
- GET `/api/study-materials` - Get all materials
- GET `/api/study-materials/category/:category` - Get by category
- POST `/api/study-materials` - Create material (admin)
- PUT `/api/study-materials/:id` - Update material (admin)
- DELETE `/api/study-materials/:id` - Delete material (admin)

### Blogs
- GET `/api/blogs` - Get all blogs
- GET `/api/blogs/:id` - Get single blog
- POST `/api/blogs` - Create blog (admin)
- PUT `/api/blogs/:id` - Update blog (admin)
- DELETE `/api/blogs/:id` - Delete blog (admin)

### AI Updates
- GET `/api/ai-updates` - Get all updates
- GET `/api/ai-updates/:id` - Get single update
- POST `/api/ai-updates` - Create update (admin)
- PUT `/api/ai-updates/:id` - Update update (admin)
- DELETE `/api/ai-updates/:id` - Delete update (admin)

## 🛠️ Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Make sure port 5000 is not in use

### Frontend won't start
- Check if backend is running first
- Verify all npm packages are installed
- Make sure port 3000 is not in use

### Cannot login to admin
- **First time?** Make sure the backend server started successfully and you saw the "Admin created" message
- Use these exact credentials:
  - Email: `admin@portfolio.com`
  - Password: `admin123`
- Check the backend console - it will show if admin was created
- Clear browser cache and localStorage
- If still failing, manually create admin:
  ```bash
  curl -X POST http://localhost:5000/api/auth/create-admin -H "Content-Type: application/json" -d "{\"email\":\"admin@portfolio.com\",\"password\":\"admin123\",\"name\":\"Administrator\"}"
  ```

### Not receiving OTP emails
- **Check spam folder**: OTP emails might be in spam
- **Verify email configuration in `.env`**:
  - `EMAIL_USER` must be your Gmail address
  - `EMAIL_PASSWORD` must be App Password (16 characters), not regular password
- **Gmail App Password**: Make sure you generated an App Password correctly
- **2-Step Verification**: Must be enabled on your Google Account
- **Check backend console**: Look for email sending errors
- **Test email credentials**: Send a test email manually
- **Alternative**: Use a different Gmail account if current one has issues

### OTP expired or invalid
- OTP expires in **5 minutes** - enter it quickly
- Each OTP can only be used **once**
- Click "Resend Code" to get a new OTP
- Don't refresh the page after getting OTP
- Check your system time is correct

### Rate limit errors
- **"Too many requests"**: Wait for the specified time (15 min or 1 hour)
- Rate limits are per IP address
- Don't spam login/OTP buttons
- This is a security feature to prevent brute force attacks

### File uploads not working
- Check `backend/uploads` folder exists
- Verify file size is under 10MB
- Only PDF, JPG, JPEG, PNG files are allowed

### MongoDB connection error
- Verify MongoDB service is running
- Check connection string in `.env`
- If using Atlas, check IP whitelist settings

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` folder.

## 🎨 Customization

### Change Colors
Edit `frontend/src/App.css` and modify the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Skills
Edit `frontend/src/pages/Skills.js` and add to the `skillsData` array.

### Modify About Page
Edit `frontend/src/pages/About.js` to add your information.

### Change Admin Credentials
After first login, you can create a new admin user via API or modify the database directly.

## 🔒 Security Features

### Two-Step Authentication
The admin panel uses enhanced two-step authentication:

1. **Step 1**: Email + Password verification
2. **Step 2**: OTP verification via email

Even if someone knows your password, they cannot access the admin panel without the OTP sent to your email.

### OTP Security
- **6-digit numeric code**: Random generation for each login
- **5-minute expiration**: Codes expire quickly to prevent misuse
- **Single-use only**: Each OTP can only be used once
- **Automatic cleanup**: OTP data is cleared after successful verification
- **Beautiful email template**: Professional HTML emails with security warnings

### JWT Token Types
- **Temporary Token**: Valid for 10 minutes, only for OTP verification
- **Access Token**: Valid for 7 days, grants full admin access
- **Type validation**: Middleware ensures correct token type for each operation

### Rate Limiting
Protection against brute force attacks:
- **Login**: 10 attempts per 15 minutes
- **OTP Verification**: 10 attempts per 15 minutes
- **Resend OTP**: 5 attempts per 15 minutes
- **Credential Reset**: 3 attempts per hour

### Protected Operations
Admin credential changes (email/password) require:
- Valid JWT access token
- Current password verification
- Automatic logout after email change

### Email Configuration
Secure email sending via Gmail SMTP:
- Uses App Passwords (not regular Gmail password)
- TLS encryption for email transmission
- Professional HTML email templates
- Clear security warnings in emails

## 📚 Technologies Used

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with two-step verification
- **Email Service**: Nodemailer with Gmail SMTP
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer
- **Security**: bcryptjs for password hashing, crypto for OTP generation

## 💡 Tips for Beginners

1. **Start Simple**: Begin by adding one project, then expand
2. **Use MongoDB Atlas**: It's free and easier than local MongoDB
3. **Check Console**: Always check browser console for errors
4. **Read Error Messages**: They usually tell you what's wrong
5. **Backup Data**: Regularly backup your MongoDB database

## 🚨 Important Notes

- Change JWT_SECRET in production
- Change default admin password immediately
- Never commit `.env` file to version control
- Keep your MongoDB connection string private
- Regularly update npm packages for security

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all services are running
3. Make sure all dependencies are installed
4. Check MongoDB connection

## 📄 License

This project is open source and available for personal and commercial use.

---

**Created with ❤️ using MERN Stack**
