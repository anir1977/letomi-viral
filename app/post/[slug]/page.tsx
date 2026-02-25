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

  const summary = post.description || post.excerpt;
  const baseDescription = post.didYouKnow
    ? `${post.didYouKnow} ${summary} Click to discover the full fascinating truth!`
    : `${summary} You won't believe what science has discovered!`;
  const viralDescription = isTechnology
    ? `Technology insight: ${baseDescription}`
    : baseDescription;
  const postUrl = `${SITE_URL}/post/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.lastUpdated || post.date).toISOString();
  const ogImage = toAbsoluteUrl(post.image || "/og-default.svg");
  const keywords = post.keywords && post.keywords.length > 0
    ? post.keywords
    : isTechnology
      ? ["technology", "AI", "innovation", "future tech", "tech trends", post.title]
      : undefined;
  const authorName = post.author || "CurioSpark Editorial Team";

  return {
    title: viralTitle,
    description: viralDescription.slice(0, 160),
    keywords,
    alternates: {
      canonical: postUrl,
    },
    authors: [
      {
        name: authorName,
        url: `${SITE_URL}/author/editorial-team`,
      },
    ],
    openGraph: {
      title: viralTitle,
      description: summary,
      url: postUrl,
      images: [ogImage],
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: viralTitle,
      description: summary,
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