# DotStitch - Jersey Designer Pro

Professional jersey customization platform with points-based subscription system.

## 🚀 Features

- **Points-Based System**: Buy points once, use anytime - never expire
- **Free Trial**: 5 free exports for new users
- **Excel Integration**: Import player data from spreadsheets
- **Interactive Canvas**: Drag-and-drop editing with Fabric.js
- **High-Quality Export**: 300 DPI professional quality
- **OTP Verification**: Secure email verification
- **User Dashboard**: Track points, usage, and transactions

## 📦 Point Packages

| Package | Price | Points | Best For |
|---------|-------|--------|----------|
| Basic | ₹1,000 | 700 | Small projects |
| Professional | ₹2,500 | 2,000 | Regular use |
| Enterprise | Custom | Custom | Large teams |

### Point Costs
- Front Image: 1 point
- Back Image: 2 points
- Sleeve: 1 point each
- Collar: 1 point

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Canvas**: Fabric.js
- **Backend**: Supabase
- **Deployment**: Vercel
- **Payments**: Stripe (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/jersey-artist-studio.git

# Install dependencies
npm install

# Create .env file
cp env.template .env

# Add your Supabase credentials
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Run database migrations
# Run supabase-schema-points.sql in Supabase SQL Editor
# Run supabase-schema-points-update.sql for free trial
# Run supabase-schema-otp.sql for OTP verification

# Start development server
npm run dev
```

Visit `http://localhost:8080`

## 📊 Database Setup

Run these SQL files in Supabase SQL Editor (in order):

1. `supabase-schema-points.sql` - Main points system
2. `supabase-schema-points-update.sql` - Free trial feature
3. `supabase-schema-otp.sql` - OTP verification

## 🌐 Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
npm run deploy
```

Or use Vercel Dashboard:
1. Import from GitHub
2. Add environment variables
3. Deploy

See `docs/VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── points/         # Points purchase
│   └── ui/             # UI components
├── pages/              # Page components
│   └── steps/          # Design steps
├── hooks/              # Custom hooks
├── lib/                # Utilities
├── types/              # TypeScript types
└── assets/             # Images and assets
```

## 🔒 Environment Variables

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📚 Documentation

All documentation is in the `docs/` folder:

- **Deployment**: `docs/VERCEL_DEPLOYMENT_GUIDE.md`
- **Points System**: `docs/POINTS_SYSTEM_GUIDE.md`
- **Onboarding**: `docs/ONBOARDING_FLOW_GUIDE.md`
- **OTP Verification**: `docs/OTP_VERIFICATION_GUIDE.md`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

Proprietary - All rights reserved

## 📞 Support

- Email: support@dotstitch.com
- Documentation: See `docs/` folder
- Issues: GitHub Issues

---

Built with ❤️ by GX Developer
# DotStitch
