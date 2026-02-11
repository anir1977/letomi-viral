import { Post, Category } from "@/lib/posts";
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_NAME, SITE_URL, toAbsoluteUrl } from "@/lib/site";

interface StructuredDataProps {
  post: Post;
  category?: Category;
  basePath?: string;
  isHomePage?: boolean;
}

function buildPostUrl(basePath: string | undefined, slug: string) {
  const safeBasePath = basePath?.startsWith("/") ? basePath : "/post";
  return toAbsoluteUrl(`${safeBasePath}/${slug}`);
}

export default function StructuredData({ post, category, basePath, isHomePage }: StructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: toAbsoluteUrl(SITE_LOGO_PATH),
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Editorial",
      email: "info@curiospark.org"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  const absoluteImage = toAbsoluteUrl(post.image);
  const articleUrl = buildPostUrl(basePath, post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteImage],
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    author: {
      "@type": "Organization",
      name: "CurioSpark Editorial Team",
      url: `${SITE_URL}/author/editorial-team`
    },
    publisher: {
      "@type": "Organization",
      name: "CurioSpark",
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(SITE_LOGO_PATH)
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    wordCount: post.content.split(' ').length,
    articleBody: post.content.substring(0, 500)
  };

  const breadcrumbSchema = category ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${SITE_URL}/category/${category.slug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl
      }
    ]
  } : null;

  const faqSchema = post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return (
    <div>
      {/* Organization Schema - Always included */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        suppressHydrationWarning
      />
      {/* Website Schema - Always included */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        suppressHydrationWarning
      />
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        suppressHydrationWarning
      />
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          suppressHydrationWarning
        />
      )}
      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          suppressHydrationWarning
        />
      )}
    </div>
  );
}
