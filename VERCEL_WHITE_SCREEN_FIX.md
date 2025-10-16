# 🔧 Fix White Screen After Vercel Deployment

## Common Causes & Solutions

### 1️⃣ **Missing Environment Variables** (Most Common)

Your app needs Supabase credentials to work!

#### In Vercel Dashboard:
1. Go to your project settings
2. Click **"Environment Variables"**
3. Add these variables:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Click **"Redeploy"**

#### Get Your Supabase Credentials:
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Settings → API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 2️⃣ **Check Build Logs**

1. Go to Vercel Dashboard
2. Click your deployment
3. Check **"Build Logs"**
4. Look for errors (red text)

### 3️⃣ **Test Build Locally**

Run these commands to test:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build
npm run preview
```

If this works locally, the issue is environment variables in Vercel.

### 4️⃣ **Check Browser Console**

1. Open your deployed site
2. Press `F12` (Developer Tools)
3. Click **"Console"** tab
4. Look for errors (red text)

Common errors:
- `VITE_SUPABASE_URL is not defined` → Add environment variables
- `Failed to fetch` → Check Supabase URL
- `401 Unauthorized` → Check Supabase anon key

### 5️⃣ **Verify Vercel Configuration**

Your `vercel.json` looks good, but verify:

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

### 6️⃣ **Clear Cache and Redeploy**

Sometimes Vercel caches old builds:

1. Go to Vercel Dashboard
2. Click your project
3. Click **"Deployments"**
4. Click the three dots (⋯) on latest deployment
5. Click **"Redeploy"**
6. Check **"Use existing Build Cache"** → OFF
7. Click **"Redeploy"**

### 7️⃣ **Check Supabase Allowed Origins**

1. Go to Supabase Dashboard
2. Settings → API
3. Scroll to **"Allowed Origins"**
4. Add your Vercel URL:
   ```
   https://your-app.vercel.app
   https://your-app-git-main.vercel.app
   ```
5. Save

### 8️⃣ **Verify index.html**

Check if `index.html` exists in root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jersey Artist Studio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 🚨 Quick Fix Checklist

- [ ] Added `VITE_SUPABASE_URL` to Vercel environment variables
- [ ] Added `VITE_SUPABASE_ANON_KEY` to Vercel environment variables
- [ ] Redeployed after adding environment variables
- [ ] Added Vercel URL to Supabase allowed origins
- [ ] Checked browser console for errors
- [ ] Checked Vercel build logs for errors
- [ ] Tested build locally with `npm run build`

## 🎯 Most Likely Solution

**99% of white screen issues are missing environment variables!**

1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel
2. Redeploy
3. Done! ✅

## 📞 Still Not Working?

Share:
1. Vercel build logs (screenshot)
2. Browser console errors (screenshot)
3. Your Vercel URL

I'll help you debug! 🔧

