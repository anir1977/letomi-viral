import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getCategoryBySlug, getAllPosts } from "@/lib/posts";
import { SITE_URL, toAbsoluteUrl } from "@/lib/site";
import ArticleLayout from "@/app/components/ArticleLayout";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - CurioSpark",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isTechnology = post.category === "technology";
  const brandSuffix = isTechnology ? "CurioSpark Technology" : "CurioSpark";
  const viralTitle = post.title.includes("?")
    ? `${post.title} | ${brandSuffix}`
    : `${post.title} 🤯 | ${brandSuffix}`;

  const baseDescription = post.didYouKnow
    ? `${post.didYouKnow} ${post.excerpt} Click to discover the full fascinating truth!`
    : `${post.excerpt} You won't believe what science has discovered!`;
  const viralDescription = isTechnology
    ? `Technology insight: ${baseDescription}`
    : baseDescription;
  const postUrl = `${SITE_URL}/post/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.lastUpdated || post.date).toISOString();
  const ogImage = toAbsoluteUrl(post.image || "/og-default.svg");
  const keywords = isTechnology
    ? ["technology", "AI", "innovation", "future tech", "tech trends", post.title]
    : undefined;

  return {
    title: viralTitle,
    description: viralDescription.slice(0, 160),
    keywords,
    alternates: {
      canonical: postUrl,
    },
    authors: [
      {
        name: "CurioSpark Editorial Team",
        url: `${siteUrl}/author/editorial-team`,
      },
    ],
    openGraph: {
      title: viralTitle,
      description: post.excerpt,
      url: postUrl,
      images: [ogImage],
      type: "article",
      publishedTime,
      modifiedTime,
      authors: ["CurioSpark Editorial Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: viralTitle,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.category);

  return (
    <ArticleLayout
      post={post}
      category={category}
      basePath="/post"
    />
  );
}