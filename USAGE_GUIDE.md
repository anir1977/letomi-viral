# 🚀 دليل استخدام المكونات الجديدة

## 1. FeaturesSection

### الاستخدام:
```tsx
import FeaturesSection from "@/app/components/FeaturesSection";

export default function Page() {
  return (
    <div>
      <FeaturesSection />
    </div>
  );
}
```

### المميزات:
- عرض 6 ميزات رئيسية للموقع
- Bento Grid Layout عصري
- أيقونات من Lucide React
- إحصائيات مؤثرة (10K+ Facts, 50K+ Readers)
- تأثيرات Hover احترافية

---

## 2. TrustSection

### الاستخدام:
```tsx
import TrustSection from "@/app/components/TrustSection";

export default function Page() {
  return (
    <div>
      <TrustSection />
    </div>
  );
}
```

### المميزات:
- Trust Badges (Fact-Checked, Daily Updates, Expert Curated, Ad-Free)
- 3 آراء عملاء مع صور
- تقييم 5 نجوم
- تأثيرات Hover وتفاعلية

### تخصيص Testimonials:
يمكنك تعديل الآراء في الملف مباشرة:

```tsx
const testimonials = [
  {
    name: "اسم العميل",
    role: "الوظيفة",
    content: "نص الرأي...",
    rating: 5,
    avatar: "رابط الصورة",
  },
  // المزيد...
];
```

---

## 3. SkeletonLoader

### الاستخدام الأساسي:
```tsx
import SkeletonCard, { SkeletonGrid, SkeletonArticle } from "@/app/components/SkeletonLoader";

// بطاقة واحدة
<SkeletonCard />

// شبكة من البطاقات
<SkeletonGrid count={6} />

// مقال كامل
<SkeletonArticle />
```

### مثال عملي مع Loading State:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { SkeletonGrid } from "@/app/components/SkeletonLoader";

export default function PostsList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setPosts([...data]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <SkeletonGrid count={6} />;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

---

## 4. تأثيرات CSS الجديدة

### Glass Morphism:
```tsx
<div className="glass">
  محتوى شفاف جميل
</div>

<div className="glass-dark">
  محتوى شفاف داكن
</div>
```

### Gradients:
```tsx
<div className="gradient-premium">Premium</div>
<div className="gradient-fire">Fire</div>
<div className="gradient-ocean">Ocean</div>
<div className="gradient-sunset">Sunset</div>
```

### Bento Cards:
```tsx
<div className="bento-card p-6">
  <h3>عنوان</h3>
  <p>محتوى</p>
</div>
```

### Shadows:
```tsx
<div className="shadow-soft">ظل خفيف</div>
<div className="shadow-medium">ظل متوسط</div>
<div className="shadow-strong">ظل قوي</div>
```

### Animations:
```tsx
<div className="animate-pulse-glow">توهج نابض</div>
<div className="animate-shimmer">تأثير لامع</div>
<div className="animate-bounce-subtle">ارتداد خفيف</div>
<div className="animate-fade-in">ظهور تدريجي</div>
<div className="animate-slide-up">انزلاق للأعلى</div>
<div className="animate-scale-in">تكبير</div>
```

---

## 5. Typography Classes

### العناوين:
```tsx
// جميع العناوين تستخدم خط Space Grotesk تلقائياً
<h1>عنوان رئيسي</h1>
<h2>عنوان ثانوي</h2>
<h3>عنوان فرعي</h3>
```

### النصوص:
```tsx
// النصوص تستخدم خط Inter تلقائياً
<p>نص عادي</p>

// Drop Cap للفقرة الأولى
<p className="drop-cap">
  أول حرف سيكون كبير ومزخرف
</p>
```

---

## 6. Button Styles المحسّنة

### Primary Button:
```tsx
<Link 
  href="/explore" 
  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
>
  <span className="relative z-10 flex items-center gap-2">
    استكشف الآن
    <span className="group-hover:translate-x-1 transition-transform">✨</span>
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</Link>
```

### Secondary Button:
```tsx
<Link 
  href="/about" 
  className="group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
>
  <span className="flex items-center gap-2">
    اعرف المزيد
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>
```

---

## 7. Badge Components

### Live Badge:
```tsx
<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
  </span>
  <span className="text-white text-sm font-semibold">
    ✨ New facts added daily
  </span>
</div>
```

---

## 8. Card Styles

### Basic Card:
```tsx
<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
  <h3>عنوان الكارد</h3>
  <p>محتوى الكارد</p>
</div>
```

### Feature Card:
```tsx
<div className="bento-card p-8 bg-gradient-to-br from-purple-50 to-pink-50 group">
  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 mb-5 group-hover:scale-110 transition-transform duration-300">
    <Icon className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-2xl font-bold text-gray-900 mb-3">عنوان الميزة</h3>
  <p className="text-gray-600 leading-relaxed">وصف الميزة</p>
</div>
```

---

## 💡 نصائح للاستخدام

1. **استخدم Skeleton Loaders** عند تحميل البيانات
2. **استخدم Bento Cards** للمحتوى المهم
3. **استخدم Glass Morphism** للعناصر العائمة
4. **استخدم Gradient Backgrounds** للأقسام البارزة
5. **استخدم Trust Badges** لبناء المصداقية
6. **استخدم Hover Effects** لتحسين التفاعل

---

## 🎨 Color Palette

```css
/* Primary Colors */
Purple: #7c3aed
Pink: #ec4899
Blue: #3b82f6

/* Accent Colors */
Yellow: #fbbf24
Green: #10b981
Orange: #f97316

/* Neutral Colors */
Gray-900: #111827
Gray-700: #374151
Gray-500: #6b7280
Gray-300: #d1d5db
Gray-100: #f3f4f6

/* Gradients */
Premium: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Fire: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
Ocean: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
Sunset: linear-gradient(135deg, #fa709a 0%, #fee140 100%)
```

---

## 📱 Responsive Design

جميع المكونات responsive بالكامل:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

استخدم Classes المعتادة:
- `sm:` للـ Tablet
- `md:` للـ Desktop الصغير
- `lg:` للـ Desktop الكبير
- `xl:` للشاشات الكبيرة جداً

---

**Happy Coding! 🚀**
