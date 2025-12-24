# 📌 QUICK REFERENCE CARD

## 🚀 START THE APPLICATION

### Terminal 1 - Backend
```bash
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\backend
npm start
```
**OR for auto-restart on changes:**
```bash
npm run dev
```

### Terminal 2 - Frontend
```bash
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\frontend
npm start
```

---

## 🔑 DEFAULT ADMIN CREDENTIALS

```
Email:    admin@portfolio.com
Password: admin123
```

**⚠️ Change these after first login!**

---

## 🌐 IMPORTANT URLS

### Public Website
- Home: http://localhost:3000/
- Projects: http://localhost:3000/projects
- Study Materials: http://localhost:3000/study-materials
- Blogs: http://localhost:3000/blogs
- AI Updates: http://localhost:3000/ai-updates

### Admin Panel
- 🔐 Login: http://localhost:3000/admin/login
- 📊 Dashboard: http://localhost:3000/admin/dashboard
- 📁 Projects: http://localhost:3000/admin/projects
- 📚 Materials: http://localhost:3000/admin/study-materials
- ✍️ Blogs: http://localhost:3000/admin/blogs
- 🤖 AI Updates: http://localhost:3000/admin/ai-updates

### Backend API
- Test: http://localhost:5000/
- Login: http://localhost:5000/api/auth/login
- Create Admin: http://localhost:5000/api/auth/create-admin

---

## 📦 INSTALLATION COMMANDS

### First Time Setup
```bash
# Backend
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\backend
npm install

# Frontend
cd C:\Users\91830\OneDrive\Desktop\portfolio-platform\frontend
npm install
```

---

## 🛠️ USEFUL COMMANDS

### Stop Servers
- Press `Ctrl + C` in the terminal

### Check Node/NPM Version
```bash
node --version
npm --version
```

### Clear npm Cache (if issues)
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Check if Port is in Use
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill a process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

## 🗄️ MONGODB COMMANDS

### Local MongoDB
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service (Windows)
net stop MongoDB

# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use portfolio database
use portfolio_db

# Show collections
show collections

# Find all admins
db.admins.find().pretty()

# Count admins
db.admins.countDocuments()
```

---

## 🔧 TROUBLESHOOTING QUICK FIXES

### Admin Login Not Working
```bash
# Check backend console for "Admin created" message
# If not created, restart backend server

# Or manually create admin:
curl -X POST http://localhost:5000/api/auth/create-admin ^
-H "Content-Type: application/json" ^
-d "{\"email\":\"admin@portfolio.com\",\"password\":\"admin123\",\"name\":\"Administrator\"}"
```

### Clear Browser Data
1. Open browser
2. Press `Ctrl + Shift + Delete`
3. Select "Cookies and other site data"
4. Click "Clear data"

### Backend Won't Start
1. Check if MongoDB is running
2. Verify .env file exists
3. Check port 5000 is free
4. Run `npm install` again

### Frontend Won't Start
1. Check if backend is running first
2. Run `npm install` again
3. Check port 3000 is free
4. Clear npm cache

---

## 📝 FILE LOCATIONS

### Backend Files
```
backend/
├── server.js              # Main server file
├── .env                   # Environment variables
├── package.json           # Dependencies
├── models/
│   └── Admin.js          # Admin model
├── controllers/
│   └── authController.js # Auth logic
├── routes/
│   └── authRoutes.js     # Auth routes
└── scripts/
    └── initAdmin.js      # Auto-create admin
```

### Frontend Files
```
frontend/
├── src/
│   ├── admin/
│   │   └── AdminLogin.js # Login page
│   ├── utils/
│   │   └── api.js       # API calls
│   └── App.js           # Main app
└── package.json
```

---

## 🔐 ENVIRONMENT VARIABLES (.env)

```env
MONGODB_URI=mongodb+srv://your-connection-string
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

---

## 📊 SUCCESS INDICATORS

✅ Backend running: See "Server running on port 5000"
✅ MongoDB connected: See "MongoDB Connected Successfully"
✅ Admin created: See "Default admin created successfully!"
✅ Frontend running: Browser opens to localhost:3000
✅ Can login: Redirected to /admin/dashboard

---

## 🆘 EMERGENCY RESET

If everything breaks:
```bash
# 1. Stop all servers (Ctrl+C)

# 2. Delete node_modules in both folders
cd backend
rm -rf node_modules
cd ../frontend
rm -rf node_modules

# 3. Reinstall everything
cd ../backend
npm install
cd ../frontend
npm install

# 4. Check MongoDB is running

# 5. Start backend first, then frontend
```

---

## 💡 PRO TIPS

1. **Always start backend before frontend**
2. **Keep both terminals open** while working
3. **Check console for errors** if something breaks
4. **Use npm run dev** in backend for auto-restart
5. **Bookmark admin URLs** for quick access
6. **Save .env file** - don't delete it!
7. **Take MongoDB Atlas backup** regularly

---

## 📱 MOBILE TESTING

The site is responsive! Test on mobile by:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Use `http://YOUR_IP:3000` on mobile
3. Make sure mobile is on same WiFi network

---

## 📞 NEED MORE HELP?

📖 Full Guide: `BEGINNERS_GUIDE.md`
📚 Detailed Info: `README.md`
🔍 Check backend console for errors
💬 Error messages usually tell you what's wrong

---

**Last Updated:** December 2024
**Quick Access:** Keep this file open for easy reference!
