/**
 * robots.txt - SEO Configuration
 */

import { SITE_URL } from "@/lib/site";

export async function GET() {
  const baseUrl = SITE_URL;

  const robotsTxt = `# CurioSpark Robots.txt
# Allow all crawlers
User-agent: *
Allow: /

Disallow: /api/

# Crawl delay (optional)
Crawl-delay: 0

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Specific bot rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: Slurp
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
