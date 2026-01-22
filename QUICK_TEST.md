# 🧪 Quick Test Guide - AI Writer Fixes

## ⚡ 2-Minute Test

### 1️⃣ Apply SQL Fix (REQUIRED)

```bash
# Open Supabase SQL Editor
https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql

# Paste and run:
supabase/fix_articles_rls.sql
```

### 2️⃣ Restart App

```bash
npm run dev
```

### 3️⃣ Test Markdown Rendering

1. Go to: http://localhost:3000/admin/ai-writer
2. Generate an article
3. **Check preview:**
   - ✅ Headings are LARGE and BOLD
   - ✅ `**bold text**` shows as **bold** (not **bold**)
   - ✅ Lists have bullets
   - ✅ Content is formatted nicely

### 4️⃣ Test Save Function

1. Click "Save & Generate Images"
2. Open Console (F12)
3. **Look for:**
   ```
   💾 Starting article save process...
   ✅ Article created with ID: xxx
   ```
4. **Success:** Redirects to article edit page

---

## ✅ Expected Console Output

### On Generation:
```
🚀 Generate button clicked!
📝 Keywords list: ['AI', 'tech']
✅ Article generated successfully!
📊 SEO Score: 85
```

### On Save (Success):
```
💾 Starting article save process...
📝 Article payload: { title: "...", ... }
🔄 Calling createArticle...
✅ Article created with ID: abc-123-def
🖼️ Generating article images...
✅ Images generated successfully
🏁 Save process completed
```

### On Save (Error - Before Fix):
```
❌ Error: permission denied for table articles
↑ Run supabase/fix_articles_rls.sql to fix!
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Markdown still plain text | Clear cache (Ctrl+Shift+R) |
| "Permission denied" | Run `fix_articles_rls.sql` |
| "Categories not loaded" | Run `SETUP_COMPLETE.sql` |
| Save button disabled | Fill topic + select category |

---

## 📸 Visual Comparison

### BEFORE (Broken):
```
Content Preview:
# My Article

This is **bold** and *italic* text.

## Section
- Item 1
```

### AFTER (Fixed):
```
Content Preview:
[Large Heading] My Article

This is bold and italic text.

[Medium Heading] Section
• Item 1
```

---

## ✅ Checklist

- [ ] SQL executed in Supabase
- [ ] App restarted
- [ ] Markdown renders correctly
- [ ] Console shows detailed logs
- [ ] Save works without errors
- [ ] Redirect to edit page works

If all checked ✅ → **Both issues are fixed!** 🎉
