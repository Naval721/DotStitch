# Points-Based Subscription System Guide

## Overview

The Jersey Artist Studio uses a **points-based credits system** instead of traditional monthly subscriptions. Users purchase points once and use them whenever they need to export designs. Points never expire!

## Point Costs

| Export Type | Points Required |
|-------------|----------------|
| Front Image | 1 point |
| Back Image | 2 points |
| Sleeve | 1 point each |
| Collar | 1 point |
| Full Jersey (Front + Back + 2 Sleeves) | 4 points |
| Full Jersey with Collar | 5 points |

## Points Packages

### 1. Basic Package - ₹1,000
- **Points**: 700 base points
- **Total**: 700 points
- **Value**: ₹1.43 per point
- **Best for**: Small projects, occasional use
- **Can export**: ~175 full jerseys

### 2. Professional Package - ₹2,500 ⭐ Most Popular
- **Points**: 1,800 base points + 200 bonus points
- **Total**: 2,000 points
- **Value**: ₹1.25 per point (Best Value!)
- **Best for**: Professional designers, regular use
- **Can export**: ~500 full jerseys

### 3. Enterprise Package - Custom Pricing
- **Points**: Custom amount
- **Price**: Contact for pricing
- **Best for**: Large teams, high-volume use
- **Features**: Volume discounts, dedicated support, custom integrations

## How It Works

### 1. Purchase Points
- Users can purchase points from the Pricing page or User Dashboard
- Points are added instantly to their account
- All payment methods accepted (Credit Card, Debit Card, UPI, Net Banking)

### 2. Export Designs
- When exporting, points are automatically deducted based on the export type
- Users can see their remaining balance in real-time
- Transaction history is tracked for all point usage

### 3. Points Never Expire
- Unlike subscriptions, points never expire
- Use them at your own pace
- No monthly renewals or pressure to use them

## Database Schema

### User Profiles Table
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    points_balance INTEGER NOT NULL DEFAULT 0,
    total_points_purchased INTEGER NOT NULL DEFAULT 0,
    total_points_used INTEGER NOT NULL DEFAULT 0,
    last_points_update TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Points Transactions Table
```sql
CREATE TABLE points_transactions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    transaction_type TEXT CHECK (transaction_type IN ('purchase', 'usage', 'refund', 'bonus')),
    points_amount INTEGER NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Functions

### Check Points Balance
```typescript
const { checkPointsBalance } = useAuth()
const hasEnough = checkPointsBalance(5) // Check if user has 5+ points
```

### Deduct Points
```typescript
const { deductPoints } = useAuth()
const result = await deductPoints(4, 'Exported full jersey')
if (result.success) {
  // Points deducted successfully
}
```

### Add Points
```typescript
const { addPoints } = useAuth()
const result = await addPoints(700, 'Purchased Basic Package')
if (result.success) {
  // Points added successfully
}
```

## Integration with Stripe (Optional)

To integrate with Stripe for payments:

1. **Create Stripe Products and Prices**
   - Basic Package: ₹1,000
   - Professional Package: ₹2,500
   - Enterprise: Custom pricing

2. **Update PointsPurchase Component**
   ```typescript
   import { loadStripe } from '@stripe/stripe-js'
   
   const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY)
   
   const handlePurchase = async (packageId: string) => {
     const response = await fetch('/api/create-checkout-session', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ packageId })
     })
     
     const session = await response.json()
     await stripe.redirectToCheckout({ sessionId: session.id })
   }
   ```

3. **Create Checkout Session Endpoint**
   ```typescript
   // Server-side
   import Stripe from 'stripe'
   
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
   
   const session = await stripe.checkout.sessions.create({
     payment_method_types: ['card'],
     line_items: [{
       price: package.stripePriceId,
       quantity: 1,
     }],
     mode: 'payment',
     success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
     cancel_url: `${origin}/pricing`,
   })
   ```

4. **Handle Webhook for Successful Payment**
   ```typescript
   // When payment succeeds, add points to user account
   const { addPoints } = useAuth()
   await addPoints(pointsAmount, 'Purchased via Stripe')
   ```

## UI Components

### PointsPurchase Component
- Displays available point packages
- Shows current balance
- Handles purchase flow
- Located at: `src/components/points/PointsPurchase.tsx`

### UserDashboard Component
- Shows current points balance
- Displays purchase/usage history
- "What you can export" calculator
- Buy more points button
- Located at: `src/components/auth/UserDashboard.tsx`

### PremiumGate Component
- Checks if user has enough points
- Shows "Buy Points" prompt if insufficient
- Located at: `src/components/auth/PremiumGate.tsx`

## Features

### ✅ Advantages of Points System
1. **No Expiration**: Points never expire
2. **Pay Once**: No recurring charges
3. **Flexible**: Use points at your own pace
4. **Transparent**: Clear point costs for each export
5. **Scalable**: Easy to add new point packages
6. **Fair**: Pay only for what you use

### 📊 Analytics
- Total points purchased
- Total points used
- Current balance
- Transaction history
- Export patterns

## Setup Instructions

### 1. Run Database Migration
```bash
# In Supabase SQL Editor, run:
supabase-schema-points.sql
```

### 2. Update Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key (optional)
```

### 3. Install Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 4. Test the System
1. Create a test user account
2. Purchase a test point package
3. Export a design to see points deducted
4. Check transaction history

## Testing

### Manual Testing
1. **Purchase Flow**
   - Go to Pricing page
   - Click "Buy Now" on a package
   - Complete checkout (or simulate)
   - Verify points added to account

2. **Export Flow**
   - Export a design
   - Verify points deducted
   - Check transaction history
   - Verify balance updated

3. **Edge Cases**
   - Insufficient points
   - Zero points
   - Refund scenario
   - Bonus points

## Support

For questions or issues:
- Email: support@jerseyartist.com
- Documentation: [Full Docs](https://docs.jerseyartist.com)
- GitHub Issues: [Report Bug](https://github.com/jerseyartist/issues)

## License

Proprietary - Jersey Artist Studio

