import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { articleContent } from "@/lib/articles";

interface TocItem {
  id: string;
  text: string;
}

const articles = articleContent;

const defaultArticleMeta = {
  image: "/images/article-hero.svg",
  imageAlt: "CurioSpark article illustration",
  readingTime: "6 min",
  dateLabel: "Feb 6, 2026",
  category: {
    name: "CurioSpark",
    href: "/articles",
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];

  if (!article) {
    return {
      title: "Article Not Found - CurioSpark",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} - CurioSpark`,
    description: article.description,
    openGraph: {
      title: `${article.title} - CurioSpark`,
      description: article.description,
      images: [defaultArticleMeta.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} - CurioSpark`,
      description: article.description,
      images: [defaultArticleMeta.image],
    },
  };
}

function addDropCap(content: ReactNode) {
  let applied = false;

  const visit = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) {
      return node;
    }

    if (node.type === "p" && !applied) {
      applied = true;
      const className = typeof node.props.className === "string"
        ? `${node.props.className} drop-cap`
        : "drop-cap";

      return cloneElement(node, { className });
    }

    if (node.props?.children) {
      return cloneElement(node, {
        children: Children.map(node.props.children, visit),
      });
    }

    return node;
  };

  return Children.map(content, visit);
}

function getWordCount(content: ReactNode): number {
  let count = 0;

  const visit = (node: ReactNode) => {
    if (typeof node === "string") {
      const words = node.trim().split(/\s+/).filter(Boolean);
      count += words.length;
      return;
    }

    if (!isValidElement(node)) {
      return;
    }

    if (node.props?.children) {
      Children.forEach(node.props.children, visit);
    }
  };

  Children.forEach(content, visit);
  return count;
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (!isValidElement(node)) {
    return "";
  }

  if (!node.props?.children) {
    return "";
  }

  return Children.toArray(node.props.children).map(extractText).join("");
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildContentWithToc(content: ReactNode): { content: ReactNode; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  const visit = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) {
      return node;
    }

    const children = node.props?.children;

    if (node.type === "h2") {
      const text = extractText(children).trim();
      const baseId = slugifyHeading(text) || "section";
      const count = slugCounts.get(baseId) ?? 0;
      const id = count > 0 ? `${baseId}-${count + 1}` : baseId;
      slugCounts.set(baseId, count + 1);

      if (text) {
        toc.push({ id, text });
      }

      const nextChildren = children ? Children.map(children, visit) : children;
      return cloneElement(node, { id }, nextChildren);
    }

    if (children) {
      return cloneElement(node, {
        children: Children.map(children, visit),
      });
    }

    return node;
  };

  return {
    content: Children.map(content, visit),
    toc,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  const heroImage = (article as { image?: string }).image || "/articles/default.jpg";
  const heroImageAlt = (article as { imageAlt?: string }).imageAlt || article.title;

  const { content: contentWithAnchors, toc } = buildContentWithToc(article.content);
  const contentWithDropCap = addDropCap(contentWithAnchors);
  const wordCount = getWordCount(article.content);
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <article className="container mx-auto px-4 pt-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-8">
            <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              {defaultArticleMeta.category.href ? (
                <Link
                  href={defaultArticleMeta.category.href}
                  className="font-semibold text-gray-900 dark:text-gray-200 hover:underline"
                >
                  {defaultArticleMeta.category.name}
                </Link>
              ) : (
                <span className="font-semibold text-gray-900 dark:text-gray-200">
                  {defaultArticleMeta.category.name}
                </span>
              )}
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span>{defaultArticleMeta.dateLabel}</span>
              <span className="text-gray-500 dark:text-gray-400">• {readingTimeMinutes} min read</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 mt-4">
              {article.description}
            </p>

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-8"></div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
              <div className="min-w-0 max-w-3xl">
                <div className="prose prose-lg leading-relaxed text-lg text-gray-700 dark:text-gray-300 space-y-6 prose-p:my-6 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold prose-p:first-of-type:text-xl">
                  {contentWithDropCap}
                </div>
              </div>

              {toc.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-32">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                      On this page
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="hover:text-gray-900 dark:hover:text-gray-200 transition"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
