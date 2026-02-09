import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Team - CurioSpark",
  description: "Meet the passionate team behind CurioSpark's fascinating facts and discoveries.",
};

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl">
                  ⚡
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  CurioSpark Editorial Team
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  Bringing you fascinating facts and mind-blowing discoveries since 2026
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Fact-Checked Content</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>About Our Team</h2>
              <p>
                The CurioSpark Editorial Team is composed of passionate researchers, writers, and fact-checkers 
                dedicated to bringing you the most fascinating and accurate information from around the world.
              </p>

              <h2>Our Expertise</h2>
              <p>
                Our team has extensive backgrounds in:
              </p>
              <ul>
                <li><strong>Psychology & Human Behavior</strong> - Understanding what makes us tick</li>
                <li><strong>Science & Technology</strong> - Breaking down complex discoveries</li>
                <li><strong>Research & Fact-Checking</strong> - Ensuring accuracy and credibility</li>
                <li><strong>Content Creation</strong> - Making learning engaging and fun</li>
              </ul>

              <h2>Our Mission</h2>
              <p>
                We believe that learning should be exciting, accessible, and accurate. Every article we publish 
                goes through a rigorous process:
              </p>
              <ol>
                <li><strong>Research</strong> - Deep dive into credible sources</li>
                <li><strong>Writing</strong> - Crafting engaging, easy-to-understand content</li>
                <li><strong>Fact-Checking</strong> - Verifying every claim with reliable sources</li>
                <li><strong>Review</strong> - Multiple team members review before publishing</li>
              </ol>

              <h2>Editorial Standards</h2>
              <p>
                We maintain the highest standards of accuracy and integrity. Our content is:
              </p>
              <ul>
                <li>✅ Researched from credible, peer-reviewed sources</li>
                <li>✅ Fact-checked by multiple team members</li>
                <li>✅ Written in clear, accessible language</li>
                <li>✅ Updated regularly to reflect new discoveries</li>
                <li>✅ Free from sensationalism or misleading claims</li>
              </ul>

              <h2>Connect With Us</h2>
              <p>
                Have a question or topic suggestion? We'd love to hear from you! 
                Join our community of curious minds and never stop learning.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/about/editorial-process"
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-6 py-3 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
                >
                  📋 Editorial Process
                </Link>
                <Link 
                  href="/about/fact-checking"
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                >
                  ✓ Fact-Checking Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
