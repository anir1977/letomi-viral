import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Process - CurioSpark",
  description: "Learn about CurioSpark's rigorous editorial process and commitment to quality content.",
};

export default function EditorialProcessPage() {
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
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            📋 Our Editorial Process
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Transparency and quality are at the heart of everything we do at CurioSpark.
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>🎯 Our Mission</h2>
              <p>
                At CurioSpark, we're committed to delivering accurate, engaging, and trustworthy content 
                that sparks curiosity and expands knowledge. Every article undergoes a rigorous editorial 
                process to ensure the highest quality standards.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>📝 Content Creation Workflow</h2>
              
              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Topic Research & Selection</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We identify trending topics and evergreen subjects that our audience finds fascinating. 
                      Each topic is evaluated for accuracy potential, engagement value, and educational merit.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Deep Research</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our writers conduct extensive research using credible sources including:
                    </p>
                    <ul className="mt-2 text-gray-600 dark:text-gray-400">
                      <li>Peer-reviewed scientific journals</li>
                      <li>Academic institutions and universities</li>
                      <li>Government health and science agencies</li>
                      <li>Reputable news organizations</li>
                      <li>Expert interviews and primary sources</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Content Writing</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Writers craft engaging, accessible content that:
                    </p>
                    <ul className="mt-2 text-gray-600 dark:text-gray-400">
                      <li>Uses clear, simple language</li>
                      <li>Includes proper citations and references</li>
                      <li>Maintains objectivity and balance</li>
                      <li>Avoids sensationalism or misleading claims</li>
                      <li>Provides context and practical relevance</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fact-Checking</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      A separate fact-checker reviews every claim, statistic, and reference to ensure accuracy. 
                      See our <Link href="/about/fact-checking" className="text-purple-600 hover:underline">Fact-Checking Policy</Link> for details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Editorial Review</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Senior editors review the content for:
                    </p>
                    <ul className="mt-2 text-gray-600 dark:text-gray-400">
                      <li>Overall quality and coherence</li>
                      <li>Tone and accessibility</li>
                      <li>SEO optimization without compromising quality</li>
                      <li>Compliance with editorial guidelines</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-lg">
                    6
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Publication & Updates</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Once approved, content is published. We regularly review and update articles to 
                      reflect new research and discoveries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>✅ Quality Standards</h2>
              <p>Every article must meet these criteria:</p>
              <ul>
                <li><strong>Accuracy:</strong> All facts verified with credible sources</li>
                <li><strong>Clarity:</strong> Written in accessible, jargon-free language</li>
                <li><strong>Objectivity:</strong> Balanced perspective without bias</li>
                <li><strong>Engagement:</strong> Interesting and valuable to readers</li>
                <li><strong>Citations:</strong> Proper attribution of sources</li>
                <li><strong>Originality:</strong> Unique perspective and fresh insights</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2>🔄 Continuous Improvement</h2>
              <p>
                We constantly refine our process based on:
              </p>
              <ul>
                <li>Reader feedback and questions</li>
                <li>New research and discoveries</li>
                <li>Industry best practices</li>
                <li>Team retrospectives and learning</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/author/editorial-team"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Meet Our Editorial Team →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 CurioSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
