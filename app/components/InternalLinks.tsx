import Link from 'next/link';
import { getRelatedPosts } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';

interface InternalLinksProps {
  currentSlug: string;
}

export default function InternalLinks({ currentSlug }: InternalLinksProps) {
  const relatedPosts = getRelatedPosts(currentSlug, 4);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 my-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🔗 Related Facts You'll Love
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
