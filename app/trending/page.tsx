import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostBadge from '@/app/components/PostBadge';
import Breadcrumb from '@/app/components/Breadcrumb';

export const metadata: Metadata = {
  title: "Editor's Picks | CurioSpark",
  description: 'Read CurioSpark articles selected by the editorial team for clarity, usefulness, and source quality.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Editor's Picks | CurioSpark",
    description: 'Read CurioSpark articles selected for clarity, usefulness, and source quality.',
  },
};

export default function TrendingPage() {
  const posts = Array.from(new Map(getAllPosts().map((post) => [post.slug, post])).values());
  
  // Editorial picks first, then recent articles. Avoid fabricated popularity metrics.
  const trendingPosts = [...posts].sort((a, b) => {
    const featuredScore = Number(Boolean(b.isFeatured || b.isTrending)) - Number(Boolean(a.isFeatured || a.isTrending));
    if (featuredScore !== 0) return featuredScore;
    return new Date(b.lastUpdated || b.date).getTime() - new Date(a.lastUpdated || a.date).getTime();
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Trending', href: '/trending' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="section-wrap py-12">
        <div className="mb-12">
          <p className="section-kicker">Editorial selection</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            Editor's picks
          </h1>
          <p className="mt-4 text-xl leading-8 text-slate-600 max-w-3xl">
            Reader-friendly articles selected by the CurioSpark editorial team for clarity, usefulness, and source quality.
          </p>
        </div>

        <div className="space-y-6">
          {trendingPosts.map((post, index) => (
            <article
              key={post.id}
              className="article-card"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md flex items-center justify-center text-lg font-black bg-slate-950 text-white">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="quiet-pill">
                          {post.category}
                        </span>
                        <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                        <span className="text-sm text-slate-500">
                          {post.date}
                        </span>
                        <span className="text-sm font-bold text-teal-700 flex items-center gap-1">
                          {post.readingTime}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-950 mb-3 hover:text-teal-800 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-600 leading-7 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
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
