import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostBadge from '@/app/components/PostBadge';
import Breadcrumb from '@/app/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Latest Articles | CurioSpark',
  description: 'Explore the newest CurioSpark articles, selected for clarity, usefulness, and source quality.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Latest Articles | CurioSpark',
    description: 'Explore the newest CurioSpark articles selected for clarity and usefulness.',
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
      
      <div className="section-wrap py-12">
        <div className="mb-12">
          <p className="section-kicker">Recently published</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            Latest articles
          </h1>
          <p className="mt-4 text-xl leading-8 text-slate-600 max-w-3xl">
            Fresh CurioSpark articles selected for clarity, usefulness, and source quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="article-card group"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="quiet-pill">
                      {post.category}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                    <div className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-950 mb-3 line-clamp-2 group-hover:text-teal-800 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 leading-6 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.readingTime}</span>
                    <span>{post.readingTime}</span>
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
