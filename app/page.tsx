import Link from "next/link";
import Image from "next/image";
import { categories, getFeaturedPosts, getRecentPosts, getTrendingPosts } from "@/lib/posts";
import PostBadge from "@/app/components/PostBadge";
import SiteStats from "@/app/components/SiteStats";
import HomeHeroSection from "@/app/components/HomeHeroSection";
import { BannerAd } from "@/app/components/AdSense";

export default function Home() {
  const trendingPosts = getTrendingPosts(6);
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getRecentPosts(4);

  return (
    <div className="editorial-shell min-h-screen">
      <BannerAd />
      <main>
        <HomeHeroSection />

        <section className="section-wrap py-8">
          <SiteStats />
        </section>

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

      </main>
    </div>
  );
}
