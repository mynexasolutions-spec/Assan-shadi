import React from "react";
import { buildMetadata } from "@/lib/seo";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { BlogListSection } from "@/components/blog/BlogListSection";
import { BlogCtaSection } from "@/components/blog/BlogCtaSection";

export const metadata = buildMetadata({
  title: "Nikah & Happy Marriage Guidance Blog",
  description:
    "Practical Sunnah-based guidance on Nikah, pre-marital compatibility, family relationships and budget-friendly weddings for a blessed Islamic marriage.",
  path: "/blog",
});

export const revalidate = 3600;

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2] w-full max-w-full overflow-x-hidden">
      {/* 1. Page Header Banner */}
      <BlogPageHeader />

      {/* 2. Insights for a Happy Marriage — Category Tabs, Live Search, Responsive Grid */}
      <BlogListSection />

      {/* 3. Call To Action — Find Blessed Match / Submit Biodata */}
      <BlogCtaSection />
    </div>
  );
}
