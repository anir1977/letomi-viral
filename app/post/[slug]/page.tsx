import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getCategoryBySlug, getAllPosts } from "@/lib/posts";
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
    };
  }

  const viralTitle = post.title.includes("?")
    ? `${post.title} | CurioSpark`
    : `${post.title} 🤯 | CurioSpark`;

  const viralDescription = post.didYouKnow
    ? `${post.didYouKnow} ${post.excerpt} Click to discover the full fascinating truth!`
    : `${post.excerpt} You won't believe what science has discovered!`;

  return {
    title: viralTitle,
    description: viralDescription.slice(0, 160),
    openGraph: {
      title: viralTitle,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: viralTitle,
      description: post.excerpt,
      images: [post.image],
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