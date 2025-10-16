# 🔍 White Screen Debug Guide

## ⚡ Quick Diagnosis

### 1️⃣ **Check Browser Console**

1. Open your Vercel URL
2. Press `F12` (Developer Tools)
3. Click **Console** tab
4. Look for these messages:

#### ✅ **Good Signs:**
```
🔍 Environment Check:
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_ANON_KEY: ✅ Set
Mode: production
✅ All environment variables are set correctly!
```

#### ❌ **Bad Signs:**
```
🔍 Environment Check:
VITE_SUPABASE_URL: ❌ Missing
VITE_SUPABASE_ANON_KEY: ❌ Missing
❌ CRITICAL: Environment variables are missing!
```

### 2️⃣ **Check Vercel Environment Variables**

1. Go to [vercel.com](https://vercel.com)
2. Click your project
3. **Settings** → **Environment Variables**
4. You should see:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**If you don't see these → Add them now!**

### 3️⃣ **Check Vercel Build Logs**

1. Go to Vercel Dashboard
2. Click your deployment
3. Click **"Build Logs"**
4. Look for errors (red text)

**Common Errors:**

❌ **Build Failed:**
```
Error: Cannot find module 'xxx'
```
→ Missing dependencies

❌ **Build Succeeded but White Screen:**
```
No errors in build logs
```
→ Environment variables not set

### 4️⃣ **Check Network Tab**

1. Press `F12`
2. Click **Network** tab
3. Refresh page
4. Look for failed requests (red)

❌ **Failed Requests:**
```
GET https://xxxxx.supabase.co/rest/v1/... 401 Unauthorized
```
→ Wrong anon key or not in allowed origins

## 🔧 **Common Fixes**

### **Fix 1: Environment Variables Not Set**

**Symptom:** Console shows `❌ Missing`

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Select all environments
4. Save
5. **Redeploy** (important!)

### **Fix 2: Environment Variables Set but Not Redeployed**

**Symptom:** Variables exist but still white screen

**Solution:**
1. Go to Deployments tab
2. Click ⋯ on latest deployment
3. Click "Redeploy"
4. **Uncheck** "Use existing Build Cache"
5. Click "Redeploy"

### **Fix 3: Wrong Supabase Credentials**

**Symptom:** Console shows `401 Unauthorized`

**Solution:**
1. Go to Supabase Dashboard
2. Settings → API
3. Copy the correct:
   - Project URL
   - anon public key
4. Update in Vercel
5. Redeploy

### **Fix 4: Supabase Not Allowing Vercel Origin**

**Symptom:** Console shows `Failed to fetch`

**Solution:**
1. Go to Supabase Dashboard
2. Settings → API → Allowed Origins
3. Add:
   ```
   https://your-app.vercel.app
   https://your-app-git-main.vercel.app
   ```
4. Save

### **Fix 5: Build Cache Issue**

**Symptom:** Changes not reflecting

**Solution:**
1. Go to Vercel Dashboard
2. Settings → General → Clear Build Cache
3. Redeploy

## 🎯 **Step-by-Step Fix**

### **If you see `❌ Missing` in console:**

1. **Get Supabase credentials:**
   - Go to supabase.com
   - Open project
   - Settings → API
   - Copy URL and anon key

2. **Add to Vercel:**
   - Go to vercel.com
   - Your project → Settings → Environment Variables
   - Add both variables
   - Save

3. **Redeploy:**
   - Deployments → ⋯ → Redeploy
   - Uncheck "Use existing Build Cache"
   - Deploy

4. **Wait 2-3 minutes**

5. **Refresh your site**

6. **Check console again**

### **If you see errors in console:**

Share the error message and I'll help you fix it!

## 📊 **Test Locally**

To verify your code works:

```bash
# Create .env file
echo "VITE_SUPABASE_URL=your-url" > .env
echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env

# Build
npm run build

# Preview
npm run preview

# Open http://localhost:4173
```

If this works locally, the issue is **definitely** Vercel configuration!

## 🚨 **Still White Screen?**

Please share:

1. **Screenshot of browser console** (F12 → Console tab)
2. **Screenshot of Vercel environment variables**
3. **Your Vercel URL**

I'll help you fix it! 🔧

## ✅ **Expected Console Output (Working)**

```
🔍 Environment Check:
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_ANON_KEY: ✅ Set
Mode: production
Base URL: /
✅ All environment variables are set correctly!
```

If you see this, your app should load! 🎉

