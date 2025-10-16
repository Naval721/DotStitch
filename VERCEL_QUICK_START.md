# ⚡ Vercel Quick Start (5 Minutes)

## 🎯 Fastest Way to Deploy

### 1️⃣ Get Supabase Credentials (2 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Settings → API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 2️⃣ Deploy to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import **"DotStitch"** from GitHub
4. Click **"Deploy"** (don't add env vars yet!)

### 3️⃣ Add Environment Variables (1 minute)

1. After first deployment, go to **Settings** → **Environment Variables**
2. Add these TWO variables:

```
VITE_SUPABASE_URL = your-supabase-url
VITE_SUPABASE_ANON_KEY = your-anon-key
```

3. Select all environments (Production, Preview, Development)
4. Click **"Save"**

### 4️⃣ Redeploy

1. Go to **Deployments** tab
2. Click **⋯** → **"Redeploy"**
3. **Uncheck** "Use existing Build Cache"
4. Click **"Redeploy"**

### 5️⃣ Configure Supabase (30 seconds)

1. Go to Supabase → Settings → API
2. Add to **Allowed Origins**:
   ```
   https://your-app.vercel.app
   ```
3. Save

### 6️⃣ Test! (30 seconds)

1. Open your Vercel URL
2. Press `F12` → Console
3. Should see:
   ```
   🔍 Environment Check:
   VITE_SUPABASE_URL: ✅ Set
   VITE_SUPABASE_ANON_KEY: ✅ Set
   ✅ All environment variables are set correctly!
   ```

## ✅ Done!

Your app is live! 🎉

## 🚨 White Screen?

**99% of the time, it's missing environment variables!**

1. Check console (F12)
2. If you see `❌ Missing` → Add env vars (Step 3)
3. Redeploy (Step 4)

## 📚 Need More Details?

See `VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md` for full documentation.

---

**Total Time: ~5 minutes** ⏱️

