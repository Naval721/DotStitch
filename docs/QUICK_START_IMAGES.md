# Quick Start: Get Homepage Images Running

## 🚀 Fastest Way to Get Started (5 minutes)

While you're generating high-quality AI images, here's how to get placeholder images working immediately:

### Option 1: Use Unsplash (Recommended for Quick Start)

1. Visit [Unsplash](https://unsplash.com/)
2. Search for these terms and download high-quality images:

**For Feature Images:**
- Search: "apparel design mockup" → Download 3 images (1200x1200px)
- Search: "dashboard analytics" → Download 1 image (1600x900px)
- Search: "product photography jersey" → Download 2 images (1200x1200px)

**For Gallery:**
- Search: "custom jersey design" → Download 6 images (1200x900px)

3. Rename and save them to `src/assets/homepage/`:
   ```
   feature-dual-preview.jpg
   feature-live-count.jpg
   feature-high-quality.jpg
   gallery-1.jpg
   gallery-2.jpg
   gallery-3.jpg
   gallery-4.jpg
   gallery-5.jpg
   gallery-6.jpg
   ```

### Option 2: Use Placeholder.com

Run this command to download placeholder images:

```bash
# Feature images (square)
curl -o src/assets/homepage/feature-dual-preview.jpg "https://placehold.co/1200x1200/ffffff/000000?text=Dual+Preview"
curl -o src/assets/homepage/feature-high-quality.jpg "https://placehold.co/1200x1200/ffffff/000000?text=High+Quality"

# Feature image (wide)
curl -o src/assets/homepage/feature-live-count.jpg "https://placehold.co/1600x900/ffffff/000000?text=Live+Count"

# Gallery images
curl -o src/assets/homepage/gallery-1.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+1"
curl -o src/assets/homepage/gallery-2.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+2"
curl -o src/assets/homepage/gallery-3.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+3"
curl -o src/assets/homepage/gallery-4.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+4"
curl -o src/assets/homepage/gallery-5.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+5"
curl -o src/assets/homepage/gallery-6.jpg "https://placehold.co/1200x900/ffffff/000000?text=Gallery+6"
```

### Option 3: Use Pexels (Free Stock Photos)

1. Visit [Pexels](https://www.pexels.com/)
2. Search and download:
   - "apparel design"
   - "dashboard interface"
   - "product photography"
   - "custom clothing"

3. Resize using any image editor or online tool to match the required dimensions

---

## 📝 Image Requirements Checklist

Before using any images, ensure they meet these requirements:

- [ ] **Format:** JPG or WebP
- [ ] **Size:** Optimized for web (under 500KB each)
- [ ] **Dimensions:** 
  - Feature images: 1200x1200px (square) or 1600x900px (wide)
  - Gallery images: 1200x900px (4:3 ratio)
- [ ] **Quality:** High resolution, sharp, professional
- [ ] **Style:** Consistent across all images
- [ ] **Content:** Relevant to your app's purpose

---

## 🎨 Best Free Image Sources

### For Professional Images:
1. **[Unsplash](https://unsplash.com/)** - High-quality, free photos
2. **[Pexels](https://www.pexels.com/)** - Free stock photos
3. **[Pixabay](https://pixabay.com/)** - Free images and vectors
4. **[Freepik](https://www.freepik.com/)** - Free vectors and photos (with attribution)

### For UI/Dashboard Images:
1. **[UI Design Daily](https://www.uidesigndaily.com/)** - UI mockups
2. **[Dribbble](https://dribbble.com/)** - Design inspiration
3. **[Behance](https://www.behance.net/)** - Professional portfolios

### For Product Photography:
1. **[Shopify Burst](https://burst.shopify.com/)** - Free product photos
2. **[Stocksy](https://www.stocksy.com/)** - Premium (paid)
3. **[Getty Images](https://www.gettyimages.com/)** - Premium (paid)

---

## 🖼️ Image Optimization Tools

Before uploading, optimize your images:

### Online Tools:
- **[TinyPNG](https://tinypng.com/)** - Compress images
- **[Squoosh](https://squoosh.app/)** - Google's image optimizer
- **[Compressor.io](https://compressor.io/)** - Online compression

### Desktop Apps:
- **[ImageOptim](https://imageoptim.com/)** - Mac
- **[RIOT](https://riot-optimizer.com/)** - Windows
- **[GIMP](https://www.gimp.org/)** - Free image editor

---

## ⚡ Quick Test

After adding images, test your homepage:

```bash
npm run dev
```

Visit `http://localhost:5173` and check:
- [ ] All images load correctly
- [ ] No broken image icons
- [ ] Images are properly sized
- [ ] Page loads quickly
- [ ] Images look good on mobile

---

## 🔄 Update Process

When you get AI-generated images:

1. **Backup current images** (optional):
   ```bash
   cp -r src/assets/homepage src/assets/homepage-backup
   ```

2. **Replace with new images**:
   - Use the same filenames
   - Keep the same dimensions
   - Optimize before uploading

3. **Clear cache and rebuild**:
   ```bash
   npm run build
   ```

---

## 📱 Responsive Images

The component is already set up for responsive images. The images will:
- Scale properly on all devices
- Use lazy loading for performance
- Maintain aspect ratios
- Look great on mobile and desktop

---

## 🎯 Next Steps

1. ✅ Add placeholder images (5 minutes)
2. ✅ Test the homepage
3. ⏳ Generate AI images using the guide in `IMAGE_GENERATION_GUIDE.md`
4. ⏳ Replace placeholders with AI images
5. ✅ Optimize and deploy

---

## 🆘 Troubleshooting

**Problem:** Images don't load
- **Solution:** Check file paths and names match exactly

**Problem:** Images look stretched
- **Solution:** Ensure images match the required aspect ratios

**Problem:** Page loads slowly
- **Solution:** Optimize images to under 500KB each

**Problem:** Images look pixelated
- **Solution:** Use higher resolution source images (at least 1200px)

---

## 💡 Pro Tips

1. **Use WebP format** for better compression (30% smaller than JPG)
2. **Add alt text** for accessibility (already done in the component)
3. **Use lazy loading** for better performance (already implemented)
4. **Test on different devices** to ensure images look good everywhere
5. **Keep originals** in a separate folder for future use

---

## 📞 Need Help?

If you encounter any issues:
1. Check the console for errors
2. Verify file names match exactly
3. Ensure images are in the correct directory
4. Clear your browser cache
5. Restart the dev server

---

**You're all set!** 🎉 Your homepage is now ready for high-quality images!


