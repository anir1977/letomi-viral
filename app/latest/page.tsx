import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostBadge from '@/app/components/PostBadge';
import Breadcrumb from '@/app/components/Breadcrumb';
import { Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '🆕 Latest Facts - Just Published | CurioSpark',
  description: 'Explore our newest fascinating facts, just published. Be the first to discover mind-blowing truths and share them with the world.',
  openGraph: {
    title: '🆕 Latest Facts - Just Published | CurioSpark',
    description: 'Explore our newest fascinating facts. Be the first to discover mind-blowing truths.',
  },
};

export default function LatestPage() {
  const posts = Array.from(new Map(getAllPosts().map((post) => [post.slug, post])).values());
  
  // Sort by date (newest first)
  const latestPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Latest', href: '/latest' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              🆕 Latest Facts
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Fresh, fascinating facts just published. Be among the first to discover and share these mind-blowing truths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                    <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.readingTime}</span>
                    <span>{post.views} views</span>
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
