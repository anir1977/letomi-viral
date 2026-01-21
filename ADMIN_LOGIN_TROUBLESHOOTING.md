# 🔧 Admin Login Troubleshooting Guide

This guide helps diagnose and fix common admin login issues.

## Quick Diagnostic

Run this command to check your Supabase configuration:

```bash
node scripts/test-supabase.js
```

This will verify:
- ✅ Environment variables are set
- ✅ Supabase client can connect
- ✅ Current session status

## Common Issues & Solutions

### Issue 1: "Invalid credentials" error

**Symptoms:**
- Login form shows "Invalid credentials" error
- Console shows auth error

**Causes & Solutions:**

1. **User doesn't exist in Supabase**
   - **Solution:** Create the user in Supabase Dashboard
   - Go to: https://app.supabase.com → Your Project → Authentication → Users
   - Click "Add user"
   - Email: `yuba1977@gmail.com` (or your admin email)
   - Password: Set a strong password
   - Click "Create user"

2. **Wrong password**
   - **Solution:** Reset password in Supabase Dashboard
   - Go to: Authentication → Users → Find user → Reset password

3. **Email not confirmed**
   - **Solution:** In Supabase Dashboard:
   - Find the user → Click the three dots → "Confirm email"

### Issue 2: "Supabase not configured" warning

**Symptoms:**
- Yellow warning box appears on login page
- Console shows "Supabase not configured"

**Solution:**

**For Local Development:**
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://lbyrkhqnhkmwywhwtlwe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**For Production (Vercel):**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy the project

### Issue 3: "Access Denied" after login

**Symptoms:**
- Login succeeds but shows "Access Denied" screen
- Message: "Your account does not have admin privileges"

**Cause:**
- User email is not in the admin allowlist

**Solution:**
Add the email to `/lib/admin-auth.ts`:

```typescript
export const ADMIN_EMAILS = [
  'yuba1977@gmail.com',
  'your-email@example.com',  // Add your email here
];
```

### Issue 4: Redirects to login immediately after successful login

**Symptoms:**
- Login appears successful
- Immediately redirected back to login page

**Causes & Solutions:**

1. **Session not persisting**
   - Check browser console for errors
   - Clear browser cache and cookies
   - Try in incognito/private mode

2. **Supabase auth state not updating**
   - Check Network tab for Supabase auth requests
   - Verify NEXT_PUBLIC_SUPABASE_URL is correct

### Issue 5: Build errors

**Symptoms:**
- `npm run build` fails
- Error: "Missing Supabase environment variables"

**Solution:**
This is expected and safe. The code handles missing env vars during build.
Environment variables are only needed at **runtime**, not build time.

## Debugging Steps

### Step 1: Check Browser Console

Open Developer Tools (F12) and check Console tab for:

```
🔐 Attempting login for: your-email@example.com
✅ Login successful! User: your-email@example.com
🔄 Redirecting to /admin...
```

If you see errors, they will help identify the issue.

### Step 2: Check Network Tab

1. Open Developer Tools → Network tab
2. Try to login
3. Look for requests to `supabase.co`
4. Check response status and body

### Step 3: Verify Supabase Project

Go to your Supabase Dashboard:
- **Project Status:** Should be "Active" (not paused)
- **Authentication:** Should be enabled
- **Users:** Admin user should exist
- **RLS Policies:** Should reference your admin email

### Step 4: Check Environment Variables

**Local (.env.local):**
```bash
cat .env.local
```

Should show:
```
NEXT_PUBLIC_SUPABASE_URL=https://lbyrkhqnhkmwywhwtlwe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Vercel (Production):**
- Vercel Dashboard → Settings → Environment Variables
- Both variables should be present

## Testing Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open admin login:**
   ```
   http://localhost:3000/admin/login
   ```

3. **Check console:**
   - Should see Supabase configuration logs
   - Should NOT see "Supabase not configured" error

4. **Try login:**
   - Use email: `yuba1977@gmail.com`
   - Use password you set in Supabase
   - Watch console for auth logs

## Testing in Production

1. **Deploy to Vercel:**
   ```bash
   git push origin main
   ```

2. **Wait for deployment to complete**

3. **Open admin login:**
   ```
   https://curiospark.org/admin/login
   ```

4. **Try login:**
   - Same credentials as local
   - Should redirect to `/admin` on success

## Admin Access Control

### Current Admin Email

The system uses an **allowlist** approach in `/lib/admin-auth.ts`:

```typescript
export const ADMIN_EMAILS = [
  'yuba1977@gmail.com',
];
```

### Adding New Admins

1. **Add email to allowlist:**
   Edit `/lib/admin-auth.ts` and add the email

2. **Create user in Supabase:**
   Dashboard → Authentication → Users → Add user

3. **Commit and deploy:**
   ```bash
   git add lib/admin-auth.ts
   git commit -m "Add new admin email"
   git push origin main
   ```

### Removing Admin Access

1. **Remove from allowlist:**
   Edit `/lib/admin-auth.ts` and remove the email

2. **Deploy:**
   ```bash
   git push origin main
   ```

3. **Optional:** Delete user from Supabase Dashboard

## Security Checklist

✅ **No hardcoded passwords in code**
✅ **No emails in placeholder text**
✅ **Admin emails in separate config file**
✅ **Supabase keys in environment variables**
✅ **Sessions managed server-side**
✅ **RLS policies protect database**
✅ **Auth state properly verified**

## Still Having Issues?

If none of the above solutions work:

1. **Check Supabase logs:**
   - Dashboard → Logs → Auth logs
   - Look for failed login attempts

2. **Verify project status:**
   - Make sure Supabase project isn't paused
   - Check project billing status

3. **Test with a new user:**
   - Create a test user in Supabase
   - Add to admin allowlist
   - Try logging in with test credentials

4. **Clear everything and retry:**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Rebuild
   npm run build
   
   # Restart dev server
   npm run dev
   ```

## Logs to Check

When debugging, check these console logs:

**On page load:**
```
✅ Supabase configured: https://...
```

**On login attempt:**
```
🔐 Attempting login for: email@example.com
📝 Login response: { success: true, userId: "..." }
✅ Login successful! User: email@example.com
🔄 Redirecting to /admin...
```

**On auth state change:**
```
🔐 Auth check: { authenticated: true, email: "...", admin: true }
🔄 Auth state changed: { authenticated: true, email: "...", admin: true }
```

## Contact

If you still can't resolve the issue, check:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Project README: /README.md
