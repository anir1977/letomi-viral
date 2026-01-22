# 🚀 Quick Start Guide - CurioSpark

## Setup in 5 Minutes

### Step 1: Supabase Setup (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Copy and paste content from `/supabase/schema.sql`
5. Click "Run"
6. Copy and paste content from `/supabase/rls_policies.sql`
7. Click "Run"

✅ Database ready!

### Step 2: Get API Keys (1 min)

**Supabase:**
1. Go to Project Settings → API
2. Copy "Project URL" and "anon public" key

**Unsplash (for images):**
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create app
3. Copy "Access Key"

### Step 3: Environment Setup (1 min)

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-unsplash-key
```

### Step 4: Install & Run (1 min)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

✅ Done! You're running!

---

## First Article

1. Go to `/admin` (password from Supabase)
2. Click "AI Writer"
3. Enter topic: "The Science of Coffee"
4. Keywords: "coffee, caffeine, health, energy"
5. Select category
6. Choose "Viral" mode
7. Click "Generate Article with AI"
8. Click "Save & Generate Images"

**Your first viral article is live! 🎉**

---

## Quick Tips

### Generate More Articles
- Use AI Writer for fast content creation
- 5 different writing modes
- Auto SEO optimization
- Images generated automatically

### Check Performance
- Dashboard shows real stats
- Trending articles
- Growth metrics
- SEO scores

### Optimize for Search
- All articles auto-optimized for SEO
- FAQ sections for rich results
- Automatic sitemap
- Schema markup included

---

## Common Issues

**Database Error?**
- Check if schema.sql was run
- Verify environment variables
- Check Supabase project is active

**Images Not Loading?**
- Get Unsplash API key
- Free tier: 50 requests/hour
- Set NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

**No Articles Showing?**
- Create first article via AI Writer
- Make sure status is "published"
- Check database connection

---

## Next Steps

1. ✅ Create 5-10 articles with AI Writer
2. ✅ Customize branding (logo, colors)
3. ✅ Apply for Google AdSense
4. ✅ Set up Google Analytics
5. ✅ Deploy to Vercel
6. ✅ Submit to Google Search Console
7. ✅ Share on social media
8. ✅ Watch your traffic grow! 📈

---

## Production Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# That's it!
```

Set environment variables in Vercel dashboard.

---

## 🎯 Your Platform is Ready!

You now have a **production-ready viral content platform** with:
- Real database
- AI content generation
- SEO optimization
- Image auto-generation
- Analytics
- Viral features

**Start creating and watch your traffic explode! 🚀**
