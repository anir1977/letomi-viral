import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import articles from "./articleIndex.json";

export const metadata: Metadata = {
  title: "Articles - CurioSpark",
  description:
    "Explore CurioSpark articles on psychology, science, human behavior, and curious life discoveries.",
};

type ArticleCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
};

export default function ArticlesIndexPage() {
  const items = articles as ArticleCard[];

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
            <Link href="/articles" className="text-gray-900 dark:text-white font-semibold">Articles</Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">Categories</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              CurioSpark Articles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Browse fresh insights on psychology, science, human behavior, and life discoveries.
            </p>
          </div>

          <div className="space-y-8">
            {items.map((article) => (
              <article
                key={article.slug}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-6 md:gap-8 p-6">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <div className="relative w-full aspect-[16/9] md:aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                      )}
                    </div>
                  </Link>

                  <div className="flex flex-col justify-center">
                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full mb-3 w-fit">
                      {article.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      <Link href={`/articles/${article.slug}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-5">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
