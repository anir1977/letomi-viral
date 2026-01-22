# 🚀 DEPLOYMENT GUIDE - CurioSpark

## Production Deployment to Vercel (Recommended)

### Prerequisites
- ✅ Supabase project created and schema.sql executed
- ✅ All environment variables ready
- ✅ Tested locally (`npm run dev` works)
- ✅ Code committed to Git/GitHub

---

## Step-by-Step Deployment

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### 3. Deploy

```bash
# From project root
vercel
```

**Answer the prompts:**
- Link to existing project? → No
- Project name? → curiospark (or your choice)
- Which directory? → `./`
- Override settings? → No

### 4. Set Environment Variables

After first deployment, go to:
`https://vercel.com/dashboard → Your Project → Settings → Environment Variables`

Add these variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-key
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxx (optional)
NEXT_PUBLIC_GA_ID=G-XXXXX (optional)
```

**Important:** Select "Production" environment for each variable.

### 5. Redeploy with Environment Variables

```bash
vercel --prod
```

### 6. Verify Deployment

Visit your production URL:
- ✅ Homepage loads
- ✅ Admin panel works (`/admin`)
- ✅ Articles display
- ✅ AI Writer functions
- ✅ Images load
- ✅ SEO meta tags present

---

## Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `curiospark.com`)
3. Follow DNS configuration instructions

### 2. Update Environment Variable

```bash
NEXT_PUBLIC_SITE_URL=https://curiospark.com
```

Redeploy:
```bash
vercel --prod
```

---

## Post-Deployment Checklist

### 🔍 SEO Setup

```bash
□ Submit sitemap to Google Search Console
  URL: https://your-domain.com/sitemap.xml

□ Verify site ownership in Google Search Console

□ Request indexing for homepage and key articles

□ Set up Google Analytics (if using)

□ Check meta tags in browser source
  - Open any article
  - Right-click → View Source
  - Verify <meta> tags present

□ Test rich results
  URL: https://search.google.com/test/rich-results
  Test your article URLs
```

### 💰 AdSense Setup

```bash
□ Apply for Google AdSense
  URL: https://www.google.com/adsense

□ Add ads.txt file (if required by AdSense)
  Location: /public/ads.txt

□ Verify ad units display correctly

□ Test on mobile devices
```

### 📧 Newsletter Setup

```bash
□ Choose email service:
  - Mailchimp (recommended for beginners)
  - ConvertKit (for creators)
  - SendGrid (developer-friendly)

□ Create signup form

□ Update Newsletter component with API keys

□ Test subscription flow
```

### 🔒 Security

```bash
□ Verify RLS policies in Supabase
  - Run rls_policies.sql if not done

□ Check admin authentication works

□ Test API endpoints are protected

□ Enable 2FA on Supabase account

□ Set up Vercel deployment protection (optional)
```

---

## Performance Optimization

### 1. Vercel Analytics

```bash
# Already installed via @vercel/analytics
# Enable in Vercel dashboard
```

### 2. Image Optimization

```typescript
// Already using Next.js Image component
// Images are automatically optimized
```

### 3. Caching

```bash
# Sitemap and robots.txt have cache headers
# Static assets cached automatically by Vercel
```

---

## Monitoring & Maintenance

### Daily Tasks
- ✅ Check dashboard stats
- ✅ Review new articles
- ✅ Monitor view counts

### Weekly Tasks
- ✅ Generate 2-3 new articles
- ✅ Review SEO scores
- ✅ Check for errors in Vercel logs
- ✅ Update trending articles

### Monthly Tasks
- ✅ Analyze Google Analytics
- ✅ Review top-performing content
- ✅ Optimize low-traffic articles
- ✅ Update categories if needed
- ✅ Backup Supabase data

---

## Scaling Considerations

### When Traffic Grows

**Supabase Free Tier Limits:**
- 500MB database
- 2GB bandwidth/month
- 50,000 monthly active users

**Upgrade triggers:**
- 100+ articles
- 10,000+ monthly visitors
- Consider Supabase Pro ($25/month)

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited sites

**Upgrade triggers:**
- 100,000+ monthly visitors
- Consider Vercel Pro ($20/month)

### Performance Tips

```bash
# If database queries slow down:
1. Review indexes in schema.sql (already optimized)
2. Consider Supabase caching
3. Implement Redis for hot data (advanced)

# If images slow:
1. All images lazy-loaded (already implemented)
2. Consider CDN (Vercel includes this)
3. Compress images before upload

# If API limits hit:
1. Unsplash: Upgrade to paid plan or cache images
2. Implement image storage in Supabase Storage
```

---

## Troubleshooting

### Common Issues

**1. "Environment variables not found"**
```bash
Solution:
- Check Vercel dashboard → Settings → Environment Variables
- Ensure variables are set for "Production"
- Redeploy after adding variables
```

**2. "Database connection failed"**
```bash
Solution:
- Verify Supabase project is active
- Check Supabase URL and anon key are correct
- Ensure schema.sql was executed
- Check Supabase dashboard for errors
```

**3. "Images not loading"**
```bash
Solution:
- Verify Unsplash API key is valid
- Check API rate limits (50/hour free)
- Test with placeholder images first
- Review browser console for errors
```

**4. "Articles not showing"**
```bash
Solution:
- Create articles via AI Writer
- Set status to "published"
- Check category is assigned
- Verify in Supabase table editor
```

**5. "SEO meta tags missing"**
```bash
Solution:
- Check NEXT_PUBLIC_SITE_URL is set correctly
- View page source to debug
- Ensure article has seo_title and seo_description
- Regenerate via AI Writer if needed
```

---

## Backup Strategy

### Supabase Backups

**Free Tier:**
- Daily backups (7-day retention)
- Manual backup via Supabase dashboard

**Recommended:**
```bash
# Export data periodically
1. Go to Supabase Dashboard
2. Database → Export
3. Download SQL dump
4. Store securely (encrypted)
```

### Code Backups

```bash
# Already handled if using Git
git push origin main

# Vercel automatically deploys from Git
```

---

## Cost Breakdown

### Free Tier (First 3-6 months)

```
Vercel:        $0/month (100GB bandwidth)
Supabase:      $0/month (500MB database)
Unsplash:      $0/month (50 images/hour)
Total:         $0/month ✅
```

### Growing (10K-50K visitors/month)

```
Vercel:        $0-20/month
Supabase:      $0-25/month
Unsplash:      $0/month (or upgrade if needed)
Domain:        $10-15/year
Total:         ~$30-50/month
```

### Scaling (100K+ visitors/month)

```
Vercel Pro:    $20/month
Supabase Pro:  $25/month
Unsplash:      $0/month (cache images)
CDN:           Included (Vercel)
Total:         ~$50/month
```

---

## Success Metrics

### Week 1
- ✅ 10-20 articles published
- ✅ Site indexed by Google
- ✅ First organic visitors

### Month 1
- ✅ 50+ articles
- ✅ 1,000+ monthly visitors
- ✅ Google Search Console data

### Month 3
- ✅ 100+ articles
- ✅ 5,000+ monthly visitors
- ✅ AdSense approval (if applied)
- ✅ Growing email list

### Month 6
- ✅ 200+ articles
- ✅ 20,000+ monthly visitors
- ✅ Steady revenue stream
- ✅ Consider scaling

---

## Next Steps After Deployment

1. **Content Creation**
   - Generate 5 articles per week
   - Mix categories for diversity
   - Use AI Writer for speed

2. **SEO Optimization**
   - Monitor Google Search Console
   - Update low-performing articles
   - Target long-tail keywords

3. **Traffic Growth**
   - Share on social media
   - Build email list
   - Guest posting
   - Internal linking

4. **Monetization**
   - Apply for AdSense
   - Affiliate links (relevant products)
   - Sponsored content (when traffic grows)
   - Email sponsorships

5. **Community Building**
   - Newsletter growth
   - Social media presence
   - Engage with readers
   - Create content calendar

---

## Support Resources

**Official Documentation:**
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs

**Community:**
- Supabase Discord: https://discord.supabase.com
- Vercel Discord: https://vercel.com/discord

**SEO Tools:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Rich Results Test: https://search.google.com/test/rich-results

---

## 🎉 You're Live!

Your viral content platform is now deployed and ready to scale!

**Remember:**
- ✅ Content is king - publish regularly
- ✅ SEO takes time - be patient
- ✅ Analyze and optimize - use data
- ✅ Engage your audience - build community

**Good luck with your viral content journey! 🚀**

---

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Set environment variable
vercel env add NEXT_PUBLIC_SITE_URL

# Rollback deployment
vercel rollback

# Remove deployment
vercel remove curiospark
```

---

**Questions? Check PRODUCTION_READY.md and QUICK_START.md for more details.**
