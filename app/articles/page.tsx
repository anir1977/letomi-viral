import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { articles } from "./[slug]/page";

export const metadata: Metadata = {
  title: "Articles - CurioSpark",
  description:
    "Explore CurioSpark articles on psychology, science, human behavior, and curious life discoveries.",
};

type ArticleCard = {
  slug: string;
  title: string;
  description: string;
};

const getArticleSlugs = (): string[] => {
  const filePath = path.join(process.cwd(), "app", "articles", "articleIndex.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as string[];
};

export default function ArticlesIndexPage() {
  const slugs = getArticleSlugs();
  const items = slugs
    .map((slug) => {
      const article = articles[slug];

      if (!article) {
        return null;
      }

      return {
        slug,
        title: article.title,
        description: article.description,
      } satisfies ArticleCard;
    })
    .filter((article): article is ArticleCard => Boolean(article));

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((article) => (
              <article
                key={article.slug}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {article.description}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
