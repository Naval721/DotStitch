# 🚀 Vercel Deployment Guide

## Overview

This guide will help you deploy your Jersey Artist Studio to Vercel in minutes!

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [x] Run `supabase-schema-points.sql` in Supabase
- [x] Run `supabase-schema-points-update.sql` for free trial
- [x] Run `supabase-schema-otp.sql` for OTP verification
- [x] Verify tables are created
- [x] Test database connection

### 2. Environment Variables
- [x] Create `.env` file locally
- [x] Get Supabase credentials
- [x] Test locally with `npm run dev`

### 3. Code Quality
- [x] No linting errors
- [x] All features working
- [x] Test complete user flow

## 📋 Required Environment Variables

### For Vercel Deployment:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional (if using email service):
```env
VITE_STRIPE_PUBLIC_KEY=your-stripe-key-here
EMAIL_API_KEY=your-email-key-here
```

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for Vercel"

# Add remote
git remote add origin https://github.com/yourusername/jersey-artist-studio.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in or create account
3. Click **"Add New Project"**
4. Select your GitHub repository
5. Click **"Import"**

#### Step 3: Configure Project
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

#### Step 5: Deploy
Click **"Deploy"** and wait 2-3 minutes!

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

#### Step 4: Add Environment Variables
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### .vercelignore
```
node_modules
.env
dist
*.local
```

## 🌐 Post-Deployment

### 1. Update Supabase Settings
Go to Supabase Dashboard → Settings → API:
- Add your Vercel domain to **Allowed Origins**
- Example: `https://your-app.vercel.app`

### 2. Update Email Settings (if using OTP)
- Configure email service
- Test OTP delivery
- Verify email templates

### 3. Test Your App
- [ ] Home page loads
- [ ] Sign up works
- [ ] OTP verification works
- [ ] Points system works
- [ ] Export functionality works
- [ ] All pages accessible

## 📊 Build Information

### Build Size:
- **Estimated**: ~2-3 MB (gzipped)
- **Uncompressed**: ~8-10 MB

### Build Time:
- **First build**: ~2-3 minutes
- **Subsequent builds**: ~1-2 minutes

### Node Version:
- **Recommended**: Node.js 18.x or 20.x
- **Vercel uses**: Node.js 20.x by default

## 🔒 Security

### Environment Variables:
- ✅ Never commit `.env` file
- ✅ Use Vercel's environment variables
- ✅ Don't expose service role keys
- ✅ Rotate keys regularly

### Supabase RLS:
- ✅ Row Level Security enabled
- ✅ Policies configured
- ✅ API keys secured

## 🎯 Performance Optimization

### Vercel Automatically:
- ✅ CDN distribution
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Code splitting

### Additional Optimizations:
- ✅ Lazy load components
- ✅ Compress images
- ✅ Minify code (auto)
- ✅ Cache static assets

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build fails with errors
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Missing dependencies
```

**Solution**:
```bash
# Test build locally first
npm run build

# Fix any errors
# Push to GitHub
# Redeploy
```

### Environment Variables Not Working

**Issue**: App can't access environment variables
```bash
# Check variable names start with VITE_
# Example: VITE_SUPABASE_URL ✅
# NOT: SUPABASE_URL ❌
```

**Solution**:
```bash
# Add variables in Vercel dashboard
# Redeploy after adding
```

### Routes Not Working

**Issue**: 404 on page refresh
```bash
# This is a SPA routing issue
```

**Solution**:
```bash
# Already configured in vercel.json
# Rewrites all routes to index.html
```

### Database Connection Issues

**Issue**: Can't connect to Supabase
```bash
# Check:
# 1. Environment variables correct
# 2. Supabase project active
# 3. API keys valid
# 4. Allowed origins configured
```

**Solution**:
```bash
# Add Vercel domain to Supabase allowed origins
# Example: https://your-app.vercel.app
```

## 📈 Monitoring

### Vercel Analytics:
- Enable in Vercel dashboard
- Track page views
- Monitor performance
- View errors

### Supabase Dashboard:
- Monitor database usage
- Check API calls
- View logs
- Track users

## 🔄 Continuous Deployment

### Automatic Deployments:
- ✅ Push to main → Production
- ✅ Push to other branches → Preview
- ✅ Pull requests → Preview URL

### Manual Deployments:
```bash
vercel --prod
```

## 🎯 Custom Domain

### Add Custom Domain:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain
5. Update DNS records
6. Wait for propagation

### DNS Configuration:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📞 Support

### Vercel Support:
- [Documentation](https://vercel.com/docs)
- [Support](https://vercel.com/support)
- [Discord](https://vercel.com/discord)

### Supabase Support:
- [Documentation](https://supabase.com/docs)
- [Support](https://supabase.com/support)
- [Discord](https://discord.supabase.com)

## 🎉 Deployment Checklist

### Before Deploy:
- [ ] Test locally with `npm run build`
- [ ] All environment variables ready
- [ ] Database migrations run
- [ ] No linting errors
- [ ] Code pushed to GitHub

### During Deploy:
- [ ] Import project to Vercel
- [ ] Add environment variables
- [ ] Configure build settings
- [ ] Deploy project
- [ ] Wait for build to complete

### After Deploy:
- [ ] Test home page
- [ ] Test sign up
- [ ] Test OTP verification
- [ ] Test points purchase
- [ ] Test export functionality
- [ ] Test all pages
- [ ] Check mobile responsiveness
- [ ] Update Supabase allowed origins
- [ ] Configure custom domain (optional)

## 🚀 Quick Deploy Command

```bash
# One command deployment
vercel --prod --yes
```

## 📊 Post-Deployment URLs

After deployment, you'll get:
- **Production**: `https://your-app.vercel.app`
- **Preview**: `https://your-app-git-branch.vercel.app`

## 🎊 Success!

Your app is now:
- ✅ Deployed to Vercel
- ✅ Live on the internet
- ✅ CDN distributed
- ✅ HTTPS enabled
- ✅ Auto-scaling
- ✅ Production ready

**Congratulations!** 🎉

---

*Deployment Guide: Vercel*  
*Status: ✅ Ready*  
*Next Step: Deploy to Vercel*

