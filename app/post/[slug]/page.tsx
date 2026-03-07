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

  const summary = post.excerpt || post.description;
  const postUrl = `${SITE_URL}/post/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.lastUpdated || post.date).toISOString();
  const ogImage = toAbsoluteUrl(post.image || "/og-default.svg");
  const keywords = post.keywords && post.keywords.length > 0 ? post.keywords : undefined;
  const authorName = post.author || "CurioSpark Editorial Team";

  return {
    title: post.title,
    description: summary,
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
      title: post.title,
      description: summary,
      url: postUrl,
      siteName: "Curiospark",
      images: [ogImage],
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: summary,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
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