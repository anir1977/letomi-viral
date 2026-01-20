import Link from "next/link";
import Image from "next/image";
import { categories, getTrendingPosts, getFeaturedPosts, getShortReads, getRecentPosts, getPostsWithSurprisingFacts } from "@/lib/posts";
import PostBadge from "@/app/components/PostBadge";
import SurprisinglyTrueSection from "@/app/components/SurprisinglyTrueSection";
import SearchBar from "@/app/components/SearchBar";
import SiteStats from "@/app/components/SiteStats";

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
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">⚡</span>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">CurioSpark</h1>
          </Link>
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200">Home</Link>
            <Link href="/trending" className="text-white/90 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
              <span className="text-lg">🔥</span> Trending
            </Link>
            <Link href="/latest" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">Latest</Link>
            <Link href="/categories" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">Categories</Link>
            <Link href="/about" className="text-white/90 hover:text-yellow-300 transition-colors duration-200">About</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section with Animated Background */}
        <section className="relative overflow-hidden">
          {/* Animated Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-blue-900/30 to-black/60 z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
              alt="Abstract space and stars background"
              fill
              className="object-cover opacity-60 animate-slow-zoom"
              priority
              quality={90}
            />
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
          <div className="container mx-auto px-4 py-32 text-center relative z-30">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up drop-shadow-2xl">
              Short Facts. <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
                Big Curiosity.
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Discover fascinating facts that will change how you see the world. 
              One curiosity at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/trending" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                Explore Now ✨
              </Link>
              <Link href="/about" className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg">
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
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`${category.color} rounded-2xl p-6 transition transform hover:scale-105`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Facts Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Now
            </h2>
            <Link href="/trending" className="text-purple-600 hover:text-purple-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {post.readingTime}
                    </span>
                    <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
          <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ⭐ Editor's Picks
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl transition transform hover:scale-105"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                        {categories.find(c => c.slug === post.category)?.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
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
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ⏱️ Quick Reads
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Perfect for your coffee break</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortReads.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold px-2 py-1 rounded">
                        {post.readingTime}
                      </span>
                      <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {categories.find(c => c.slug === post.category)?.icon} {categories.find(c => c.slug === post.category)?.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              🆕 Latest Discoveries
            </h2>
            <Link href="/latest" className="text-purple-600 hover:text-purple-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition flex"
              >
                <div className="relative w-40 h-full flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {categories.find(c => c.slug === post.category)?.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
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
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Never Stop Learning
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get daily curiosities delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">⚡</span>
                <span className="font-bold text-white text-lg">CurioSpark</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your daily source of fascinating facts and mind-blowing knowledge. Feed your curiosity, one spark at a time.
              </p>
              <div className="mt-4">
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                  ⭐ Premium Content
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Discover</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/trending" className="hover:text-yellow-300 transition-colors duration-200">🔥 Trending Facts</Link></li>
                <li><Link href="/latest" className="hover:text-yellow-300 transition-colors duration-200">🆕 Latest Facts</Link></li>
                <li><Link href="/facts" className="hover:text-yellow-300 transition-colors duration-200">📚 All Facts</Link></li>
                <li><Link href="/about/editorial-process" className="hover:text-yellow-300 transition-colors duration-200">✅ Editorial Process</Link></li>
                <li><Link href="/about/fact-checking" className="hover:text-yellow-300 transition-colors duration-200">🔍 Fact-Checking</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal & Social</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-yellow-300 transition-colors duration-200">About Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-yellow-300 transition-colors duration-200">Terms of Service</Link></li>
              </ul>
              <h3 className="font-bold text-white mt-6 mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-blue-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-sky-500 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Twitter">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-red-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="YouTube">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 mt-8">
            <p className="text-center text-sm text-gray-300">
              &copy; 2026 <span className="font-bold text-white">CurioSpark</span>. All rights reserved. | Made with 💜 for the curious minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
