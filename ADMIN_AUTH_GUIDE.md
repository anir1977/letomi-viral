# Admin Authentication Setup

## Overview
The admin portal is now secured with Supabase Authentication. All credentials are managed securely through Supabase, with no hardcoded emails or passwords in the codebase.

## Access Points

### Admin Login
- **URL**: `https://curiospark.org/admin/login` (or `/admin/login` locally)
- **Features**:
  - Premium, modern UI design
  - Real-time authentication via Supabase
  - Secure session management
  - Error handling with user-friendly messages

### Admin Dashboard
- **URL**: `https://curiospark.org/admin` (or `/admin` locally)
- **Protection**: Automatically redirects to login if not authenticated

## Authentication Flow

1. **Login**: User enters email and password at `/admin/login`
2. **Verification**: Credentials are verified against Supabase Auth
3. **Session**: On success, a secure session is created
4. **Redirect**: User is redirected to `/admin` dashboard
5. **Persistence**: Session persists across page refreshes
6. **Logout**: Click logout button to sign out and return to login

## Environment Variables

Required environment variables (must be set in Vercel):

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note**: These are already configured in Vercel if Supabase is connected to your project.

## Creating Admin Users

Admin users must be created in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" (or "Invite user")
4. Enter the admin's email
5. Set a strong password
6. Optionally, assign role/permissions via RLS policies

## Security Features

✅ **Implemented**:
- Real Supabase authentication (no demo/fake auth)
- No hardcoded credentials anywhere in the code
- Session-based authentication with auto-refresh
- Protected routes via layout component
- Secure logout functionality
- HTTPS encryption in production

✅ **No Exposed Data**:
- Email addresses are never hardcoded
- Passwords are never stored in code
- All auth happens server-side via Supabase

## Route Protection

All routes under `/admin/*` are protected:
- `/admin` - Dashboard (requires auth)
- `/admin/articles` - Article management (requires auth)
- `/admin/stats` - Statistics (requires auth)
- `/admin/seo` - SEO tools (requires auth)
- `/admin/ai-writer` - AI writer (requires auth)
- `/admin/ads` - Ad management (requires auth)

Exception:
- `/admin/login` - Public (accessible without auth)

## Testing Locally

1. Ensure `.env.local` has valid Supabase credentials
2. Create a test user in Supabase Auth
3. Run `npm run dev`
4. Navigate to `http://localhost:3000/admin`
5. You should be redirected to `/admin/login`
6. Enter valid credentials
7. On success, you'll see the dashboard

## Production Deployment

When deploying to Vercel:

1. Ensure environment variables are set in Vercel project settings
2. Push changes to trigger deployment
3. Vercel will build with production Supabase credentials
4. Admin login will work at `https://curiospark.org/admin/login`

## Troubleshooting

**Issue**: "Invalid credentials" error
- **Solution**: Verify the user exists in Supabase Auth
- **Solution**: Check that email/password are correct

**Issue**: Redirected to login immediately after login
- **Solution**: Check Supabase env vars are correct in Vercel
- **Solution**: Verify Supabase project is active

**Issue**: Build errors about Supabase
- **Solution**: Env vars are not required at build time, only runtime
- **Solution**: The code handles missing env vars gracefully during build

## UI Features

The new login page includes:
- Modern gradient background
- Shield icon for security
- Smooth animations
- Responsive design (mobile & desktop)
- Loading states during authentication
- Clear error messages
- "Back to CurioSpark" link
- Security notice about encryption

## Code Structure

Key files:
- `/app/admin/login/page.tsx` - Login page component
- `/app/admin/layout.tsx` - Auth protection wrapper
- `/app/admin/components/AdminTopBar.tsx` - Logout button
- `/lib/supabase/client.ts` - Supabase client setup
- `/middleware.ts` - Route configuration

All authentication logic uses:
- `supabase.auth.signInWithPassword()` - Login
- `supabase.auth.getSession()` - Check session
- `supabase.auth.signOut()` - Logout
- `supabase.auth.onAuthStateChange()` - Listen to changes
