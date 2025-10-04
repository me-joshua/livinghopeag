# Supabase + Vercel Deployment Guide

## Your Current Setup ✅
You're already using Supabase as your database, which is perfect for Vercel deployment!

## Quick Deployment Checklist

### 1. Verify Supabase Configuration
- [ ] Your Supabase project is active
- [ ] All required tables exist
- [ ] Service role key is accessible

### 2. Environment Variables for Vercel
When deploying to Vercel, add these environment variables:

```bash
# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS (include your frontend URL)
CORS_ORIGINS=http://localhost:3000,https://livinghopeag.vercel.app

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Deploy Steps
```bash
# Navigate to backend
cd backend

# Deploy to Vercel
vercel --prod

# Your backend will be available at:
# https://your-backend-name.vercel.app
```

### 4. Update Frontend
Update your frontend environment variables:
```bash
# In frontend/.env.production
REACT_APP_API_URL=https://your-backend-name.vercel.app
```

## Supabase Tables Required

Your database should have these tables (which you likely already have):

### admin_users
```sql
id (uuid, primary key)
username (text, unique)
email (text)
password_hash (text)
is_active (boolean)
created_at (timestamptz)
last_login (timestamptz)
```

### contact_messages
```sql
id (uuid, primary key)
full_name (text)
email (text)
phone (text)
country_code (text)
subject (text)
message (text)
is_read (boolean)
created_at (timestamptz)
```

### events
```sql
id (uuid, primary key)
title (text)
description (text)
date (date)
time (text)
location (text)
category (text)
registration_required (boolean)
contact_info (text)
created_at (timestamptz)
```

### media
```sql
id (uuid, primary key)
title (text)
description (text)
type (text)
url (text)
thumbnail_url (text)
created_at (timestamptz)
```

### announcements
```sql
id (uuid, primary key)
title (text)
content (text)
icon (text)
is_active (boolean)
created_at (timestamptz)
```

## Benefits of Your Current Setup

✅ **Production Ready**: Supabase handles scaling automatically  
✅ **Global Performance**: Built-in CDN and edge locations  
✅ **Data Persistence**: No data loss on deployments  
✅ **Real-time Capabilities**: Built-in subscriptions  
✅ **Authentication**: Advanced auth features available  
✅ **Backup & Recovery**: Automatic backups  

## Troubleshooting

### Common Issues:
1. **Wrong Key Type**: Make sure you're using `service_role` key, not `anon` key
2. **RLS Policies**: If queries fail, check Row Level Security policies in Supabase
3. **CORS Issues**: Ensure your frontend domain is in CORS_ORIGINS
4. **Connection Timeout**: Supabase connections are usually fast, check your internet

### Monitoring:
- Supabase Dashboard: Monitor database performance
- Vercel Dashboard: Check function logs and performance
- Health Check: `https://your-backend.vercel.app/api/health`

## Next Steps
1. Deploy backend to Vercel
2. Update frontend environment variables
3. Deploy frontend to Vercel
4. Test all functionality
5. Monitor performance

Your setup is already optimized for production deployment! 🚀