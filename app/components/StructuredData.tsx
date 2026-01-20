import { Post, Category } from "@/lib/posts";

interface StructuredDataProps {
  post: Post;
  category?: Category;
  isHomePage?: boolean;
}

export default function StructuredData({ post, category, isHomePage }: StructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CurioSpark",
    url: "https://curiospark.com",
    logo: "https://curiospark.com/logo.png",
    description: "Discover fascinating, verified facts that challenge conventional wisdom. Science-backed insights on psychology, nature, history, and human behavior.",
    sameAs: [
      "https://twitter.com/curiospark",
      "https://facebook.com/curiospark"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Editorial",
      email: "editorial@curiospark.com"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CurioSpark",
    url: "https://curiospark.com",
    description: "Fascinating facts and surprising truths backed by science",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://curiospark.com/facts?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CurioSpark Editorial Team",
      url: "https://curiospark.com/author/editorial-team"
    },
    publisher: {
      "@type": "Organization",
      name: "CurioSpark",
      logo: {
        "@type": "ImageObject",
        url: "https://curiospark.com/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://curiospark.com/post/${post.slug}`
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
        item: "https://curiospark.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `https://curiospark.com/category/${category.slug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://curiospark.com/post/${post.slug}`
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
