import Link from "next/link";
import Image from "next/image";
import { categories, getTrendingPosts, getFeaturedPosts, getShortReads, getRecentPosts, getPostsWithSurprisingFacts } from "@/lib/posts";
import PostBadge from "@/app/components/PostBadge";
import SurprisinglyTrueSection from "@/app/components/SurprisinglyTrueSection";
import SiteStats from "@/app/components/SiteStats";
import HeroImageRotator from "@/app/components/HeroImageRotator";

export default function Home() {
  const trendingPosts = getTrendingPosts(6);
  const featuredPosts = getFeaturedPosts(3);
  const shortReads = getShortReads(6);
  const recentPosts = getRecentPosts(4);
  const surprisingFactsPosts = getPostsWithSurprisingFacts(3);
  
  const surprisingFacts = surprisingFactsPosts.map(post => ({
    title: post.title,
    fact: post.surprisingFact || post.excerpt,
    slug: post.slug
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main>
        {/* Hero Section with Animated Background */}
        <section className="relative overflow-hidden">
          {/* Animated Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-blue-900/30 to-black/60 z-10"></div>
            <HeroImageRotator />
            {/* Floating Particles Effect */}
            <div className="absolute inset-0 z-20 overflow-hidden">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 py-20 md:py-32 text-left sm:text-center relative z-30">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in-up drop-shadow-2xl leading-tight">
              Short Facts. <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
                Big Curiosity.
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-none sm:max-w-2xl sm:mx-auto mb-6 md:mb-8 animate-fade-in-up animation-delay-200 drop-shadow-lg px-0 sm:px-4">
              Discover fascinating facts that will change how you see the world. 
              One curiosity at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start sm:justify-center animate-fade-in-up animation-delay-400 px-0 sm:px-4">
              <Link href="/trending" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 text-sm md:text-base">
                Explore Now ✨
              </Link>
              <Link href="/about" className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg text-sm md:text-base">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Site Stats */}
        <section className="container mx-auto px-4 py-8">
          <SiteStats />
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`${category.color} rounded-xl md:rounded-2xl p-5 md:p-6 transition transform hover:scale-105`}
              >
                <div className="mb-2 md:mb-3">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center text-lg font-semibold text-gray-700">
                      {category.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                  {category.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Facts Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Now
            </h2>
            <Link href="/trending" className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trendingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="relative w-full h-44 md:h-48">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3 flex-wrap">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                      {post.readingTime}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    <span>👁️ {post.views} views</span>
                    <span className="text-purple-600 hover:text-purple-700 font-semibold">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Editor's Picks Section */}
        {featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 py-12 md:py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-2xl md:rounded-3xl">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                ⭐ Editor's Picks
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl transition transform hover:scale-105"
                >
                  <div className="relative w-full h-44 md:h-56">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-2.5 py-1 md:px-3 rounded-full">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {categories.find(c => c.slug === post.category)?.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 md:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-500 dark:text-gray-400">👁️ {post.views} views</span>
                      <span className="text-purple-600 font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Surprisingly True Facts Section */}
        {surprisingFacts.length > 0 && (
          <SurprisinglyTrueSection facts={surprisingFacts} />
        )}

        {/* Short Reads Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                ⏱️ Quick Reads
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Perfect for your coffee break</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {shortReads.map((post) => {
              const categoryInfo = categories.find((category) => category.slug === post.category);

              return (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                        <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold px-2 py-0.5 md:py-1 rounded">
                          {post.readingTime}
                        </span>
                        <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm flex items-center gap-2">
                        {categoryInfo?.image ? (
                          <Image
                            src={categoryInfo.image}
                            alt={categoryInfo.imageAlt || categoryInfo.name}
                            width={18}
                            height={18}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700 flex items-center justify-center">
                            {categoryInfo?.name?.slice(0, 1) || "?"}
                          </span>
                        )}
                        <span>{categoryInfo?.name}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="container mx-auto px-4 py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl md:rounded-3xl">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              🆕 Latest Discoveries
            </h2>
            <Link href="/latest" className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-36 md:w-40 h-48 sm:h-full flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 160px"
                  />
                </div>
                <div className="p-4 md:p-6 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 hidden sm:block">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/15 bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 p-8 md:p-12 text-center text-white shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Newsletter
              </span>
              <h2 className="mt-3 text-2xl md:text-4xl font-bold [text-shadow:0_3px_14px_rgba(0,0,0,0.4)]">
                Never Stop Learning
              </h2>
              <p className="mt-3 text-base md:text-xl text-white/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
                Get daily curiosities delivered to your inbox
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full bg-white/95 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-4 focus:ring-white/40"
                />
                <button className="rounded-full bg-slate-900/90 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-900">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
