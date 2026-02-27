import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostBadge from '@/app/components/PostBadge';
import Breadcrumb from '@/app/components/Breadcrumb';
import { TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: '🔥 Trending Facts - Most Popular | CurioSpark',
  description: 'Discover the most popular and trending facts right now. See what thousands of curious minds are reading and sharing today.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '🔥 Trending Facts - Most Popular | CurioSpark',
    description: 'Discover the most popular and trending facts right now. See what thousands are reading.',
  },
};

export default function TrendingPage() {
  const posts = Array.from(new Map(getAllPosts().map((post) => [post.slug, post])).values());
  
  // Sort by views (descending)
  const trendingPosts = [...posts].sort((a, b) => {
    const viewsA = parseFloat(a.views.replace('K', ''));
    const viewsB = parseFloat(b.views.replace('K', ''));
    return viewsB - viewsA;
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Trending', href: '/trending' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Now
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The most popular facts our readers can't stop sharing. Updated daily based on views and engagement.
          </p>
        </div>

        <div className="space-y-6">
          {trendingPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {post.date}
                        </span>
                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {post.views} views
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.readingTime}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
