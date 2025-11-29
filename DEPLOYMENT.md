# GreenBites Deployment Guide

## Prerequisites
- GitHub account with your code pushed
- MongoDB Atlas account (already set up)

## Backend Deployment (Render.com - FREE)

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `GreenBites-H`
3. Configure the service:
   - **Name**: `greenbites-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables
In the "Environment" section, add:
```
MONGODB_URI=mongodb+srv://2400031537_db_user:KzFxjCsK7w3jkNDJ@cluster0.400i9xb.mongodb.net/greenbites?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
NODE_ENV=production
PORT=5000
```

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Copy your backend URL (e.g., `https://greenbites-backend.onrender.com`)

---

## Frontend Deployment (Vercel - FREE)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select your `GreenBites-H` repository
3. Vercel will auto-detect Vite configuration

### Step 3: Configure Environment Variables
In "Environment Variables", add:
```
VITE_API_URL=https://greenbites-backend.onrender.com/api
```
(Replace with your actual Render backend URL from Step 4 above)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Your app will be live at: `https://greenbites-h.vercel.app`

---

## Alternative Deployment Options

### Backend Alternatives
- **Railway.app**: Similar to Render, very easy
- **Cyclic.sh**: Great for Node.js apps
- **Heroku**: More features but paid

### Frontend Alternatives
- **Netlify**: Similar to Vercel
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Add `VITE_API_URL` environment variable

---

## Post-Deployment Checklist

### 1. Update MongoDB Atlas IP Whitelist
Since your backend is now on a cloud server:
1. Go to MongoDB Atlas → Network Access
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 2. Test Your Deployed App
- Visit your Vercel URL
- Try registering a new user
- Create a donation
- Check MongoDB Atlas to verify data is saved

### 3. Update CORS Settings (if needed)
If you get CORS errors, update `server/server.js`:
```javascript
app.use(cors({
  origin: ['https://greenbites-h.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

---

## Quick Deployment Commands

### For Render (Backend)
```bash
# No commands needed - Render auto-deploys from GitHub
# Just push to main branch and it deploys automatically
git add .
git commit -m "Your changes"
git push origin main
```

### For Vercel (Frontend)
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from terminal
vercel

# Or just push to GitHub - Vercel auto-deploys
git push origin main
```

---

## Environment Variables Summary

### Frontend (.env.local)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (.env on Render)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=5000
```

---

## Troubleshooting

### Backend Issues
- **503 Service Unavailable**: Render free tier spins down after inactivity, first request may take 30 seconds
- **MongoDB Connection Failed**: Check IP whitelist and connection string
- **Environment Variables**: Verify all variables are set correctly in Render dashboard

### Frontend Issues
- **API Errors**: Verify `VITE_API_URL` is set correctly in Vercel
- **404 on Refresh**: Vercel handles this automatically for Vite apps
- **Build Failed**: Check build logs in Vercel dashboard

### CORS Issues
Add your Vercel URL to CORS in `server/server.js`:
```javascript
const corsOptions = {
  origin: [
    'https://greenbites-h.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

---

## Monitoring Your App

### Render Dashboard
- View logs: Click on your service → "Logs" tab
- Check metrics: CPU, Memory usage
- Environment: Update environment variables

### Vercel Dashboard
- View deployments: All deployments and previews
- Analytics: Traffic and performance
- Logs: Runtime and build logs

### MongoDB Atlas
- Database monitoring
- View collections and data
- Performance metrics

---

## Cost Estimates

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Render** | 750 hours/month per service | From $7/month |
| **Vercel** | Unlimited projects | Pro: $20/month |
| **MongoDB Atlas** | 512MB storage | From $9/month |

**Total Cost for Free Tier**: $0/month ✅

---

## Next Steps

1. Deploy backend to Render
2. Get backend URL
3. Deploy frontend to Vercel with backend URL
4. Update MongoDB IP whitelist
5. Test the live application
6. Share your app URL with users!

Your app will be accessible from anywhere at:
- **Frontend**: `https://greenbites-h.vercel.app`
- **Backend API**: `https://greenbites-backend.onrender.com`
