import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - CurioSpark",
  description: "Learn about CurioSpark, your daily source of fascinating facts, scientific discoveries, and curiosity-driven knowledge.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">CurioSpark</h1>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">Home</Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">Categories</Link>
            <Link href="/about" className="text-gray-900 dark:text-white font-semibold">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About CurioSpark
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We believe curiosity is the spark that ignites understanding. CurioSpark delivers fascinating facts that make you see the world differently.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              In a world overflowing with information, we curate the most intriguing, scientifically accurate, and genuinely fascinating facts. Our mission is to make learning addictive by delivering bite-sized knowledge that sparks curiosity and wonder.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              What We Cover
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              CurioSpark explores four main areas:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li><strong>Psychology:</strong> Discover how your mind works and why you think the way you do</li>
              <li><strong>Science:</strong> Explore breakthrough discoveries and natural phenomena</li>
              <li><strong>Human Behavior:</strong> Understand the surprising patterns in how we act</li>
              <li><strong>Life Facts:</strong> Learn amazing truths about everyday experiences</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Our Standards
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Every fact on CurioSpark is:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Backed by scientific research or credible sources</li>
              <li>Written in clear, accessible language</li>
              <li>Designed to educate, not mislead</li>
              <li>Verified for accuracy before publication</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Why CurioSpark?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're different from other fact sites because we prioritize quality over quantity. Each article is crafted to be genuinely interesting, not just clickbait. We respect your intelligence and your time.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Thousands of curious minds visit CurioSpark daily to feed their love of learning. Subscribe to our newsletter to get the most fascinating facts delivered straight to your inbox.
            </p>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white mt-12">
              <h3 className="text-2xl font-bold mb-3">
                Stay Curious
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get daily doses of wonder in your inbox
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
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">⚡</span>
                <span className="font-bold text-gray-900 dark:text-white">CurioSpark</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your daily source of fascinating facts and knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
                <li><Link href="/categories" className="hover:text-purple-600">Categories</Link></li>
                <li><Link href="/about" className="hover:text-purple-600">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-purple-600">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-purple-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 CurioSpark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
