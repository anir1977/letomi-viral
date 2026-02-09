import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - CurioSpark",
  description: "Learn about CurioSpark, your daily source of fascinating facts, scientific discoveries, and curiosity-driven knowledge.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Editorial Approach
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Curiosity comes first. At CurioSpark, we focus on ideas that spark genuine curiosity - questions that make people pause, think, and want to learn more about the world around them.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Clear, thoughtful storytelling
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Each article is written to be easy to follow, engaging, and grounded in reliable information. We aim to explain complex topics in a way that feels natural and accessible, without oversimplifying or exaggerating the facts.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Responsible research
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Topics are selected based on scientific interest, psychological insight, and real-world relevance. When research or studies are discussed, we rely on publicly available and credible sources to ensure accuracy and context.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Independent and reader-focused
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              CurioSpark is an independent editorial project. Our content is created to inform and inspire curiosity - not to promote products, push opinions, or chase clicks.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Who writes and reviews
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our editorial team is made up of researchers and writers who translate complex topics into clear, practical stories. We prioritize accuracy, context, and readability over hype. Every piece is shaped for clarity, with a focus on what the reader should understand and remember.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Sources and verification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use credible, publicly available sources such as peer reviewed studies, academic journals, and reputable institutions. When a claim is based on evidence, we reference the source list on the article page so readers can verify details themselves.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Editorial standards
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Each article goes through an editorial pass for structure, accuracy, and tone. If we find an error or new information changes the context, we update the article to keep it current and reliable.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Learn more about our process
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Want the details? Explore our editorial workflow and fact checking policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about/editorial-process"
                  className="rounded-full bg-purple-600 px-5 py-2 text-white font-semibold hover:bg-purple-700 transition"
                >
                  Editorial Process
                </Link>
                <Link
                  href="/about/fact-checking"
                  className="rounded-full border border-purple-200/80 dark:border-purple-500/40 px-5 py-2 text-purple-700 dark:text-purple-200 font-semibold hover:border-purple-400 hover:text-purple-600 dark:hover:text-white transition"
                >
                  Fact-Checking Policy
                </Link>
              </div>
            </div>

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

    </div>
  );
}
