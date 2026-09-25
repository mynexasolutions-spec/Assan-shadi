import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HOW_IT_WORKS_FAQS } from "@/data/faqs";
import { HowItWorksPageHeader } from "@/components/how-it-works/HowItWorksPageHeader";
import { HowItWorksStepsSection } from "@/components/how-it-works/HowItWorksStepsSection";
import { HowItWorksEthicsSection } from "@/components/how-it-works/HowItWorksEthicsSection";
import { HowItWorksFaqSection } from "@/components/how-it-works/HowItWorksFaqSection";
import { HowItWorksCtaSection } from "@/components/how-it-works/HowItWorksCtaSection";

export const metadata: Metadata = buildMetadata({
  title: "How It Works – Guardian-Verified Matchmaking Process",
  description:
    "See how Asaan Shaadi's guardian-verified process works: free profile creation, phone verification, compatible matches and respectful Nikah introductions.",
  path: "/how-it-works",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOW_IT_WORKS_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. 80px Page Header Banner */}
      <HowItWorksPageHeader />

      {/* 2. 4-Step Nikah Roadmap */}
      <HowItWorksStepsSection />

      {/* 3. Core Ethics & Trust Charter */}
      <HowItWorksEthicsSection />

      {/* 4. Frequently Asked Questions */}
      <HowItWorksFaqSection />

      {/* 5. Strong Final Call-To-Action */}
      <HowItWorksCtaSection />
    </div>
  );
}
