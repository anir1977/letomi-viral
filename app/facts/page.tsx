import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostBadge from '@/app/components/PostBadge';
import Breadcrumb from '@/app/components/Breadcrumb';

export const metadata: Metadata = {
  title: '📚 All Facts - CurioSpark',
  description: 'Browse our complete collection of fascinating, verified facts across science, history, nature, and culture. Discover mind-blowing truths backed by research.',
  openGraph: {
    title: '📚 All Facts - Complete Collection | CurioSpark',
    description: 'Browse our complete collection of fascinating, verified facts across science, history, nature, and culture.',
  },
};

export default function FactsPage() {
  const posts = Array.from(new Map(getAllPosts().map((post) => [post.slug, post])).values());

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'All Facts', href: '/facts' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            📚 All Facts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse our complete collection of {posts.length}+ fascinating, verified facts across science, history, nature, and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
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
