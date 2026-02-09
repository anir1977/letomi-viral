import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategory, categories } from "@/lib/posts";
import PostBadge from "@/app/components/PostBadge";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: "Category Not Found - CurioSpark",
    };
  }

  return {
    title: `${category.name} Facts - CurioSpark`,
    description: `Discover fascinating ${category.name.toLowerCase()} facts. ${category.description}`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  const posts = getPostsByCategory(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-6">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.imageAlt || category.name}
                width={96}
                height={96}
                className="rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center text-3xl font-semibold text-gray-700">
                {category.name.slice(0, 1)}
              </div>
            )}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
            {category.description}. Explore our collection of {posts.length} fascinating articles below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {category.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.readingTime}
                  </span>
                  <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>👁️ {post.views} views</span>
                  <span className="text-purple-600 hover:text-purple-700 font-semibold">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
