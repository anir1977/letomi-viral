import { categories, posts } from "@/lib/posts";

const baseUrl = "https://curiospark.org";

export const revalidate = 3600;

function toUrlEntry(path: string, lastmod: string) {
  return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

export async function GET() {
  const lastmod = new Date().toISOString();

  const staticPaths = [
    "/",
    "/categories",
    "/latest",
    "/trending",
    "/about",
    "/facts",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const categoryPaths = categories.map((category) => `/category/${category.slug}`);
  const postPaths = posts.map((post) => `/post/${post.slug}`);
  const allPaths = [...staticPaths, ...categoryPaths, ...postPaths];
  const urls = allPaths.map((path) => toUrlEntry(path, lastmod)).join("\n");

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
