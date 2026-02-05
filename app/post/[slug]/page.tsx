import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getCategoryBySlug, getAllPosts } from "@/lib/posts";
import Breadcrumb from "@/app/components/Breadcrumb";
import AuthorBox from "@/app/components/AuthorBox";
import FAQSection from "@/app/components/FAQSection";
import PostBadge from "@/app/components/PostBadge";
import TableOfContents from "@/app/components/TableOfContents";
import MarkdownContent from "@/app/components/MarkdownContent";
import StructuredData from "@/app/components/StructuredData";
import ReadingProgress from "@/app/components/ReadingProgress";
import StickyShareButtons from "@/app/components/StickyShareButtons";
import InlineNewsletter from "@/app/components/InlineNewsletter";
import DidYouKnowBox from "@/app/components/DidYouKnowBox";
import SurprisingFact from "@/app/components/SurprisingFact";
import ShareableQuote from "@/app/components/ShareableQuote";
import ArticlePoll from "@/app/components/ArticlePoll";
import SharePrompt from "@/app/components/SharePrompt";
import ArticleReactions from "@/app/components/ArticleReactions";
import SourcesSection from "@/app/components/SourcesSection";
import AdSlot from "@/app/components/AdSlot";
import InternalLinks from "@/app/components/InternalLinks";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found - CurioSpark",
    };
  }

  // Create viral, curiosity-driven meta title with emotional hook
  const viralTitle = post.title.includes('?') 
    ? `${post.title} | CurioSpark`
    : `${post.title} 🤯 | CurioSpark`;

  // Enhanced description with call-to-action and curiosity gap
  const viralDescription = post.didYouKnow 
    ? `${post.didYouKnow} ${post.excerpt} Click to discover the full fascinating truth!`
    : `${post.excerpt} You won't believe what science has discovered!`;

  return {
    title: viralTitle,
    description: viralDescription.slice(0, 160), // SEO best practice: keep under 160 chars
    openGraph: {
      title: viralTitle,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: viralTitle,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  const relatedPosts = getRelatedPosts(params.slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* JSON-LD Structured Data */}
      <StructuredData post={post} category={category} />
      
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      {/* Sticky Share Buttons */}
      <StickyShareButtons title={post.title} slug={post.slug} />
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">⚡</span>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">CurioSpark</h1>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200">Home</Link>
            <Link href="/trending" className="text-white/90 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
              <span className="text-lg">🔥</span> Trending
            </Link>
            <Link href="/articles" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">Articles</Link>
            <Link href="/categories" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">Categories</Link>
            <Link href="/about" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">About</Link>
          </div>
        </nav>
      </header>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          {category && (
            <Breadcrumb
              items={[
                { label: category.name, href: `/category/${category.slug}` },
                { label: post.title, href: `/post/${post.slug}` }
              ]}
            />
          )}

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold px-4 py-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
                >
                  {category.icon} {category.name}
                </Link>
              )}
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {post.readingTime} read
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                👁️ {post.views} views
              </span>
              <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-2 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <span>📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Ad Slot - Top of Article */}
          <AdSlot position="top" className="my-6" />

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Did You Know Box */}
          {post.didYouKnow && (
            <DidYouKnowBox fact={post.didYouKnow} />
          )}

          {/* Article Content - Rendered from Markdown */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownContent content={post.content} />
          </div>

          {/* Most Surprising Fact */}
          {post.surprisingFact && (
            <SurprisingFact fact={post.surprisingFact} />
          )}

          {/* Shareable Quote */}
          {post.shareableQuote && (
            <ShareableQuote quote={post.shareableQuote} />
          )}

          {/* Poll Component */}
          {post.pollQuestion && (
            <ArticlePoll question={post.pollQuestion} articleSlug={post.slug} />
          )}

          {/* Ad Slot - Mid Content */}
          <AdSlot position="mid-content" className="my-8" />

          {/* Inline Newsletter CTA */}
          <InlineNewsletter />

          {/* Article Reactions */}
          <ArticleReactions articleSlug={post.slug} />

          {/* Sources & Fact-Checked Badge */}
          {post.sources && post.sources.length > 0 && (
            <SourcesSection sources={post.sources} lastUpdated={post.lastUpdated || post.date} />
          )}

          {/* Internal Links - Related Facts */}
          <InternalLinks currentSlug={post.slug} category={post.category} />

          {/* Ad Slot - End of Article */}
          <AdSlot position="end" className="my-8" />

          {/* Share Prompt */}
          <SharePrompt 
            question="Did this blow your mind? Share it with someone who needs to know!" 
            title={post.title}
            slug={post.slug}
          />

          {/* Author Box */}
          <AuthorBox />

          {/* FAQ Section */}
          <FAQSection faqs={post.faqs} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/post/${relatedPost.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                        {category?.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {relatedPost.readingTime}
                      </span>
                      <PostBadge isTrending={relatedPost.isTrending} isFeatured={relatedPost.isFeatured} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Enjoyed this fact?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get more amazing facts delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </article>

      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">⚡</span>
              <span className="font-bold text-white text-lg">CurioSpark</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
              <Link href="/trending" className="hover:text-yellow-300 transition-colors">Trending</Link>
              <Link href="/categories" className="hover:text-yellow-300 transition-colors">Categories</Link>
              <Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link>
              <Link href="/privacy-policy" className="hover:text-yellow-300 transition-colors">Privacy</Link>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 hover:bg-yellow-300 hover:text-gray-900 p-2 rounded-lg transition-all duration-200 transform hover:scale-110" aria-label="Facebook">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="bg-white/10 hover:bg-yellow-300 hover:text-gray-900 p-2 rounded-lg transition-all duration-200 transform hover:scale-110" aria-label="Twitter">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="bg-white/10 hover:bg-yellow-300 hover:text-gray-900 p-2 rounded-lg transition-all duration-200 transform hover:scale-110" aria-label="Instagram">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 mt-6 text-center">
            <p className="text-sm text-gray-300">
              &copy; 2026 <span className="font-bold text-white">CurioSpark</span>. All rights reserved. | Made with 💜 for the curious minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
