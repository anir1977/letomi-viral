/**
 * Home Hero Section - AdSense Optimized
 * Replaces image slider with professional content
 */

import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Discover Fascinating Facts That Challenge What You Know
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Welcome to CurioSpark, where science meets curiosity. Explore mind-bending psychological insights, surprising scientific discoveries, and fascinating facts about human behavior that will change how you see the world.
          </p>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Each article is thoroughly researched and backed by scientific evidence. From psychology to technology, health to business, we bring you knowledge that matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link 
              href="/trending" 
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
            >
              Read Popular Articles ✨
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Our Mission
            </Link>
          </div>
        </div>

        {/* Content Highlights - Professional breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">140+</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Articles Published</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thoroughly researched, science-backed content covering psychology, science, technology, health, and more.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">Quality</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Expert Content</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              2,000+ word articles with comprehensive research, FAQs, and actionable insights for every topic.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Daily</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">New Articles</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fresh content published every day across multiple categories to keep your curiosity alive.
            </p>
          </div>
        </div>

        {/* Why Choose CurioSpark - Text-based value proposition */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose CurioSpark?
          </h2>
          
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 font-bold mr-4 text-lg">✓</span>
              <span>
                <strong>Science-Backed Research:</strong> Every article is grounded in peer-reviewed studies and expert insights.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 font-bold mr-4 text-lg">✓</span>
              <span>
                <strong>Comprehensive Coverage:</strong> From psychology to technology, we cover topics that matter to modern readers.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 font-bold mr-4 text-lg">✓</span>
              <span>
                <strong>In-Depth Analysis:</strong> In-depth articles (2000+ words) with FAQs, real-world examples, and expert perspectives.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 font-bold mr-4 text-lg">✓</span>
              <span>
                <strong>Regular Updates:</strong> New articles published daily, ensuring fresh content and continuous learning opportunities.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 font-bold mr-4 text-lg">✓</span>
              <span>
                <strong>Trusted Source:</strong> Clear authorship, proper attribution, and transparent editorial standards.
              </span>
            </li>
          </ul>
        </div>

        {/* Browse by Category */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Explore by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: "Psychology", slug: "psychology" },
              { name: "Science", slug: "science" },
              { name: "Technology", slug: "technology" },
              { name: "Health", slug: "health" },
              { name: "Business", slug: "business" },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="block text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
