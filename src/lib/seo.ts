import type { Metadata } from "next";
import { SITE_NAME } from "./site";

interface BuildMetadataOptions {
  /** Page title. Rendered through the root "%s | Asaan Shaadi" template. */
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. "/about". */
  path: string;
  /** Absolute or site-relative share image. Omit to use the generated OG image. */
  image?: string;
  /** When true, ignore the root title template and use `title` verbatim. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Build consistent per-page metadata: title, description, canonical,
 * Open Graph and Twitter cards. Default OG/Twitter images come from the
 * file-based `app/opengraph-image.tsx` / `app/twitter-image.tsx`.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataOptions): Metadata {
  // Fall back to the generated root images so every page has a share image.
  const ogImages = [{ url: image ?? "/opengraph-image" }];
  const twitterImages = [{ url: image ?? "/twitter-image" }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: ogImages,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
  };
}
