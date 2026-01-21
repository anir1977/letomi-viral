# ⚡ Admin Dashboard - Cheat Sheet

## 🚀 Ultra-Quick Start
```bash
npm run dev
# Visit: http://localhost:3000/admin
# Login: any email/password (demo mode)
```

## 📍 Routes
- `/admin` - Dashboard
- `/admin/articles` - List
- `/admin/articles/new` - Create
- `/admin/articles/[id]` - Edit
- `/admin/seo` - SEO
- `/admin/stats` - Analytics
- `/login` - Login

## 📂 Key Files
```
app/admin/
├── layout.tsx              # Wrapper
├── page.tsx                # Dashboard
├── ArticleEditor.tsx       # Editor
├── components/             # UI components
├── lib/mockData.ts         # Demo data
├── lib/supabase.ts         # DB (TODO)
└── types/index.ts          # Types
```

## 🎨 Components
- `AdminSidebar` - Navigation
- `AdminTopBar` - User menu
- `Card` - Container
- `StatCard` - Stats widget

## 📝 Features
✅ Dashboard with stats
✅ Article CRUD (UI only)
✅ Search & filter
✅ SEO management
✅ Analytics page
✅ Responsive design
✅ Dark mode ready

## ⚠️ TODO
- [ ] Connect Supabase
- [ ] Real auth
- [ ] Image upload
- [ ] Rich text editor

## 🔧 Common Tasks

### Add Route
1. Create `app/admin/your-route/page.tsx`
2. Add to sidebar in `AdminSidebar.tsx`

### Add Component
1. Create in `app/admin/components/`
2. Export and import

### Customize
- Colors: Edit Tailwind classes
- Nav: `AdminSidebar.tsx`
- Config: `app/admin/config.ts`

## 📚 Full Docs
- Setup: `ADMIN_QUICKSTART.md`
- Complete: `ADMIN_README.md`
- Roadmap: `ADMIN_ROADMAP.md`
- Structure: `ADMIN_FILE_TREE.md`

## 🐛 Quick Fixes
```bash
# Build errors
npm run build

# Module not found
npm install

# Port in use
lsof -ti:3000 | xargs kill -9
```

## 💾 Supabase Integration (Quick)
```typescript
// 1. Install
npm install @supabase/supabase-js

// 2. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

// 3. Update lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(url, key)

// 4. Use in components
const { data } = await supabase.from('articles').select('*')
```

## 🎯 Status
✅ UI Complete
⏳ DB Integration Needed
📦 Production Ready (UI)

---
📖 See `ADMIN_INDEX.md` for full documentation index
