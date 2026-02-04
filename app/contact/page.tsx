import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - CurioSpark",
  description: "Get in touch with CurioSpark. Contact us for questions, feedback, or partnership inquiries.",
};

export default function ContactPage() {
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

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Contact Us
          </h1>

          <div className="space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We'd love to hear from you! Whether you have questions about our content, feedback to share, or partnership inquiries, please don't hesitate to reach out.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Email us at:</p>
              <a 
                href="mailto:contact@curiospark.org"
                className="text-2xl font-semibold text-purple-600 hover:text-purple-700 dark:hover:text-purple-400 transition"
              >
                contact@curiospark.org
              </a>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Response Time:</span> We typically respond to all inquiries within 24–48 hours.
              </p>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 pt-4">
              Thank you for your interest in CurioSpark. We're excited to connect with our community!
            </p>
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
                <li><Link href="/contact" className="hover:text-purple-600">Contact</Link></li>
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
