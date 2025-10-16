# Jersey Designer Pro - Authentication & Security Setup

This document provides comprehensive instructions for setting up the authentication system and security measures for Jersey Designer Pro.

## 🚀 Quick Start

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set up Environment Variables**
   Create a `.env.local` file in your project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Database Schema**
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the script

### 2. Authentication Features

#### 🔐 User Authentication
- **Sign Up**: Email/password registration with email verification
- **Sign In**: Secure login with session management
- **Sign Out**: Proper session cleanup
- **Password Reset**: Email-based password recovery

#### 👤 User Profiles
- **Automatic Profile Creation**: Profiles created on signup
- **Subscription Management**: Free, Premium, Enterprise tiers
- **Usage Tracking**: Export limits and usage monitoring
- **Profile Updates**: User can update their information

#### 🛡️ Security Features
- **Row Level Security (RLS)**: Database-level access control
- **Rate Limiting**: Prevents abuse and spam
- **File Validation**: Secure file upload handling
- **Anti-Copying Measures**: Runtime protection against copying

## 📊 Subscription Tiers

### Free Tier
- ✅ 5 exports per month
- ✅ 300 DPI quality
- ✅ Individual sleeve export
- ✅ Basic support

### Premium Tier ($19.99/month)
- ✅ 100 exports per month
- ✅ 300 DPI quality
- ✅ Individual sleeve export
- ✅ Priority support
- ✅ Cloud storage
- ✅ Advanced customization

### Enterprise Tier ($99.99/month)
- ✅ 1000 exports per month
- ✅ 300 DPI quality
- ✅ Individual sleeve export
- ✅ 24/7 support
- ✅ Unlimited cloud storage
- ✅ Advanced customization
- ✅ Team collaboration
- ✅ API access

## 🔒 Security Implementation

### Database Security
- **Row Level Security (RLS)**: Users can only access their own data
- **Secure Functions**: Server-side validation and business logic
- **Automatic Triggers**: Profile creation and timestamp updates

### Application Security
- **Rate Limiting**: 10 requests per minute per user
- **File Validation**: Type and size checking
- **Input Sanitization**: XSS and injection prevention
- **Session Management**: Secure token handling

### Anti-Copying Measures
- **Code Obfuscation**: Minified and obfuscated production builds
- **Runtime Protection**: Dev tools detection and prevention
- **Source Map Protection**: Disabled in production
- **Watermarking**: User identification in exports

## 🛠️ API Endpoints

### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: { full_name: 'John Doe' }
  }
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign out
const { error } = await supabase.auth.signOut()
```

### User Profile
```typescript
// Get user profile
const { data, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', user.id)
  .single()

// Update profile
const { data, error } = await supabase
  .from('user_profiles')
  .update({ full_name: 'New Name' })
  .eq('id', user.id)
```

### Export Management
```typescript
// Check export limit
const { data, error } = await supabase
  .rpc('check_export_limit', { user_uuid: user.id })

// Increment usage
const { error } = await supabase
  .rpc('increment_usage_count', { user_uuid: user.id })
```

## 📱 Component Usage

### AuthModal
```tsx
import { AuthModal } from '@/components/auth/AuthModal'

<AuthModal 
  isOpen={showAuth} 
  onClose={() => setShowAuth(false)} 
  defaultMode="signin" // or "signup"
/>
```

### PremiumGate
```tsx
import { PremiumGate } from '@/components/auth/PremiumGate'

<PremiumGate 
  feature="Export & Download" 
  description="Export your designs in professional quality"
>
  <ExportPanel {...props} />
</PremiumGate>
```

### UserDashboard
```tsx
import { UserDashboard } from '@/components/auth/UserDashboard'

<UserDashboard onClose={() => setShowDashboard(false)} />
```

## 🔧 Customization

### Adding New Subscription Tiers
1. Update the `subscription_plans` table
2. Modify the `SECURITY_CONFIG` in `src/lib/security.ts`
3. Update the UI components to reflect new tiers

### Customizing Export Limits
```typescript
// In src/lib/security.ts
export const SECURITY_CONFIG = {
  MAX_FREE_EXPORTS: 5,        // Change this
  MAX_PREMIUM_EXPORTS: 100,   // Change this
  MAX_ENTERPRISE_EXPORTS: 1000 // Change this
}
```

### Adding New Security Measures
```typescript
// In src/lib/security.ts
export const RuntimeProtection = {
  // Add your custom protection methods
  customProtection(): void {
    // Your implementation
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Ensure `.env.local` file exists with correct variables
   - Restart your development server

2. **"Row Level Security policy violation"**
   - Check if user is properly authenticated
   - Verify RLS policies are correctly set up

3. **"Export limit reached"**
   - Check user's subscription tier
   - Verify usage count in database
   - Reset monthly usage if needed

### Database Maintenance

1. **Reset Monthly Usage** (run monthly):
   ```sql
   SELECT public.reset_monthly_usage();
   ```

2. **Clean Up Old Analytics** (run weekly):
   ```sql
   DELETE FROM usage_analytics 
   WHERE created_at < NOW() - INTERVAL '30 days';
   ```

3. **Monitor Usage**:
   ```sql
   SELECT 
     subscription_tier,
     COUNT(*) as user_count,
     AVG(usage_count) as avg_usage
   FROM user_profiles 
   GROUP BY subscription_tier;
   ```

## 📈 Analytics & Monitoring

### User Analytics
- Export history tracking
- Usage pattern analysis
- Feature adoption metrics
- Subscription conversion rates

### Security Monitoring
- Failed login attempts
- Rate limit violations
- Suspicious activity detection
- API usage patterns

## 🔄 Deployment

### Production Checklist
- [ ] Environment variables set
- [ ] Database schema deployed
- [ ] RLS policies active
- [ ] Security measures enabled
- [ ] Analytics tracking configured
- [ ] Backup strategy in place

### Environment Variables (Production)
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_RATE_LIMIT_ENABLED=true
```

## 📞 Support

For technical support or questions about the authentication system:
- Check the troubleshooting section above
- Review the Supabase documentation
- Contact the development team

---

**Note**: This authentication system is designed for production use with enterprise-grade security. Always test thoroughly in a staging environment before deploying to production.
