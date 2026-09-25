import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { dbService } from "@/lib/supabase";
import { BLOG_POSTS } from "@/data/blogData";

export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/submit-biodata", priority: 0.9 },
  { path: "/blog", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes intentionally omit lastModified (avoids a new date on every build).
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      priority,
    })
  );

  let posts: { slug: string; lastModified?: string }[] = [];
  try {
    const blogs = await dbService.getBlogs();
    posts = blogs
      .filter((b) => (b.status ? b.status === "published" : true))
      .map((b) => ({ slug: b.slug, lastModified: b.created_at }));
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = BLOG_POSTS.map((p) => ({ slug: p.slug }));
  }

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((p) => Boolean(p.slug))
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      ...(p.lastModified ? { lastModified: new Date(p.lastModified) } : {}),
    }));

  return [...staticEntries, ...postEntries];
}
