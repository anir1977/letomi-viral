import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategory, categories } from "@/lib/posts";
import { SITE_URL, toAbsoluteUrl } from "@/lib/site";
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryUrl = `${SITE_URL}/category/${category.slug}`;
  const ogImage = toAbsoluteUrl("/og-default.svg");
  const isTechnology = category.slug === "technology";
  const title = isTechnology
    ? "Technology Facts & AI Insights - CurioSpark"
    : `${category.name} Articles - CurioSpark`;
  const description = isTechnology
    ? "Explore practical technology and AI explainers written with clear context and source-aware editorial standards."
    : `Explore CurioSpark articles about ${category.name.toLowerCase()}. ${category.description}`;
  const keywords = isTechnology
    ? ["technology", "AI", "artificial intelligence", "tech trends", "innovation", "future tech"]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      url: categoryUrl,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  const posts = Array.from(
    new Map(getPostsByCategory(params.slug).map((post) => [post.slug, post])).values()
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="editorial-shell min-h-screen">
      <main className="section-wrap py-16">
        <div className="max-w-4xl mb-12">
          <div className="flex items-center mb-6">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.imageAlt || category.name}
                width={96}
                height={96}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-white flex items-center justify-center text-3xl font-bold text-slate-700">
                {category.name.slice(0, 1)}
              </div>
            )}
          </div>
          <p className="section-kicker mb-3">Category</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 mb-6">
            {category.name}
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-slate-600">
            {category.description}. Explore {posts.length} carefully selected articles below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="article-card"
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
                  <span className="quiet-pill">
                    {category.name}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {post.readingTime}
                  </span>
                  <PostBadge isTrending={post.isTrending} isFeatured={post.isFeatured} />
                </div>
                <h2 className="text-lg font-bold text-slate-950 mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm leading-6 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{post.readingTime}</span>
                  <span className="font-bold text-teal-700">
                    Read
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
