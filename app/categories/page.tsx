import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Categories - CurioSpark",
  description: "Browse all categories of fascinating facts: Psychology, Science, Human Behavior, and Life Facts.",
};

export default function CategoriesPage() {
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
            <Link href="/categories" className="text-gray-900 dark:text-white font-semibold">Categories</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Explore All Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
            Dive into fascinating topics and discover mind-blowing facts across different areas of knowledge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`${category.color} rounded-2xl p-8 transition transform hover:scale-105`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {category.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {category.description}
                </p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold">
                  Explore {category.name} →
                </div>
              </Link>
            ))}
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
