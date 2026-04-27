import Link from "next/link";
import Image from "next/image";
import { categories, getFeaturedPosts, getPostsWithDidYouKnow, getPostsWithSurprisingFacts, getRecentPosts, getShortReads, getTrendingPosts } from "@/lib/posts";
import PostBadge from "@/app/components/PostBadge";
import SurprisinglyTrueSection from "@/app/components/SurprisinglyTrueSection";
import SiteStats from "@/app/components/SiteStats";
import HomeHeroSection from "@/app/components/HomeHeroSection";
import HomeNewsletterCTA from "@/app/components/HomeNewsletterCTA";
import { BannerAd } from "@/app/components/AdSense";

export default function Home() {
  const trendingPosts = getTrendingPosts(6);
  const featuredPosts = getFeaturedPosts(3);
  const shortReads = getShortReads(6);
  const recentPosts = getRecentPosts(4);
  const surprisingFactsPosts = getPostsWithSurprisingFacts(3);
  const didYouKnowPosts = getPostsWithDidYouKnow(6);
  
  const surprisingFacts = surprisingFactsPosts.map(post => ({
    title: post.title,
    fact: post.surprisingFact || post.excerpt,
    slug: post.slug
  }));

  return (
    <div className="editorial-shell min-h-screen">
      <BannerAd />
      <main>
        <HomeHeroSection />

        <section className="section-wrap py-8">
          <SiteStats />
        </section>

        {didYouKnowPosts.length > 0 && (
          <section className="section-wrap py-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Quick context</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">Did you know</h2>
              </div>
              <Link href="/facts" className="text-link">
                See all
              </Link>
            </div>
            <div className="dyk-marquee">
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f7f5ef] to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f7f5ef] to-transparent pointer-events-none"></div>
              <div className="dyk-track pb-2">
                {[...didYouKnowPosts, ...didYouKnowPosts].map((post, index) => (
                  <Link
                    key={`${post.id}-${index}`}
                    href={`/post/${post.slug}`}
                    className="min-w-[280px] max-w-[340px] rounded-lg border border-slate-200 bg-white p-4 transition hover:border-teal-200"
                  >
                    <p className="section-kicker mb-2">
                      Did You Know
                    </p>
                    <p className="text-sm text-slate-600 leading-6 mb-3">
                      {post.didYouKnow}
                    </p>
                    <div className="text-xs font-bold text-slate-950">
                      {post.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-wrap py-14 md:py-20">
          <div className="mb-8">
            <p className="section-kicker">Browse by subject</p>
            <h2 className="section-title mt-2">Explore categories</h2>
            <p className="section-subtitle">A focused library of topics built for scanning, reading, and returning later.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="article-card h-full p-5 md:p-6"
              >
                <div className="mb-4">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      width={56}
                      height={56}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-md bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-700">
                      {category.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <span className="section-kicker mb-2">
                  Category
                </span>
                <h3 className="text-lg md:text-xl font-bold text-slate-950 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm md:text-base leading-6 text-slate-600 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-wrap py-14 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Editorial selection</p>
              <h2 className="section-title mt-2">Editor's picks</h2>
            </div>
            <Link href="/trending" className="text-link">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trendingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="article-card"
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
                    <span className="quiet-pill">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-slate-500 text-xs md:text-sm">
                      {post.readingTime}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-950 mb-2 md:mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs md:text-sm text-slate-500">
                    <span>{post.date}</span>
                    <span className="font-bold text-teal-700">
                      Read
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Editor's Picks Section */}
        {featuredPosts.length > 0 && (
          <section className="border-y border-slate-200 bg-white py-14 md:py-20">
            <div className="section-wrap">
            <div className="mb-8">
              <p className="section-kicker">Recommended reading</p>
              <h2 className="section-title mt-2">Featured articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="article-card group"
                >
                  <div className="relative w-full h-44 md:h-56">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-950 shadow-sm">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="quiet-pill">
                        {categories.find(c => c.slug === post.category)?.name}
                      </span>
                      <span className="text-slate-500 text-xs md:text-sm">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-950 mb-2 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-6 mb-3 md:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-slate-500">Updated {post.lastUpdated || post.date}</span>
                      <span className="font-bold text-teal-700">
                        Read more
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </div>
          </section>
        )}

        {/* Surprisingly True Facts Section */}
        {surprisingFacts.length > 0 && (
          <SurprisinglyTrueSection facts={surprisingFacts} />
        )}

        {/* Short Reads Section */}
        <section className="section-wrap py-14 md:py-20">
          <div className="mb-8">
            <p className="section-kicker">Short reads</p>
            <div>
              <h2 className="section-title mt-2">
                Quick reads
              </h2>
              <p className="section-subtitle">Compact articles for when you want a useful idea quickly.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {shortReads.map((post) => {
              const categoryInfo = categories.find((category) => category.slug === post.category);

              return (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="article-card p-4 md:p-5"
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
                        <span className="quiet-pill">
                          {post.readingTime}
                        </span>
                        <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-950 mb-1.5 md:mb-2 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm flex items-center gap-2">
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
        <section className="section-wrap py-14 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Recently updated</p>
              <h2 className="section-title mt-2">Latest discoveries</h2>
            </div>
            <Link href="/latest" className="text-link">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="article-card flex flex-col sm:flex-row"
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
                    <span className="quiet-pill">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-950 mb-2 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-6 mb-3 line-clamp-2 hidden sm:block">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500">
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-wrap py-14 md:py-20">
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-center text-white md:p-12">
            <HomeNewsletterCTA />
          </div>
        </section>
      </main>
    </div>
  );
}
