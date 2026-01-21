# CurioSpark ⚡ - Short Facts. Big Curiosity.

A modern, SEO-optimized viral content website built with Next.js 14, designed for AdSense monetization and maximum engagement.

## 🚀 Features

- **Next.js 14 App Router**: Modern React framework with server-side rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive, beautiful design with dark mode support
- **SEO Optimized**: Professional article pages with:
  - Breadcrumb navigation with Schema.org markup
  - Author boxes for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
  - FAQ sections with Schema.org markup for rich snippets
  - Featured images with Next.js Image optimization
  - Meta descriptions and structured metadata
- **AdSense Ready**: Privacy Policy, Terms of Service, and compliant content
- **20 Quality Articles**: Across 4 engaging categories

## 📂 Project Structure

```
letomi-viral/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Breadcrumb.tsx   # SEO breadcrumb navigation
│   │   ├── AuthorBox.tsx    # Author information box
│   │   └── FAQSection.tsx   # Expandable FAQ accordion
│   ├── categories/          # Category listing page
│   ├── category/[slug]/     # Individual category pages
│   ├── post/[slug]/         # Article pages
│   ├── about/               # About page
│   ├── privacy-policy/      # Privacy policy (AdSense required)
│   ├── terms-of-service/    # Terms of service (AdSense required)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── lib/
│   └── posts.ts             # Static data and helper functions
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Categories

- **Psychology** 🧠 - Explore the fascinating workings of the human mind
- **Science** 🔬 - Discover incredible scientific facts and breakthroughs
- **Human Behavior** 👥 - Understand why we do what we do
- **Life Facts** 🌟 - Surprising truths about everyday life

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## � Admin Authentication Setup

### Required Environment Variables

The admin panel uses **Supabase** for authentication. You must configure these environment variables in **Vercel Dashboard**:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ Yes |

### Setting Up in Vercel

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click **Settings** → **Environment Variables**

2. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Apply to Environments**
   - Select: Production, Preview, and Development
   - Click **Save**

4. **Redeploy**
   - Go to **Deployments** tab
   - Click **...** next to latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger deployment

### Getting Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Creating Admin Users

1. In Supabase Dashboard:
   - Go to **Authentication** → **Users**
   - Click **Add user**
   - Enter admin email and password
   - User can now login at `/admin/login`

2. Add email to admin allowlist:
   - Edit `lib/admin-auth.ts`
   - Add email to `ADMIN_EMAILS` array
   - Commit and deploy

### Local Development

For local development, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** `.env.local` is git-ignored for security.

### Security Notes

- ✅ No credentials are hardcoded in the repository
- ✅ All authentication is handled server-side by Supabase
- ✅ Environment variables are managed securely in Vercel
- ✅ Admin access is restricted to allowlisted emails
- ❌ Never commit `.env.local` to version control

## �📈 SEO Features

### Breadcrumb Navigation
- Schema.org BreadcrumbList markup
- Improves site architecture visibility
- Enhances user navigation

### Author Box
- Establishes content authority
- Improves E-E-A-T signals
- Professional presentation

### FAQ Sections
- Schema.org FAQPage markup
- Eligible for Google rich snippets
- Answers user questions directly
- Improves featured snippet chances

### Featured Images
- Next.js Image component for optimization
- Unsplash high-quality images
- Proper alt text for accessibility and SEO
- Lazy loading for performance

## 🎨 Customization

### Adding New Articles

Edit `lib/posts.ts` and add a new post object:

```typescript
{
  id: "21",
  title: "Your Article Title",
  slug: "your-article-slug",
  category: "psychology", // or science, human-behavior, life-facts
  excerpt: "Brief description...",
  image: "https://images.unsplash.com/...",
  imageAlt: "Descriptive alt text",
  content: `Your article content...`,
  readingTime: "3 min",
  views: "1.2K",
  date: "2026-01-20",
  faqs: [
    {
      question: "Your question?",
      answer: "Your answer..."
    }
  ]
}
```

### Changing Brand Colors

Edit `tailwind.config.ts` to modify the color scheme.

### Updating Metadata

Edit `app/layout.tsx` to change site-wide metadata.

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the static site:
```bash
npm run build
```

The output will be in `.next` directory, ready for deployment to any hosting platform that supports Next.js.

## 📝 AdSense Integration

To add Google AdSense:

1. Apply for AdSense with your domain
2. Add the AdSense script to `app/layout.tsx`
3. Insert ad units in components or pages
4. Ensure Privacy Policy and Terms pages are accessible

## 🎯 Performance

- Static generation for all pages
- Image optimization with Next.js Image
- Lazy loading
- Code splitting
- Optimized fonts

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS