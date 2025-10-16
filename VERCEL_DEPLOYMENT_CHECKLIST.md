# ✅ Vercel Deployment Checklist

## 🚨 **White Screen Issue?** 

**99% of the time, it's missing environment variables!**

## 📋 **Step-by-Step Fix:**

### **Step 1: Get Your Supabase Credentials**

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Click **Settings** (⚙️) → **API**
4. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Step 2: Add Environment Variables to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click your **DotStitch** project
3. Click **Settings** → **Environment Variables**
4. Add these **TWO** variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

5. Select **"Production, Preview, Development"** for all
6. Click **"Save"**

### **Step 3: Redeploy**

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on latest deployment
3. Click **"Redeploy"**
4. **Uncheck** "Use existing Build Cache"
5. Click **"Redeploy"**

### **Step 4: Configure Supabase**

1. Go back to Supabase Dashboard
2. Settings → API → **Allowed Origins**
3. Add your Vercel URLs:

```
https://your-app.vercel.app
https://your-app-git-main.vercel.app
https://your-app-git-*.vercel.app
```

4. Click **"Save"**

### **Step 5: Test**

1. Open your Vercel URL
2. Press `F12` (Developer Tools)
3. Click **Console** tab
4. Should see no errors!

## 🔍 **Debugging**

### **Check Browser Console:**

Press `F12` and look for errors:

❌ **Bad:**
```
VITE_SUPABASE_URL is not defined
Failed to fetch
401 Unauthorized
```

✅ **Good:**
```
No errors
App loaded successfully
```

### **Check Vercel Build Logs:**

1. Go to Vercel Dashboard
2. Click your deployment
3. Click **"Build Logs"**
4. Look for errors (red text)

### **Test Build Locally:**

```bash
# Build
npm run build

# Preview
npm run preview

# Open http://localhost:4173
```

If this works locally, the issue is **definitely** environment variables in Vercel!

## 📊 **Build Output (Expected):**

```
✓ 1835 modules transformed.
✓ built in 9.20s

dist/index.html                    2.16 kB
dist/assets/index-*.css           79.34 kB
dist/assets/index-*.js           271.04 kB
dist/assets/vendor-react-*.js    162.36 kB
dist/assets/vendor-canvas-*.js   285.55 kB
dist/assets/vendor-utils-*.js    525.73 kB
```

## 🎯 **Quick Test:**

After adding environment variables, test these features:

- [ ] Home page loads
- [ ] Sign up works
- [ ] OTP verification works
- [ ] Can upload Excel file
- [ ] Can design jersey
- [ ] Can export (free trial: 5 exports)

## 🚀 **After Fix:**

Your app should work perfectly! 🎉

## 📞 **Still White Screen?**

Share:
1. Screenshot of Vercel environment variables
2. Screenshot of browser console errors
3. Your Vercel URL

I'll help you debug! 🔧

