# 🎛️ Admin Dashboard Documentation

## Overview

Professional Admin Dashboard for managing Letomi's viral content website. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## 📁 Structure

```
app/admin/
├── layout.tsx                 # Admin layout wrapper with auth
├── page.tsx                   # Dashboard overview
├── components/
│   ├── AdminSidebar.tsx      # Left navigation sidebar
│   ├── AdminTopBar.tsx       # Top bar with user menu
│   ├── ArticleEditor.tsx     # Article creation/editing form
│   ├── Card.tsx              # Reusable card component
│   └── StatCard.tsx          # Stats widget component
├── articles/
│   ├── page.tsx              # Articles list with table
│   ├── new/
│   │   └── page.tsx          # Create new article
│   └── [id]/
│       └── page.tsx          # Edit article by ID
├── seo/
│   └── page.tsx              # SEO & meta management
├── stats/
│   └── page.tsx              # Analytics & performance
├── lib/
│   ├── mockData.ts           # Mock data for demo
│   └── supabase.ts           # Supabase client (placeholder)
└── types/
    └── index.ts              # TypeScript types
```

## 🚀 Routes

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview with stats widgets |
| `/admin/articles` | List all articles in a table |
| `/admin/articles/new` | Create new article |
| `/admin/articles/[id]` | Edit existing article |
| `/admin/seo` | Manage SEO settings and metadata |
| `/admin/stats` | View analytics and traffic stats |
| `/login` | Admin login page |

## 🎨 Features

### Dashboard Overview
- **Stats Cards**: Total articles, published, drafts, total views
- **Top Articles**: Top 5 performing articles
- **Quick Actions**: Fast access to common tasks
- **Recent Activity**: Timeline of recent changes

### Article Management
- **Search & Filter**: Find articles by title, category, or status
- **Table View**: Sortable table with all article metadata
- **CRUD Operations**: Create, edit, delete articles
- **Bulk Actions**: Ready for future implementation

### Article Editor
- ✍️ **Title** with auto-generated slug
- 📂 **Category** selection
- 🏷️ **Tags** input (add/remove)
- 🖼️ **Cover image** URL (ready for Supabase Storage)
- 📝 **Content editor** (Markdown support)
- 🔍 **SEO fields**: Meta title & description
- 💾 **Draft/Publish** status
- Character counters for SEO fields

### SEO Management
- Site-wide SEO settings
- Default meta tags
- Social media metadata (Twitter, OG)
- Google Analytics integration placeholder
- Live Google Search preview

### Analytics & Stats
- Traffic overview chart
- Top pages by views
- Traffic sources breakdown
- Device statistics (Mobile/Desktop/Tablet)
- Engagement metrics
- Time range filters (7d, 30d, 90d, 1y)

## 🔐 Authentication

### Current State (Demo)
- Mock authentication in `/login`
- Accepts any email/password for demo
- Middleware placeholder at `/middleware.ts`

### TODO: Production Setup
1. **Install Supabase**:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. **Configure Environment Variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Update Files**:
   - `app/admin/lib/supabase.ts` - Initialize Supabase client
   - `app/admin/layout.tsx` - Add real auth check
   - `middleware.ts` - Implement session validation
   - `app/login/page.tsx` - Connect to Supabase auth

4. **Database Setup**:
   ```sql
   -- Add role column to users table
   ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
   
   -- Create admin users
   UPDATE users SET role = 'admin' WHERE email = 'admin@letomi.com';
   ```

## 🎯 Next Steps - Supabase Integration

### 1. Articles Table
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);
```

### 2. SEO Settings Table
```sql
CREATE TABLE seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT,
  site_description TEXT,
  site_url TEXT,
  default_meta_title TEXT,
  default_meta_description TEXT,
  twitter_handle TEXT,
  og_image TEXT,
  favicon_url TEXT,
  analytics_id TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Update Article Editor
Replace mock data calls with:
```typescript
// In ArticleEditor.tsx
const handleSubmit = async (e: FormEvent, status: 'draft' | 'published') => {
  e.preventDefault();
  setIsSaving(true);

  const { data, error } = await supabase
    .from('articles')
    .insert([{ ...formData, status }]);

  if (error) {
    console.error('Error saving article:', error);
  } else {
    router.push('/admin/articles');
  }
  
  setIsSaving(false);
};
```

### 4. Update Articles List
```typescript
// In app/admin/articles/page.tsx
const { data: articles } = await supabase
  .from('articles')
  .select('*')
  .order('created_at', { ascending: false });
```

### 5. Image Upload
```typescript
// Add to ArticleEditor.tsx
const handleImageUpload = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('article-images')
    .upload(`${Date.now()}_${file.name}`, file);

  if (data) {
    const url = supabase.storage
      .from('article-images')
      .getPublicUrl(data.path).data.publicUrl;
    
    setFormData({ ...formData, coverImage: url });
  }
};
```

## 🎨 Customization

### Colors
Primary colors are defined in Tailwind classes:
- Blue: `bg-blue-600`, `text-blue-600`
- Purple: `bg-purple-600`, `text-purple-600`
- Green: `bg-green-600`, `text-green-600`

### Dark Mode
All components support dark mode via Tailwind's `dark:` variant. Toggle implementation is ready in `AdminTopBar.tsx`.

### Layout
- Sidebar width: `w-64`
- Max content width: `max-w-7xl`
- Spacing: `space-y-6` for vertical sections

## 📱 Responsive Design

- **Mobile**: Hamburger menu (TODO), single column layouts
- **Tablet**: 2-column grids
- **Desktop**: Full sidebar, 4-column stat grids

## 🧩 Reusable Components

### Card
```tsx
<Card title="My Card" action={<button>Action</button>}>
  Content here
</Card>
```

### StatCard
```tsx
<StatCard
  title="Total Views"
  value="125,430"
  icon={<EyeIcon className="w-6 h-6" />}
  color="blue"
  trend={{ value: '+12%', isPositive: true }}
/>
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Access admin at
http://localhost:3000/admin

# Login page
http://localhost:3000/login
```

## 📋 TypeScript Types

All types are defined in `app/admin/types/index.ts`:
- `Article` - Article structure
- `DashboardStats` - Dashboard statistics
- `TopArticle` - Top articles data
- `SEOSettings` - SEO configuration
- `Category` - Category structure

## 🚧 TODO Checklist

- [ ] Connect to Supabase database
- [ ] Implement real authentication
- [ ] Add image upload to Supabase Storage
- [ ] Implement article delete functionality
- [ ] Add bulk actions (publish/delete multiple)
- [ ] Connect to Google Analytics API
- [ ] Add rich text editor (e.g., TipTap, Lexical)
- [ ] Implement categories management page
- [ ] Add user management for multi-admin
- [ ] Email notifications for new articles
- [ ] Auto-save drafts
- [ ] Article preview before publish
- [ ] Image optimization
- [ ] SEO score checker
- [ ] Mobile responsive sidebar

## 📚 Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ for Letomi**
