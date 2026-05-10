import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug, getRelatedPosts, getTrendingPosts, type Category, type FAQ, type Post, type Source } from "@/lib/posts";
import { generateInlineLinkSuggestions, insertInternalLinks } from "@/lib/internalLinks";
import PostBadge from "@/app/components/PostBadge";
import TableOfContents from "@/app/components/TableOfContents";
import MarkdownContent from "@/app/components/MarkdownContent";
import ReadingProgress from "@/app/components/ReadingProgress";
import StickyShareButtons from "@/app/components/StickyShareButtons";
import DidYouKnowBox from "@/app/components/DidYouKnowBox";
import SurprisingFact from "@/app/components/SurprisingFact";
import ShareableQuote from "@/app/components/ShareableQuote";
import SharePrompt from "@/app/components/SharePrompt";
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
  const resolvedImageAlt = resolvedPost?.imageAlt || imageAlt || resolvedTitle || "";
  const resolvedHeroImage = resolvedPost?.image || resolvedPost?.heroImage || image || "/articles/default.jpg";
  const resolvedContentMarkdown = resolvedPost?.content || contentMarkdown;
  const resolvedContentNode = resolvedContentMarkdown ? undefined : contentNode;
  const resolvedDidYouKnow = resolvedPost?.didYouKnow || didYouKnow;
  const resolvedSurprisingFact = resolvedPost?.surprisingFact || surprisingFact;
  const resolvedShareableQuote = resolvedPost?.shareableQuote || shareableQuote;
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
        .slice(0, 5)
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

  const readNextItems: RelatedItem[] = resolvedPost
    ? getTrendingPosts(8)
        .filter((item) => item.slug !== resolvedPost.slug)
        .slice(0, 3)
        .map((item) => {
          const itemCategory = getCategoryBySlug(item.category);
          return {
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt,
            image: item.image,
            imageAlt: item.imageAlt,
            readingTime: item.readingTime,
            categoryLabel: itemCategory?.name,
            isTrending: item.isTrending,
            isFeatured: item.isFeatured,
          };
        })
    : [];
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
    <div className="editorial-shell min-h-screen">
      {resolvedPost && (
        <StructuredData post={resolvedPost} category={structuredCategory} />
      )}
      <ReadingProgress />

      <article className="section-wrap pt-10 pb-24">
        <div className="max-w-4xl mx-auto">
          {resolvedBreadcrumb}

          <div className="mt-6 md:mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
            <div className="mb-8 md:mb-10">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
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
                      className="quiet-pill hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                    >
                      <span className="inline-flex items-center gap-2">
                        {displayCategory.image ? (
                          <Image
                            src={displayCategory.image}
                            alt={displayCategory.imageAlt || displayCategory.name}
                            width={18}
                            height={18}
                            className="rounded-md object-cover"
                          />
                        ) : displayCategory.icon ? (
                          <span>{displayCategory.icon}</span>
                        ) : (
                          <span className="w-4 h-4 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 flex items-center justify-center">
                            {displayCategory.name.slice(0, 1)}
                          </span>
                        )}
                        <span>{displayCategory.name}</span>
                      </span>
                    </Link>
                  ) : (
                    <span className="quiet-pill">
                      <span className="inline-flex items-center gap-2">
                        {displayCategory.image ? (
                          <Image
                            src={displayCategory.image}
                            alt={displayCategory.imageAlt || displayCategory.name}
                            width={18}
                            height={18}
                            className="rounded-md object-cover"
                          />
                        ) : displayCategory.icon ? (
                          <span>{displayCategory.icon}</span>
                        ) : (
                          <span className="w-4 h-4 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 flex items-center justify-center">
                            {displayCategory.name.slice(0, 1)}
                          </span>
                        )}
                        <span>{displayCategory.name}</span>
                      </span>
                    </span>
                  )
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-950 leading-tight mb-6">
                {resolvedTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-slate-500">
                {displayCategory && (
                  displayCategory.href || displayCategory.slug ? (
                    <Link
                      href={displayCategory.href || `/category/${displayCategory.slug}`}
                      className="font-bold text-slate-900 hover:underline"
                    >
                      {displayCategory.name}
                    </Link>
                  ) : (
                    <span className="font-bold text-slate-900">
                      {displayCategory.name}
                    </span>
                  )
                )}
                <span className="text-slate-300">|</span>
                <span>{resolvedDateLabel}</span>
              </div>

              <p className="text-lg md:text-xl text-slate-600 leading-8 mb-8">
                {resolvedExcerpt}
              </p>

              <div className="pt-1">
                <StickyShareButtons title={resolvedTitle} slug={resolvedSlug} basePath={resolvedSharePath} />
              </div>
            </header>

            <div className="h-px bg-slate-200 my-6"></div>

            {!isAdFree && <AdSlot position="top" className="my-6" />}

            {resolvedContentMarkdown && (
              <aside className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5 md:p-6">
                <TableOfContents content={resolvedContentMarkdown} />
              </aside>
            )}

            {resolvedDidYouKnow && <DidYouKnowBox fact={resolvedDidYouKnow} />}

            <section className="prose prose-lg max-w-3xl mx-auto leading-relaxed text-lg text-slate-700 prose-p:my-6 prose-p:text-slate-700 prose-li:my-2 prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:text-slate-950 prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-950 prose-a:text-teal-800 prose-a:font-bold prose-p:first-of-type:text-xl prose-p:first-of-type:first-letter:text-6xl md:prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-bold prose-p:first-of-type:first-letter:leading-none prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:text-slate-950">
              {resolvedContentWithLinks ? <MarkdownContent content={resolvedContentWithLinks} /> : resolvedContentNode}
            </section>

            {resolvedSurprisingFact && <SurprisingFact fact={resolvedSurprisingFact} />}
            {resolvedShareableQuote && <ShareableQuote quote={resolvedShareableQuote} />}
            {!isAdFree && <AdSlot position="mid-content" className="my-8" />}

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
            <h2 className="section-title mb-8">
              {relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resolvedRelatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.slug}
                  href={relatedItem.href || `/post/${relatedItem.slug}`}
                  className="article-card"
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
                        <span className="quiet-pill">
                          {relatedItem.categoryLabel}
                        </span>
                      )}
                      {relatedItem.readingTime && (
                        <span className="text-slate-500 text-sm">
                          {relatedItem.readingTime}
                        </span>
                      )}
                      <PostBadge isTrending={relatedItem.isTrending} isFeatured={relatedItem.isFeatured} />
                    </div>
                    <h3 className="text-base font-bold text-slate-950 mb-2 leading-tight line-clamp-2">
                      {relatedItem.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedItem.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {readNextItems.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="section-title mb-8">
              Read Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {readNextItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/post/${item.slug}`}
                  className="article-card"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-slate-950 mb-2 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </article>

      <BackToTopButton />
    </div>
  );
}
