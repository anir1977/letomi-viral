import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug, getRelatedPosts, type Category, type FAQ, type Post, type Source } from "@/lib/posts";
import { generateInlineLinkSuggestions, insertInternalLinks } from "@/lib/internalLinks";
import PostBadge from "@/app/components/PostBadge";
import TableOfContents from "@/app/components/TableOfContents";
import MarkdownContent from "@/app/components/MarkdownContent";
import ReadingProgress from "@/app/components/ReadingProgress";
import StickyShareButtons from "@/app/components/StickyShareButtons";
import InlineNewsletter from "@/app/components/InlineNewsletter";
import DidYouKnowBox from "@/app/components/DidYouKnowBox";
import SurprisingFact from "@/app/components/SurprisingFact";
import ShareableQuote from "@/app/components/ShareableQuote";
import ArticlePoll from "@/app/components/ArticlePoll";
import SharePrompt from "@/app/components/SharePrompt";
import ArticleReactions from "@/app/components/ArticleReactions";
import SourcesSection from "@/app/components/SourcesSection";
import AdSlot from "@/app/components/AdSlot";
import InternalLinks from "@/app/components/InternalLinks";
import AuthorBox from "@/app/components/AuthorBox";
import FAQSection from "@/app/components/FAQSection";
import BackToTopButton from "@/app/components/BackToTopButton";
import StructuredData from "@/app/components/StructuredData";
import Breadcrumb from "@/app/components/Breadcrumb";

interface RelatedItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href?: string;
  readingTime?: string;
  categoryLabel?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

interface ArticleLayoutProps {
  post?: Post;
  title?: string;
  excerpt?: string;
  slug?: string;
  dateLabel?: string;
  readingTime?: string;
  views?: string;
  category?: Category | {
    name: string;
    slug?: string;
    icon?: string;
    image?: string;
    imageAlt?: string;
    href?: string;
  };
  image?: string;
  imageAlt?: string;
  contentMarkdown?: string;
  contentNode?: ReactNode;
  breadcrumb?: ReactNode;
  didYouKnow?: string;
  surprisingFact?: string;
  shareableQuote?: string;
  pollQuestion?: string;
  sources?: Source[];
  lastUpdated?: string;
  faqs?: FAQ[];
  relatedItems?: RelatedItem[];
  relatedTitle?: string;
  internalLinksCategory?: string;
  sharePromptQuestion?: string;
  basePath?: string;
  sharePath?: string;
}

export default function ArticleLayout({
  post,
  basePath = "/post",
  title,
  excerpt,
  slug,
  dateLabel,
  readingTime,
  views,
  category,
  image,
  imageAlt,
  contentMarkdown,
  contentNode,
  breadcrumb,
  didYouKnow,
  surprisingFact,
  shareableQuote,
  pollQuestion,
  sources,
  lastUpdated,
  faqs,
  relatedItems,
  relatedTitle = "Related Articles",
  internalLinksCategory,
  sharePromptQuestion = "Did this blow your mind? Share it with someone who needs to know!",
  sharePath,
}: ArticleLayoutProps) {
  const resolvedPost = post;
  const resolvedDateLabel = resolvedPost
    ? new Date(resolvedPost.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : (dateLabel || "");
  const resolvedCategory = resolvedPost
    ? (category || getCategoryBySlug(resolvedPost.category) || undefined)
    : category;
  const displayCategory = resolvedCategory ? {
    name: resolvedCategory.name,
    slug: "slug" in resolvedCategory ? resolvedCategory.slug : undefined,
    icon: "icon" in resolvedCategory ? resolvedCategory.icon : undefined,
    image: "image" in resolvedCategory ? resolvedCategory.image : undefined,
    imageAlt: "imageAlt" in resolvedCategory ? resolvedCategory.imageAlt : undefined,
    href: "href" in resolvedCategory ? resolvedCategory.href : undefined,
  } : undefined;
  const structuredCategory = resolvedPost && resolvedCategory && "description" in resolvedCategory
    ? (resolvedCategory as Category)
    : undefined;
  const resolvedTitle = resolvedPost?.title || title || "";
  const resolvedExcerpt = resolvedPost?.excerpt || (resolvedPost as { description?: string } | undefined)?.description || excerpt || "";
  const resolvedSlug = resolvedPost?.slug || slug || "";
  const resolvedReadingTime = resolvedPost?.readingTime || readingTime;
  const resolvedViews = resolvedPost?.views || views;
  const resolvedImageAlt = resolvedPost?.imageAlt || imageAlt || resolvedTitle || "";
  const resolvedHeroImage = resolvedPost?.image || resolvedPost?.heroImage || image || "/articles/default.jpg";
  const resolvedContentMarkdown = resolvedPost?.content || contentMarkdown;
  const resolvedContentNode = resolvedContentMarkdown ? undefined : contentNode;
  const resolvedDidYouKnow = resolvedPost?.didYouKnow || didYouKnow;
  const resolvedSurprisingFact = resolvedPost?.surprisingFact || surprisingFact;
  const resolvedShareableQuote = resolvedPost?.shareableQuote || shareableQuote;
  const resolvedPollQuestion = resolvedPost?.pollQuestion || pollQuestion;
  const resolvedSources = resolvedPost?.sources || sources;
  const resolvedLastUpdated = resolvedPost?.lastUpdated || lastUpdated || resolvedPost?.date || resolvedDateLabel;
  const resolvedFaqs = resolvedPost?.faqs || faqs;
  const resolvedInternalLinksCategory = internalLinksCategory || resolvedPost?.category;
  const isAdFree = resolvedSlug === "the-psychology-of-navy-basketball-how-the-mind-shapes-perfor";
  const resolvedContentWithLinks = resolvedContentMarkdown && resolvedSlug && resolvedInternalLinksCategory
    ? insertInternalLinks(
        resolvedContentMarkdown,
        generateInlineLinkSuggestions(resolvedContentMarkdown, resolvedSlug, resolvedInternalLinksCategory)
      )
    : resolvedContentMarkdown;
  const resolvedSharePath = basePath || sharePath;
  const resolvedRelatedItems: RelatedItem[] | undefined = relatedItems || (resolvedPost
    ? getRelatedPosts(resolvedPost.slug)
        .slice(0, 3)
        .map((relatedPost): RelatedItem => {
          const relatedCategory = getCategoryBySlug(relatedPost.category);

          return {
            slug: relatedPost.slug,
            title: relatedPost.title,
            excerpt: relatedPost.excerpt,
            image: relatedPost.image,
            imageAlt: relatedPost.imageAlt,
            readingTime: relatedPost.readingTime,
            categoryLabel: relatedCategory?.name,
            isTrending: relatedPost.isTrending,
            isFeatured: relatedPost.isFeatured,
            href: undefined,
          };
        })
    : undefined);
  const resolvedBreadcrumb = breadcrumb || (
    resolvedPost && displayCategory?.slug ? (
      <Breadcrumb
        items={[
          { label: displayCategory.name, href: `/category/${displayCategory.slug}` },
          { label: resolvedTitle || "Article", href: `${resolvedSharePath}/${resolvedSlug}` },
        ]}
      />
    ) : null
  );

  if (!resolvedTitle || !resolvedSlug || !resolvedExcerpt) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {resolvedPost && (
        <StructuredData post={resolvedPost} category={structuredCategory} />
      )}
      <ReadingProgress />

      <article className="container mx-auto px-4 pt-12 pb-24">
        <div className="max-w-4xl mx-auto">
          {resolvedBreadcrumb}

          <div className="mt-6 md:mt-10 bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-gray-800 rounded-xl shadow-sm p-8">
            <div className="mb-8 md:mb-10">
              <div className="relative w-full aspect-video rounded-xl shadow-sm overflow-hidden">
                <Image
                  src={resolvedHeroImage}
                  alt={resolvedImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>

            <header className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {displayCategory && (
                  displayCategory.href || displayCategory.slug ? (
                    <Link
                      href={displayCategory.href || `/category/${displayCategory.slug}`}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold px-4 py-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
                    >
                      <span className="inline-flex items-center gap-2">
                        {displayCategory.image ? (
                          <Image
                            src={displayCategory.image}
                            alt={displayCategory.imageAlt || displayCategory.name}
                            width={18}
                            height={18}
                            className="rounded-full object-cover"
                          />
                        ) : displayCategory.icon ? (
                          <span>{displayCategory.icon}</span>
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-purple-200 text-[10px] font-semibold text-purple-700 flex items-center justify-center">
                            {displayCategory.name.slice(0, 1)}
                          </span>
                        )}
                        <span>{displayCategory.name}</span>
                      </span>
                    </Link>
                  ) : (
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold px-4 py-2 rounded-full">
                      <span className="inline-flex items-center gap-2">
                        {displayCategory.image ? (
                          <Image
                            src={displayCategory.image}
                            alt={displayCategory.imageAlt || displayCategory.name}
                            width={18}
                            height={18}
                            className="rounded-full object-cover"
                          />
                        ) : displayCategory.icon ? (
                          <span>{displayCategory.icon}</span>
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-purple-200 text-[10px] font-semibold text-purple-700 flex items-center justify-center">
                            {displayCategory.name.slice(0, 1)}
                          </span>
                        )}
                        <span>{displayCategory.name}</span>
                      </span>
                    </span>
                  )
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {resolvedTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                {displayCategory && (
                  displayCategory.href || displayCategory.slug ? (
                    <Link
                      href={displayCategory.href || `/category/${displayCategory.slug}`}
                      className="font-semibold text-gray-900 dark:text-gray-200 hover:underline"
                    >
                      {displayCategory.name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-gray-200">
                      {displayCategory.name}
                    </span>
                  )
                )}
                <span className="text-gray-400">|</span>
                <span>{resolvedDateLabel}</span>
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {resolvedExcerpt}
              </p>

              <div className="pt-1">
                <StickyShareButtons title={resolvedTitle} slug={resolvedSlug} basePath={resolvedSharePath} />
              </div>
            </header>

            <div className="h-px bg-gray-200/70 dark:bg-gray-800 my-6"></div>

            {!isAdFree && <AdSlot position="top" className="my-6" />}

            {resolvedContentMarkdown && (
              <aside className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200/70 dark:border-gray-800 rounded-xl p-4 sm:p-5 md:p-6">
                <TableOfContents content={resolvedContentMarkdown} />
              </aside>
            )}

            {resolvedDidYouKnow && <DidYouKnowBox fact={resolvedDidYouKnow} />}

            <section className="prose prose-lg max-w-3xl mx-auto leading-relaxed text-lg text-gray-700 dark:text-gray-300 prose-p:my-6 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:my-2 prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-p:first-of-type:text-xl prose-p:first-of-type:first-letter:text-6xl md:prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-bold prose-p:first-of-type:first-letter:leading-none prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:text-gray-900 dark:prose-p:first-of-type:first-letter:text-white">
              {resolvedContentWithLinks ? <MarkdownContent content={resolvedContentWithLinks} /> : resolvedContentNode}
            </section>

            {resolvedSurprisingFact && <SurprisingFact fact={resolvedSurprisingFact} />}
            {resolvedShareableQuote && <ShareableQuote quote={resolvedShareableQuote} />}
            {resolvedPollQuestion && <ArticlePoll question={resolvedPollQuestion} articleSlug={resolvedSlug} />}

            {!isAdFree && <AdSlot position="mid-content" className="my-8" />}

            <InlineNewsletter />
            <ArticleReactions articleSlug={resolvedSlug} />

            {resolvedSources && resolvedSources.length > 0 && (
              <SourcesSection sources={resolvedSources} lastUpdated={resolvedLastUpdated} />
            )}

            {resolvedInternalLinksCategory && (
              <InternalLinks currentSlug={resolvedSlug} />
            )}

            {!isAdFree && <AdSlot position="end" className="my-8" />}

            <SharePrompt question={sharePromptQuestion} title={resolvedTitle} slug={resolvedSlug} basePath={resolvedSharePath} />
            <AuthorBox />
            {resolvedFaqs && <FAQSection faqs={resolvedFaqs} />}
          </div>
        </div>

        {resolvedRelatedItems && resolvedRelatedItems.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resolvedRelatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.slug}
                  href={relatedItem.href || `/post/${relatedItem.slug}`}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {relatedItem.categoryLabel && (
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                          {relatedItem.categoryLabel}
                        </span>
                      )}
                      {relatedItem.readingTime && (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {relatedItem.readingTime}
                        </span>
                      )}
                      <PostBadge isTrending={relatedItem.isTrending} isFeatured={relatedItem.isFeatured} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
                      {relatedItem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {relatedItem.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Enjoyed this fact?</h3>
            <p className="text-lg mb-6 opacity-90">
              Get more amazing facts delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </article>

      <BackToTopButton />
    </div>
  );
}
