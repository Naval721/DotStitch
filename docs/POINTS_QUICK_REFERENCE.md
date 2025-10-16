# ⚡ Points System - Quick Reference Card

## 💰 Point Packages

| Package | Price | Points | Best For |
|---------|-------|--------|----------|
| **Basic** | ₹1,000 | 700 | Small projects |
| **Professional** ⭐ | ₹2,500 | 2,000 | Regular use |
| **Enterprise** | Custom | Custom | Large teams |

## 🎯 Point Costs

```
Front Image     = 1 point
Back Image      = 2 points
Sleeve          = 1 point
Collar          = 1 point
Full Jersey     = 4 points
Full + Collar   = 5 points
```

## 📊 Example Calculations

**With 700 points (Basic Package):**
- 700 front images
- 350 back images
- 175 full jerseys
- 140 full jerseys with collar

**With 2,000 points (Professional Package):**
- 2,000 front images
- 1,000 back images
- 500 full jerseys
- 400 full jerseys with collar

## 🔧 Quick Code Examples

### Check Balance
```typescript
const { checkPointsBalance } = useAuth()
const canExport = checkPointsBalance(4) // 4 points for full jersey
```

### Deduct Points
```typescript
const { deductPoints } = useAuth()
const result = await deductPoints(4, 'Exported full jersey')
```

### Add Points
```typescript
const { addPoints } = useAuth()
const result = await addPoints(700, 'Purchased Basic Package')
```

### Get Current Balance
```typescript
const { currentPoints } = useAuth()
console.log('Balance:', currentPoints)
```

## 📁 Key Files

```
src/types/points.ts              → Types & interfaces
src/components/points/           → Purchase UI
src/hooks/useAuth.tsx            → Points management
src/pages/Pricing.tsx            → Pricing page
supabase-schema-points.sql       → Database setup
```

## 🚀 Setup (3 Commands)

```bash
# 1. Run database migration
# Copy supabase-schema-points.sql to Supabase SQL Editor

# 2. Test points (browser console)
const { addPoints } = useAuth()
await addPoints(700, 'Test')

# 3. Check balance
const { currentPoints } = useAuth()
console.log(currentPoints)
```

## ✅ Features

- ✅ Points never expire
- ✅ Pay once, use anytime
- ✅ Real-time balance
- ✅ Transaction history
- ✅ Beautiful UI
- ✅ No recurring charges

## 🎨 UI Components

1. **Pricing Page** - Package selection
2. **User Dashboard** - Balance & stats
3. **Purchase Dialog** - Buy points
4. **Premium Gate** - Export protection

## 📞 Support

- **Docs**: `POINTS_SYSTEM_GUIDE.md`
- **Setup**: `POINTS_SYSTEM_SETUP_COMPLETE.md`
- **Summary**: `POINTS_SYSTEM_SUMMARY.md`

---

**Status**: ✅ Complete & Ready to Use!

