# ✅ VERIFICATION CHECKLIST - CurioSpark

## Use this checklist to verify everything works correctly

---

## 🗄️ DATABASE VERIFICATION

### Supabase Setup
```bash
□ Logged into Supabase dashboard
□ Created new project
□ Ran schema.sql in SQL Editor (no errors)
□ Ran rls_policies.sql in SQL Editor
□ Can see these tables in Table Editor:
  □ categories (8 rows with icons)
  □ articles
  □ article_images
  □ article_views
  □ analytics_daily
  □ article_relations
□ Functions exist:
  □ increment_article_views
  □ get_trending_articles
  □ get_related_articles
  □ calculate_seo_score
```

**Test:**
```sql
-- Run in Supabase SQL Editor
SELECT * FROM categories;
-- Should return 8 categories with icons
```

---

## 🔑 ENVIRONMENT VARIABLES

### Local Development (.env.local)
```bash
□ Created .env.local file (not .env)
□ Set NEXT_PUBLIC_SUPABASE_URL
□ Set NEXT_PUBLIC_SUPABASE_ANON_KEY
□ Set NEXT_PUBLIC_SITE_URL (http://localhost:3000)
□ Set NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
□ File is in .gitignore (not committed)
```

**Test:**
```bash
# Check if variables are loaded
npm run dev
# Visit http://localhost:3000
# Open browser console
# Type: console.log(process.env)
# Should see NEXT_PUBLIC_* variables
```

---

## 🚀 LOCAL DEVELOPMENT

### Installation
```bash
□ Node.js 18+ installed
□ Ran: npm install
□ No errors during installation
□ Can run: npm run dev
□ Server starts on http://localhost:3000
```

**Test:**
```bash
npm run dev

# Should see:
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000
# ✓ Ready in Xms
```

---

## 🏠 HOMEPAGE VERIFICATION

### Visit http://localhost:3000

```bash
□ Homepage loads without errors
□ No console errors
□ Layout is responsive
□ Dark mode toggle works
□ Navigation menu visible
□ Footer displays
```

**Test:**
```bash
# Open browser console (F12)
# Should have 0 errors
# Check Network tab - all requests should be 200
```

---

## 👤 ADMIN ACCESS

### Visit http://localhost:3000/admin

```bash
□ Admin login page appears
□ Can log in (check Supabase for admin user)
□ Dashboard loads
□ Statistics show (may be zeros initially)
□ Navigation sidebar visible
□ All menu items clickable:
  □ Dashboard
  □ Articles
  □ AI Writer
  □ SEO Tools
  □ Stats
  □ Ads
```

**Test:**
```bash
# If you don't have admin user:
# Go to Supabase → Authentication → Users
# Create a test user manually
# Or use the login page signup
```

---

## 🤖 AI WRITER VERIFICATION

### Visit /admin/ai-writer

```bash
□ Page loads
□ Form displays with all fields:
  □ Topic input
  □ Keywords input
  □ Category dropdown (loads from DB)
  □ Writing mode buttons (5 options)
  □ Tone buttons (4 options)
  □ Length selector
□ "Generate Article" button enabled
```

**Test: Generate Article**
```bash
1. Enter topic: "The Science of Coffee"
2. Keywords: "coffee, caffeine, health, energy"
3. Select category
4. Choose "Viral" mode
5. Choose "Casual" tone
6. Length: "Medium"
7. Click "Generate Article with AI"

Expected results:
□ Loading spinner appears
□ Article generated in 1-2 seconds
□ Preview shows:
  □ Title (catchy, viral)
  □ Content (1500+ words)
  □ SEO metadata
  □ FAQ section
  □ Keywords/tags
□ SEO score displayed (70-95%)
□ Word count shown
□ "Save & Generate Images" button works
```

**After Saving:**
```bash
□ Success message appears
□ Article saved to database
□ Images being generated (Unsplash)
□ Redirects to article edit page
```

---

## 📝 ARTICLE MANAGEMENT

### Visit /admin/articles

```bash
□ Articles list page loads
□ Can see created articles
□ Each article shows:
  □ Title
  □ Status (draft/published)
  □ Category
  □ Views
  □ Created date
□ Can click to edit article
□ Filters work (category, status)
□ Search works
```

**Test: Publish Article**
```bash
1. Find the AI-generated article
2. Click to edit
3. Change status to "Published"
4. Click Save
5. Visit homepage
6. Article should appear in article list
```

---

## 📊 DASHBOARD STATS

### Visit /admin (Dashboard)

**After publishing 1-2 articles:**
```bash
□ Total Articles: Shows correct count
□ Published: Shows published count
□ Drafts: Shows draft count
□ Total Views: Initially 0
□ Top Articles: Shows published articles
□ Trending: May be empty (needs views)
□ Alerts section:
  □ May show "articles without images" (if Unsplash failed)
  □ May show "low traffic" warnings
```

**Test: View Tracking**
```bash
1. Open article in new tab (not admin)
2. Visit: http://localhost:3000/post/[article-slug]
3. Reload page 3-4 times
4. Go back to dashboard
5. Total Views should increase
6. Article should show in "Top Articles"
```

---

## 🖼️ IMAGE VERIFICATION

### Check Article Images

```bash
□ Article has cover image
  (from Unsplash or placeholder)
□ Image displays correctly
□ Alt text is set
□ Images in database:
  - Check Supabase → article_images table
  - Should have entries for the article
```

**Test Unsplash Integration:**
```bash
1. Check .env.local has NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
2. Generate new article via AI Writer
3. After save, check article record:
   □ cover_image_url is populated
4. Check article_images table:
   □ 2-4 inline images created
   □ Each has image_url and alt_text
```

**If Images Don't Load:**
```bash
□ Check Unsplash API key is valid
□ Check browser console for errors
□ Verify Unsplash API rate limit not hit (50/hour free)
□ Fallback placeholder should display
```

---

## 🎯 SEO VERIFICATION

### Check Meta Tags

**Visit any published article:**
```bash
1. Right-click → View Page Source
2. Look for <head> section
3. Verify these tags exist:
   □ <title>Article Title | CurioSpark</title>
   □ <meta name="description" content="...">
   □ <meta name="keywords" content="...">
   □ <meta property="og:title" ...>
   □ <meta property="og:description" ...>
   □ <meta property="og:image" ...>
   □ <meta property="twitter:card" ...>
   □ <script type="application/ld+json"> (JSON-LD schema)
```

**Test Sitemap:**
```bash
□ Visit: http://localhost:3000/sitemap.xml
□ Should see XML sitemap
□ Contains:
  □ Homepage
  □ Static pages (about, categories, etc.)
  □ All published articles
□ No errors in XML
```

**Test Robots.txt:**
```bash
□ Visit: http://localhost:3000/robots.txt
□ Should see plain text file
□ Contains sitemap URL
□ Disallows /admin/
□ Allows / for all bots
```

---

## 🔥 VIRAL FEATURES

### Related Articles

**Visit any article page:**
```bash
□ "You May Also Like" section appears
□ Shows 3-5 related articles
□ Articles from same category
□ Clicking works
```

### Trending Articles

**On sidebar:**
```bash
□ "Trending This Week" widget appears
□ Shows articles with recent views
□ Ranking displayed (1st, 2nd, 3rd)
□ View counts shown
```

### Popular Articles

**On homepage:**
```bash
□ "Most Popular" section appears
□ Shows top articles by total views
□ Medal icons for top 3
□ View counts displayed
```

---

## 💰 ADSENSE INTEGRATION

### Development Mode

```bash
□ Visit article page
□ See "Ad Placeholder (Dev Mode)" boxes
□ Placeholders show in:
  □ Banner position (homepage)
  □ In-article position
  □ Sidebar position
□ Placeholders are styled correctly
```

**Production Mode:**
```bash
# Only after setting:
# NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxx
# and building for production
```

---

## 📧 NEWSLETTER

### Inline Newsletter Component

```bash
□ Newsletter form appears on article pages
□ Email input works
□ "Subscribe" button functional
□ Form submission shows loading state
□ Success message appears
□ Error handling works (invalid email)
```

**Test:**
```bash
1. Enter email: test@example.com
2. Click "Subscribe Free"
3. Should see success message
4. Check browser console for any errors
```

---

## 📱 MOBILE RESPONSIVENESS

### Test on Mobile (or resize browser)

```bash
□ Navigation menu adapts (hamburger menu)
□ Articles are readable
□ Images scale correctly
□ Buttons are tap-friendly
□ Forms work on mobile
□ Admin panel usable on tablet
□ No horizontal scrolling
```

**Test:**
```bash
# Chrome DevTools
1. Press F12
2. Click device toggle (phone icon)
3. Select "iPhone 12 Pro"
4. Navigate through site
5. Test all interactions
```

---

## 🌙 DARK MODE

### Theme Switching

```bash
□ Dark mode toggle visible
□ Clicking toggles theme
□ Colors change appropriately
□ All text remains readable
□ Images have proper contrast
□ Forms styled correctly
□ Persistence works (refresh keeps theme)
```

---

## ⚡ PERFORMANCE

### Page Load Speed

```bash
□ Homepage loads in < 3 seconds
□ Article pages load in < 2 seconds
□ Admin dashboard loads in < 4 seconds
□ Images lazy-load
□ No layout shifts (CLS)
□ Smooth scrolling
```

**Test with Lighthouse:**
```bash
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" + "SEO" + "Accessibility"
4. Click "Generate report"

Target scores:
□ Performance: 80+
□ SEO: 90+
□ Accessibility: 85+
□ Best Practices: 80+
```

---

## 🐛 ERROR HANDLING

### Test Error Scenarios

**Database Connection:**
```bash
1. Stop Supabase (or use invalid URL)
2. Visit site
3. Should see:
   □ Graceful error messages (not crashes)
   □ Loading states
   □ Retry options
```

**Missing Data:**
```bash
1. Visit article with no images
2. Should show:
   □ Placeholder or default image
   □ No broken image icons
```

**Invalid Routes:**
```bash
1. Visit: /post/non-existent-slug
2. Should show:
   □ 404 page or error message
   □ Navigation still works
   □ Can return to homepage
```

---

## 🔍 BROWSER CONSOLE

### Check for Errors

```bash
□ Open DevTools (F12)
□ Go to Console tab
□ Navigate through entire site
□ Should have:
  □ Zero red errors
  □ Minimal warnings
  □ No React errors
```

**Common acceptable warnings:**
```bash
✓ Hydration warnings (usually harmless)
✓ Image optimization suggestions
✓ Next.js info messages
```

---

## 🏗️ BUILD TEST

### Production Build

```bash
# Test production build locally
npm run build

Expected:
□ Build completes successfully
□ No TypeScript errors
□ No linting errors
□ All pages compile
□ Static generation works

# Test production mode
npm start

□ Site runs on port 3000
□ All features work
□ Ads should show (if env vars set)
□ Performance improved
```

---

## ✅ FINAL CHECKLIST

### Before Deployment

```bash
□ All database tables created
□ Environment variables set
□ At least 5 articles published
□ Images working (Unsplash or placeholder)
□ SEO meta tags verified
□ Sitemap.xml accessible
□ robots.txt accessible
□ No console errors
□ Mobile responsive
□ Dark mode works
□ Build completes successfully
□ All tests pass
□ Documentation reviewed
```

### Ready to Deploy?

```bash
□ Code committed to Git
□ .env.local NOT committed
□ .gitignore includes .env*.local
□ README.md updated
□ All team members notified
□ Backup plan in place
```

---

## 🎉 SUCCESS CRITERIA

### You're ready to deploy if:

```
✅ AI Writer generates articles in < 10 seconds
✅ Dashboard shows real statistics
✅ Articles save to database successfully
✅ Images load from Unsplash or placeholders
✅ SEO meta tags present on all pages
✅ Sitemap and robots.txt accessible
✅ Mobile responsive design works
✅ No critical errors in console
✅ Production build succeeds
✅ All environment variables configured
```

---

## 🚨 Troubleshooting Guide

### Common Issues & Solutions

**Issue: "Cannot connect to Supabase"**
```bash
Solution:
1. Check NEXT_PUBLIC_SUPABASE_URL
2. Verify project is active in Supabase
3. Check anon key is correct
4. Restart dev server
```

**Issue: "Categories not loading in AI Writer"**
```bash
Solution:
1. Run schema.sql again
2. Check categories table has 8 rows
3. Verify SELECT permission in RLS
4. Check browser console for errors
```

**Issue: "Images not generating"**
```bash
Solution:
1. Verify Unsplash API key
2. Check rate limit (50/hour)
3. Test with placeholder first
4. Check browser console for API errors
```

**Issue: "Articles not appearing on homepage"**
```bash
Solution:
1. Verify status is "published" (not draft)
2. Check published_at date is set
3. Refresh homepage
4. Clear browser cache
5. Check Supabase table directly
```

---

## 📞 Need Help?

1. Check `PRODUCTION_READY.md` for full documentation
2. Review `QUICK_START.md` for setup steps
3. See `DEPLOYMENT_GUIDE.md` for deployment help
4. Check Supabase logs for database errors
5. Review Vercel logs for deployment issues

---

**✅ If all checkboxes are checked, you're ready to deploy to production!**

**🚀 Next step: See DEPLOYMENT_GUIDE.md for Vercel deployment**
