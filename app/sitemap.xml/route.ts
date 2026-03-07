import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

export const revalidate = 3600;

function toUrlEntry(path: string, lastmod: string) {
  return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

function toIsoDate(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

export async function GET() {
  const lastmod = new Date().toISOString();
  const posts = getAllPosts();
  const postUrls = posts.map((post) => {
    const updatedAt = toIsoDate(post.lastUpdated) || toIsoDate(post.date) || lastmod;
    return toUrlEntry(`/post/${post.slug}`, updatedAt);
  });
  const urls = postUrls.join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
