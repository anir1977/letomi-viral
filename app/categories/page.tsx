import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Categories - CurioSpark",
  description: "Browse all categories of fascinating facts: Psychology, Science, Human Behavior, and Life Facts.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
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
                <div className="mb-4">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      width={72}
                      height={72}
                      className="rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-[72px] h-[72px] rounded-full bg-white/80 flex items-center justify-center text-2xl font-semibold text-gray-700">
                      {category.name.slice(0, 1)}
                    </div>
                  )}
                </div>
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

    </div>
  );
}
