# AI Image Generation Guide for Jersey Designer Pro

## Overview
This guide will help you generate and integrate AI-created images for the Jersey Designer Pro application.

---

## 🎨 Images Needed

### 1. Hero Image
**Current:** `src/assets/hero-jersey-designer.jpg`  
**Purpose:** Main landing page hero image  
**AI Prompt:**
```
Create a professional sports jersey design showcase image. Show multiple colorful sports jerseys (soccer, basketball, football) displayed on hangers or mannequins. Clean white background, professional photography style, high resolution, modern sports aesthetic, 1920x1080px, vibrant colors, product photography quality
```

**Alternative Prompts:**
- "Professional sports jersey collection display, multiple jerseys with numbers and team logos, studio lighting, white background, 4K quality"
- "Sports apparel design workspace with jerseys, fabric swatches, design tools, modern office, professional, 1920x1080"

---

### 2. Feature Images (Homepage)
**Current:** Icon placeholders  
**Purpose:** Showcase features on homepage

#### Feature 1: Dual Preview
**AI Prompt:**
```
Show the front and back of a sports jersey side by side. Professional product photography, clean white background, jersey with number 10, team logo, high quality fabric texture visible, studio lighting, 800x600px, realistic
```

#### Feature 2: Live Design Count
**AI Prompt:**
```
Dashboard interface showing multiple jersey designs in a grid layout. Digital design mockups, various colors and styles, professional design software UI, modern interface, 800x600px, clean and organized
```

#### Feature 3: High-Quality Output
**AI Prompt:**
```
Professional printing setup showing jersey being printed with high DPI quality. Print machinery, colorful inks, precision printing process, industrial quality, 800x600px, professional photography
```

---

### 3. Jersey Size Template Images
**Current:** Placeholder images in `src/assets/sizes/`  
**Purpose:** Show jersey sizing examples

**AI Prompts for each size (22-46):**
```
Professional sports jersey size [SIZE] on white background. Front view, clean product photography, vibrant team colors, visible fabric texture, number 23, team logo, studio lighting, 1000x1000px, realistic
```

**Example for Size 24:**
```
Professional sports jersey size 24 on white background. Front view, clean product photography, blue and white colors, visible fabric texture, number 23, team logo, studio lighting, 1000x1000px, realistic
```

---

### 4. Gallery/Showcase Images
**Current:** Icon placeholders in HomePage.tsx  
**Purpose:** Display example jersey designs

**AI Prompts (generate 6 different designs):**
```
1. "Professional soccer jersey, red and white stripes, number 7, team crest, front view, white background, 800x600px"
2. "Basketball jersey, purple and gold, number 24, modern design, front view, white background, 800x600px"
3. "Football jersey, blue and silver, number 12, athletic design, front view, white background, 800x600px"
4. "Soccer jersey, green and black, number 10, sleek design, front view, white background, 800x600px"
5. "Baseball jersey, navy blue and white, number 42, classic design, front view, white background, 800x600px"
6. "Hockey jersey, black and orange, number 9, bold design, front view, white background, 800x600px"
```

---

## 🛠️ AI Image Generation Tools

### Recommended Tools:

1. **Midjourney** (Best Quality)
   - Discord-based
   - Subscription required ($10-60/month)
   - Best for realistic product photography

2. **DALL-E 3** (via ChatGPT Plus)
   - Easy to use
   - $20/month for ChatGPT Plus
   - Good quality, fast generation

3. **Stable Diffusion** (Free)
   - Open source
   - Can run locally or use online services
   - Good control over generation

4. **Leonardo.ai** (Free tier available)
   - Web-based
   - Free tier: 150 images/day
   - Good for product images

5. **Adobe Firefly** (Free)
   - Integrated with Adobe tools
   - Free tier available
   - Good for commercial use

---

## 📁 File Structure

After generating images, organize them like this:

```
src/assets/
├── hero-jersey-designer.jpg (1920x1080)
├── homepage/
│   ├── feature-dual-preview.jpg (800x600)
│   ├── feature-design-count.jpg (800x600)
│   └── feature-high-quality.jpg (800x600)
├── gallery/
│   ├── jersey-1.jpg (800x600)
│   ├── jersey-2.jpg (800x600)
│   ├── jersey-3.jpg (800x600)
│   ├── jersey-4.jpg (800x600)
│   ├── jersey-5.jpg (800x600)
│   └── jersey-6.jpg (800x600)
└── sizes/
    ├── 22.jpg (1000x1000)
    ├── 22.png (1000x1000)
    ├── 24.jpg (1000x1000)
    ├── 24.png (1000x1000)
    ├── 26.jpg (1000x1000)
    ├── 26.png (1000x1000)
    ├── 28.jpg (1000x1000)
    ├── 28.png (1000x1000)
    ├── 30.jpg (1000x1000)
    ├── 30.png (1000x1000)
    ├── 32.jpg (1000x1000)
    ├── 32.png (1000x1000)
    ├── 34.jpg (1000x1000)
    ├── 34.png (1000x1000)
    ├── 36.jpg (1000x1000)
    ├── 36.png (1000x1000)
    ├── 38.jpg (1000x1000)
    ├── 38.png (1000x1000)
    ├── 40.jpg (1000x1000)
    ├── 40.png (1000x1000)
    ├── 42.jpg (1000x1000)
    ├── 42.png (1000x1000)
    ├── 44.jpg (1000x1000)
    ├── 44.png (1000x1000)
    ├── 46.jpg (1000x1000)
    └── 46.png (1000x1000)
```

---

## 🚀 Quick Start with DALL-E 3 (Recommended)

### Step 1: Access DALL-E 3
1. Go to https://chat.openai.com
2. Subscribe to ChatGPT Plus ($20/month)
3. Start a new chat

### Step 2: Generate Hero Image
```
Generate a professional sports jersey design showcase image. Show multiple colorful sports jerseys (soccer, basketball, football) displayed on hangers or mannequins. Clean white background, professional photography style, high resolution, modern sports aesthetic, 1920x1080px, vibrant colors, product photography quality
```

### Step 3: Download and Save
1. Click on the generated image
2. Click "Download"
3. Save as `src/assets/hero-jersey-designer.jpg`

### Step 4: Generate Feature Images
Repeat for each feature image with the prompts provided above.

---

## 🔧 Automated Image Integration Script

I'll create a script to help you integrate the generated images automatically.

---

## 📝 Image Optimization

After generating images, optimize them:

### Using Online Tools:
- **TinyPNG** (https://tinypng.com) - Compress without quality loss
- **Squoosh** (https://squoosh.app) - Advanced compression

### Using Command Line:
```bash
# Install ImageMagick
npm install -g sharp-cli

# Optimize images
sharp -i src/assets/**/*.jpg -o src/assets/**/*.jpg --quality 85
```

---

## ✅ Quality Checklist

Before using generated images:

- [ ] Images are high resolution (minimum 800x600)
- [ ] Images are optimized for web (< 500KB each)
- [ ] Images have transparent or white backgrounds
- [ ] Images match the style and color scheme
- [ ] Images are properly named and organized
- [ ] Images are compressed but maintain quality

---

## 🎯 Tips for Best Results

1. **Be Specific:** Include exact dimensions, colors, and style in prompts
2. **Iterate:** Generate multiple versions and pick the best
3. **Consistency:** Use similar prompts for related images
4. **Quality Settings:** Always use "high quality" or "HD" in prompts
5. **Background:** Request "white background" or "transparent background"
6. **Style:** Add "professional photography" or "product photography"

---

## 📦 Batch Generation

### For Size Images (22-46):

Use this template and replace `[SIZE]`:

```
Professional sports jersey size [SIZE] on white background. Front view, clean product photography, vibrant team colors, visible fabric texture, number 23, team logo, studio lighting, 1000x1000px, realistic, high quality
```

Generate for: 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46

---

## 🔄 Alternative: Use Free Stock Images

If AI generation is not available, use these free resources:

1. **Unsplash** (https://unsplash.com)
   - Search: "sports jersey", "athletic apparel"
   - Free for commercial use

2. **Pexels** (https://pexels.com)
   - Search: "jersey design", "sports uniform"
   - Free for commercial use

3. **Pixabay** (https://pixabay.com)
   - Search: "sports jersey", "team uniform"
   - Free for commercial use

---

## 📞 Need Help?

If you need assistance with:
- Specific image generation prompts
- Image optimization
- Integration into the codebase
- Finding free alternatives

Refer to this guide or check the project documentation.

---

**Happy designing! 🎨**

