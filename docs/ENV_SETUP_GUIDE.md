# Environment Variables Setup Guide

## Supabase Configuration

This guide will help you set up the environment variables needed for the Jersey Artist Studio application.

## Required Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url-here
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

## How to Get Your Supabase Credentials

1. **Go to your Supabase project dashboard**: https://app.supabase.com
2. **Select your project** (or create a new one if you haven't already)
3. **Navigate to Settings** → **API**
4. **Copy the following values:**
   - **Project URL**: This is your `VITE_SUPABASE_URL`
   - **anon/public key**: This is your `VITE_SUPABASE_ANON_KEY`

## Step-by-Step Setup

### 1. Create the `.env` file

Create a new file named `.env` in the root directory of your project with the following content:

```env
VITE_SUPABASE_URL=your-supabase-project-url-here
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 2. Replace the placeholder values

Replace `your-supabase-project-url-here` and `your-supabase-anon-key-here` with your actual Supabase credentials.

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTI5OTYwMCwiZXhwIjoxOTYwODc1NjAwfQ.example-key
```

### 3. Initialize Supabase Database

Before running the application, you need to set up the database schema:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the schema

This will create all the necessary tables, policies, and functions for your application.

## Optional Environment Variables

If you need to perform server-side operations, you can add the service role key (but never expose this in client-side code):

```env
# Optional: Service Role Key (NEVER expose this in client-side code)
# Only use this for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **WARNING**: The service role key bypasses Row Level Security (RLS) and should NEVER be exposed in client-side code or committed to version control.

## Security Notes

- ✅ The `VITE_SUPABASE_ANON_KEY` is safe to expose in client-side code
- ✅ The `.env` file is already added to `.gitignore` to prevent accidental commits
- ❌ Never commit your `.env` file to version control
- ❌ Never expose your service role key in client-side code

## Verification

After setting up your environment variables, you can verify the configuration by:

1. Starting the development server: `npm run dev`
2. Checking the browser console for any Supabase connection errors
3. Testing the authentication features

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure your `.env` file is in the root directory and contains both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Issue: "Invalid API key"

**Solution**: Verify that you copied the correct `anon/public` key from your Supabase project settings.

### Issue: "Failed to connect to Supabase"

**Solution**: 
- Check your internet connection
- Verify the project URL is correct
- Ensure your Supabase project is active

## Database Schema

The application uses the following tables:
- `user_profiles` - User account information and subscription details
- `design_projects` - Saved jersey design projects
- `export_history` - History of all exports
- `usage_analytics` - User activity analytics
- `subscription_plans` - Available subscription tiers

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Support

If you encounter any issues with the setup, please refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- Project README.md

