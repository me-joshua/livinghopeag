# Vercel Backend Deployment Guide

## Overview
This guide explains how to deploy your FastAPI backend to Vercel using serverless functions.

## Prerequisites
1. Vercel account (https://vercel.com)
2. GitHub repository with your code
3. Environment variables configured

## Step 1: File Structure
Your backend should have these files:
```
backend/
├── server.py (main FastAPI app)
├── database.py
├── requirements.txt
├── vercel.json (Vercel configuration)
├── .env.example (environment template)
└── livinghope.db (your database file)
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your backend directory:
   ```bash
   cd backend
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```

### Option B: Via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Set Root Directory to "backend"
5. Vercel will auto-detect it as a Python project

## Step 3: Environment Variables
In Vercel dashboard, go to Settings > Environment Variables and add:

### Required Variables:
```
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440
CORS_ORIGINS=http://localhost:3000,https://livinghopeag.vercel.app
```

### Supabase Configuration:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Where to find your Supabase credentials:**
1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to Settings > API
4. Copy the "Project URL" for `SUPABASE_URL`
5. Copy the "service_role" key (not anon key) for `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important**: Use the service_role key for backend operations, not the anon key.

## Step 4: Database Setup (Supabase)

Since you're using Supabase, your database is already cloud-hosted and perfect for Vercel deployment!

### Supabase Tables Setup:
Make sure your Supabase project has these tables:
- `admin_users`
- `contact_messages` 
- `events`
- `media`
- `announcements`

### Verify Supabase Connection:
1. Check that your tables exist in Supabase dashboard
2. Verify RLS (Row Level Security) policies if needed
3. Test connection with your service role key

### Advantages of Supabase + Vercel:
✅ **Persistent Database**: Data survives deployments  
✅ **Auto-scaling**: Handles traffic spikes  
✅ **Real-time**: Built-in real-time capabilities  
✅ **Authentication**: Advanced auth features available  
✅ **Global CDN**: Fast worldwide access

## Step 5: Update Frontend API URL
Update your frontend to point to the Vercel backend URL:
```javascript
const API_BASE_URL = 'https://your-backend.vercel.app';
```

## Step 6: CORS Configuration
Make sure your frontend domain is added to CORS_ORIGINS:
```
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

## Troubleshooting

### Common Issues:
1. **Import errors**: Make sure all dependencies are in requirements.txt
2. **Database connection**: SQLite won't persist on Vercel, use PostgreSQL
3. **CORS errors**: Add your frontend URL to CORS_ORIGINS
4. **Cold starts**: First request may be slow (serverless limitation)

### Vercel Limits:
- Function timeout: 10 seconds (hobby), 60 seconds (pro)
- Memory: 1024MB (hobby), 3008MB (pro)
- File size: 50MB per function

## Alternative: Railway.app
If Vercel limitations are too restrictive, consider Railway.app:
1. Better for persistent databases
2. Longer function timeouts
3. Traditional server deployment model

## Monitoring
- Check Vercel function logs in dashboard
- Monitor performance and errors
- Set up health check endpoint: /api/health

## Next Steps
1. Set up proper database (PostgreSQL/Supabase)
2. Configure environment variables
3. Update frontend API endpoints
4. Test all functionality
5. Set up monitoring and logging