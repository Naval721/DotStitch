# 🚀 Quick Start - Deploy to Vercel

## Deploy in 5 Minutes!

### 1️⃣ Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/yourusername/jersey-artist-studio.git
git push -u origin main
```

### 2️⃣ Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Add environment variables:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Click **"Deploy"**

### 3️⃣ Configure Supabase
1. Go to Supabase Dashboard
2. Settings → API → Allowed Origins
3. Add your Vercel URL: `https://your-app.vercel.app`

### 4️⃣ Test Your App
Visit your Vercel URL and test:
- ✅ Sign up
- ✅ OTP verification
- ✅ Free trial (5 exports)
- ✅ Export functionality

## 📚 Full Documentation

- **Complete Guide**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Troubleshooting**: See guides above

## 🎯 Quick Commands

```bash
# Test build locally
npm run build

# Deploy to Vercel (CLI)
vercel --prod

# Check logs
vercel logs
```

## 🎉 Done!

Your app is now live at `https://your-app.vercel.app`

---

**Need help?** Check `VERCEL_DEPLOYMENT_GUIDE.md`

