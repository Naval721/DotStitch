# 🚀 Complete Vercel Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Get Supabase Credentials](#step-1-get-supabase-credentials)
3. [Step 2: Deploy to Vercel](#step-2-deploy-to-vercel)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Configure Supabase](#step-4-configure-supabase)
6. [Step 5: Verify Deployment](#step-5-verify-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Success Checklist](#success-checklist)

---

## 📦 Prerequisites

Before deploying, make sure you have:

- ✅ GitHub repository with your code (✅ Done!)
- ✅ Supabase account and project
- ✅ Vercel account (free tier is fine)

---

## Step 1: Get Supabase Credentials

### 1.1 Go to Supabase Dashboard

1. Open [supabase.com](https://supabase.com)
2. Sign in to your account
3. Click on your project (or create one if you don't have it)

### 1.2 Get API Credentials

1. Click **Settings** (⚙️ icon in left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:

#### **Project URL**
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this entire URL!

#### **anon public Key**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4OTk5OTk5OSwiZXhwIjoyMDA1NTc1OTk5fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Copy this entire key!

### 1.3 Save Credentials

Keep these two values handy. You'll need them in Step 3!

---

## Step 2: Deploy to Vercel

### 2.1 Go to Vercel

1. Open [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"** button

### 2.2 Import from GitHub

1. You'll see a list of your GitHub repositories
2. Find **"DotStitch"** (or search for it)
3. Click **"Import"** button next to it

### 2.3 Configure Project

Vercel will auto-detect your project settings:

- **Framework Preset:** Vite ✅
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `dist` ✅

**Don't change these!** They're already correct.

### 2.4 Environment Variables (Skip for Now)

**IMPORTANT:** We'll add environment variables AFTER the first deployment.

Just click **"Deploy"** button now!

### 2.5 Wait for Deployment

- Vercel will install dependencies
- Build your project
- Deploy to production

This takes **2-3 minutes**.

You'll see a progress screen with build logs.

### 2.6 First Deployment Complete!

✅ You'll see:
```
Congratulations! Your project is deployed.
```

**BUT** you'll see a **white screen** when you open the URL.

**This is normal!** We need to add environment variables.

---

## Step 3: Configure Environment Variables

### 3.1 Go to Project Settings

1. In Vercel Dashboard, click your project
2. Click **"Settings"** tab at the top
3. Click **"Environment Variables"** in the left sidebar

### 3.2 Add First Variable: VITE_SUPABASE_URL

1. Click **"Add New"** button
2. Fill in:

| Field | Value |
|-------|-------|
| **Key** | `VITE_SUPABASE_URL` |
| **Value** | Your Supabase Project URL (from Step 1.2) |
| **Environment** | Select all three: Production, Preview, Development |

3. Click **"Save"**

### 3.3 Add Second Variable: VITE_SUPABASE_ANON_KEY

1. Click **"Add New"** button again
2. Fill in:

| Field | Value |
|-------|-------|
| **Key** | `VITE_SUPABASE_ANON_KEY` |
| **Value** | Your Supabase anon public key (from Step 1.2) |
| **Environment** | Select all three: Production, Preview, Development |

3. Click **"Save"**

### 3.4 Verify Variables

You should now see **2 environment variables**:

```
VITE_SUPABASE_URL          [Production, Preview, Development]
VITE_SUPABASE_ANON_KEY     [Production, Preview, Development]
```

### 3.5 Redeploy with New Variables

**IMPORTANT:** Environment variables only apply to NEW deployments!

1. Click **"Deployments"** tab at the top
2. Find the latest deployment
3. Click the **three dots** (⋯) on the right
4. Click **"Redeploy"**
5. **Uncheck** "Use existing Build Cache"
6. Click **"Redeploy"** button

### 3.6 Wait for Redeployment

Wait **2-3 minutes** for the new deployment to complete.

---

## Step 4: Configure Supabase

### 4.1 Go to Supabase Settings

1. Go back to [supabase.com](https://supabase.com)
2. Open your project
3. Click **Settings** → **API**

### 4.2 Add Allowed Origins

1. Scroll down to **"Allowed Origins"** section
2. Click **"Add new origin"**
3. Add your Vercel URLs:

```
https://your-app.vercel.app
https://your-app-git-main.vercel.app
https://your-app-git-*.vercel.app
```

**Replace `your-app` with your actual Vercel app name!**

4. Click **"Save"**

### 4.3 Verify Database Setup

Make sure you've run the SQL scripts in Supabase:

1. Go to Supabase Dashboard
2. Click **SQL Editor** in left sidebar
3. Run these scripts (in order):
   - `supabase-schema-points.sql`
   - `supabase-schema-otp.sql`
   - `supabase-schema-points-update.sql`

---

## Step 5: Verify Deployment

### 5.1 Open Your Site

1. Go to Vercel Dashboard
2. Click your project
3. Click **"Visit"** button (or use the URL)

### 5.2 Check Browser Console

1. Press `F12` to open Developer Tools
2. Click **"Console"** tab
3. You should see:

```
🔍 Environment Check:
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_ANON_KEY: ✅ Set
Mode: production
✅ All environment variables are set correctly!
```

✅ **If you see this → Your deployment is successful!**

### 5.3 Test Key Features

Test these features to ensure everything works:

- [ ] **Home page loads**
- [ ] **Sign up works**
- [ ] **OTP verification works**
- [ ] **Can upload Excel file**
- [ ] **Can design jersey**
- [ ] **Can export (free trial: 5 exports)**

---

## 🔧 Troubleshooting

### White Screen After Deployment

**Symptom:** Site loads but shows blank white screen

**Cause:** Missing environment variables

**Solution:**
1. Check browser console (F12)
2. If you see `❌ Missing`, go to Step 3
3. Add environment variables
4. Redeploy

### 401 Unauthorized Error

**Symptom:** Console shows `401 Unauthorized`

**Cause:** Wrong Supabase credentials

**Solution:**
1. Go to Supabase → Settings → API
2. Copy correct URL and anon key
3. Update in Vercel
4. Redeploy

### Failed to Fetch Error

**Symptom:** Console shows `Failed to fetch`

**Cause:** Vercel URL not in Supabase allowed origins

**Solution:**
1. Go to Supabase → Settings → API
2. Add your Vercel URL to allowed origins
3. Save

### Build Failed

**Symptom:** Vercel build logs show errors

**Cause:** Code issues or missing dependencies

**Solution:**
1. Check build logs for specific error
2. Test build locally: `npm run build`
3. Fix errors
4. Push to GitHub
5. Vercel will auto-deploy

---

## ✅ Success Checklist

Before considering deployment complete, verify:

- [ ] ✅ Vercel deployment successful
- [ ] ✅ Environment variables added (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] ✅ Redeployed after adding variables
- [ ] ✅ Vercel URL added to Supabase allowed origins
- [ ] ✅ Browser console shows "✅ Set" for environment variables
- [ ] ✅ Home page loads correctly
- [ ] ✅ Sign up works
- [ ] ✅ OTP verification works
- [ ] ✅ Excel upload works
- [ ] ✅ Jersey design works
- [ ] ✅ Export works (free trial: 5 exports)

---

## 🎉 Congratulations!

Your Jersey Artist Studio is now live on the internet! 🚀

**Your app URL:** `https://your-app.vercel.app`

### Next Steps:

1. **Share your app** with users
2. **Monitor usage** in Vercel Dashboard
3. **Check logs** if any issues arise
4. **Update content** by pushing to GitHub (auto-deploys)

### Useful Links:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **GitHub Repository:** https://github.com/Naval721/DotStitch

---

## 📞 Need Help?

If you encounter any issues:

1. Check browser console (F12)
2. Check Vercel build logs
3. Check Supabase logs
4. Review this guide again

**Common issues are covered in the Troubleshooting section!**

---

## 🔄 Updating Your App

To update your deployed app:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel will **automatically deploy** the changes
4. Wait 2-3 minutes
5. Your changes are live! ✅

---

**Happy Deploying! 🎊**

