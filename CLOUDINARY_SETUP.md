# Cloudinary Setup Instructions

## Problem Fixed
Images uploaded through admin panel weren't showing on Render because Render uses ephemeral storage. Now using Cloudinary for permanent cloud storage.

## Setup Steps

### 1. Create Cloudinary Account
1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. After signing up, go to your Dashboard

### 2. Get Cloudinary Credentials
From your Cloudinary Dashboard, you'll see:
- **Cloud Name**
- **API Key**
- **API Secret**

### 3. Update Local .env File
Open `backend/.env` and update these values:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### 4. Install Dependencies
```bash
cd backend
npm install
```

This will install:
- `cloudinary` - Cloudinary SDK
- `multer-storage-cloudinary` - Multer storage engine for Cloudinary

### 5. Test Locally
```bash
npm run dev
```

Try uploading an image through admin panel. It should now upload to Cloudinary instead of local storage.

### 6. Update Render Environment Variables
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add these three environment variables:
   - `CLOUDINARY_CLOUD_NAME` = your_actual_cloud_name
   - `CLOUDINARY_API_KEY` = your_actual_api_key
   - `CLOUDINARY_API_SECRET` = your_actual_api_secret
5. Click "Save Changes"

### 7. Redeploy on Render
Render will automatically redeploy when you push to GitHub. Or manually trigger a deploy from Render dashboard.

## What Changed

### Files Modified:
1. **backend/.env** - Added Cloudinary credentials
2. **backend/package.json** - Added `cloudinary` and `multer-storage-cloudinary`
3. **backend/config/cloudinary.js** - New file for Cloudinary configuration
4. **backend/middleware/upload.js** - Updated to use Cloudinary storage instead of local disk
5. **backend/controllers/** - Updated all controllers to use `req.file.path` (Cloudinary URL) instead of `req.file.filename`
   - projectController.js
   - blogController.js
   - aiUpdateController.js
   - studyMaterialController.js
6. **backend/server.js** - Removed static file serving (no longer needed)

### How It Works Now:
- When you upload an image, it goes directly to Cloudinary
- Cloudinary returns a permanent URL (e.g., `https://res.cloudinary.com/your-cloud/image/upload/...`)
- This URL is saved in MongoDB
- Images are served from Cloudinary CDN (fast and reliable)
- Images persist even when Render restarts

## Testing
1. Login to admin panel
2. Upload a new project/blog/AI update with an image
3. Check if the image displays correctly
4. The image URL should start with `https://res.cloudinary.com/`

## Troubleshooting

### Images still not showing?
- Make sure you added all 3 Cloudinary env variables on Render
- Check Render logs for any Cloudinary errors
- Verify your Cloudinary credentials are correct

### Old images with /uploads/ path?
- Old images uploaded before this change won't work
- You'll need to re-upload them through admin panel
- Or manually update the database URLs to point to Cloudinary

## Benefits of Cloudinary
✅ Permanent storage (survives server restarts)
✅ Fast CDN delivery worldwide
✅ Automatic image optimization
✅ 25GB free storage
✅ Image transformations on-the-fly
