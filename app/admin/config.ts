// Admin Dashboard Configuration
// Customize your admin dashboard here

export const adminConfig = {
  // Site branding
  branding: {
    siteName: 'CurioSpark',
    logoText: 'L',
    adminTitle: 'Admin Dashboard',
  },

  // Navigation items
  navigation: [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: 'HomeIcon',
      badge: null,
    },
    {
      name: 'Articles',
      href: '/admin/articles',
      icon: 'DocumentTextIcon',
      badge: null,
    },
    {
      name: 'New Article',
      href: '/admin/articles/new',
      icon: 'PlusCircleIcon',
      badge: null,
    },
    {
      name: 'SEO',
      href: '/admin/seo',
      icon: 'MagnifyingGlassIcon',
      badge: null,
    },
    {
      name: 'Stats',
      href: '/admin/stats',
      icon: 'ChartBarIcon',
      badge: null,
    },
  ],

  // Feature flags
  features: {
    darkMode: true,
    notifications: true,
    analytics: true,
    imageUpload: false, // Enable when Supabase Storage is ready
    richTextEditor: false, // Enable when rich text editor is integrated
    bulkActions: false, // Enable when bulk operations are ready
  },

  // Editor settings
  editor: {
    autosave: false, // Enable when autosave is implemented
    autosaveInterval: 30000, // 30 seconds
    markdownSupport: true,
    maxTitleLength: 100,
    maxSlugLength: 100,
    maxMetaTitleLength: 60,
    maxMetaDescriptionLength: 160,
  },

  // Table settings
  table: {
    itemsPerPage: 20,
    sortable: true,
    filterable: true,
  },

  // SEO defaults
  seo: {
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
    twitterCardType: 'summary_large_image',
  },

  // Analytics
  analytics: {
    provider: 'google', // 'google' | 'plausible' | 'custom'
    refreshInterval: 300000, // 5 minutes
  },

  // Supabase (to be configured)
  supabase: {
    // Add your Supabase configuration here when ready
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

export type AdminConfig = typeof adminConfig;
