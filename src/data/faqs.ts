export interface HomeFaq {
  id: string;
  category: "general" | "privacy" | "verification" | "pricing";
  question: string;
  answer: string;
  badge?: string;
}

export interface SimpleFaq {
  id: string;
  question: string;
  answer: string;
}

/** Rendered by src/components/home/FaqSection.tsx on the homepage. */
export const HOME_FAQS: HomeFaq[] = [
  {
    id: "faq-1",
    category: "general",
    question:
      "How is Asaan Shaadi different from conventional matchmaking apps?",
    answer:
      "Asaan Shaadi is built strictly upon Islamic values and family honor. We eliminate casual dating behavior, superficial swiping, and fake profiles. Every profile is manually reviewed, guardian (Wali) involvement is prioritized, and our entire process is designed with the sole intention of facilitating a blessed, honorable Nikah.",
    badge: "Dignified & Trusted",
  },
  {
    id: "faq-2",
    category: "privacy",
    question:
      "Can I keep photographs and personal contact numbers private?",
    answer:
      "Yes, absolutely. We offer 100% photo privacy controls, especially for sisters and private families. You can choose to keep your photo visible only to verified profiles with whom you have mutually agreed to connect. Furthermore, contact information is never made public — it is shared solely after mutual guardian consent.",
    badge: "100% Private",
  },
  {
    id: "faq-3",
    category: "verification",
    question: "How are candidate biodatas and profiles verified?",
    answer:
      "Our dedicated verification team manually inspects every submission. We verify candidate phone numbers via WhatsApp/SMS, confirm primary guardian details, and screen educational and professional credentials. Unverified or suspicious accounts are immediately rejected.",
    badge: "Manual Review",
  },
  {
    id: "faq-4",
    category: "pricing",
    question: "Do you charge expensive commissions after Nikah?",
    answer:
      "We believe in complete transparency and clarity. We charge a registration fee initially upon signup, and when the marriage is successfully fixed, a mutually agreed predetermined fixed amount is charged as discussed with the family. There are no hidden fees or exorbitant percentage-based broker commissions.",
    badge: "Transparent Pricing",
  },
  {
    id: "faq-5",
    category: "general",
    question: "Can families from all cities and states in India find a match?",
    answer:
      "Yes, absolutely! Asaan Shaadi serves Muslim families across all states and major cities in India—including Bengaluru, Hyderabad, Mumbai, Delhi NCR, Chennai, Pune, Kolkata, Lucknow, and more. We also assist Indian NRI families seeking compatible, practicing matches within India.",
    badge: "All India",
  },
  {
    id: "faq-6",
    category: "privacy",
    question: "Who should create the profile — the candidate or the guardian?",
    answer:
      "Either can register! Most profiles on Asaan Shaadi are managed collaboratively by parents, guardians (Wali), or the candidates themselves. We mandate a verified guardian phone number so that respectable families can connect with complete reassurance.",
    badge: "Family First",
  },
  {
    id: "faq-7",
    category: "general",
    question:
      "What is the difference between Self-Service and Personalized Matchmaking?",
    answer:
      "Self-Service lets you browse, filter, and express interest in verified biodatas yourself. Our Personalized Matchmaking VIP service assigns a dedicated senior Matchmaker who personally handpicks compatible matches, coordinates family introductions, and facilitates respectful meetings.",
    badge: "VIP Service",
  },
];

/** Rendered by src/components/how-it-works/HowItWorksFaqSection.tsx. */
export const HOW_IT_WORKS_FAQS: SimpleFaq[] = [
  {
    id: "verify",
    question: "How does Asaan Shaadi verify candidates and guardians?",
    answer:
      "Our moderation team manually verifies contact numbers and candidate credentials before marking any profile as verified. This ensures serious individuals and legitimate guardians on our platform.",
  },
  {
    id: "photo",
    question: "Can I keep my daughter's or my own photograph private?",
    answer:
      "Yes. You can toggle photo privacy during registration. Your photo will remain safely blurred and will only be revealed with your explicit consent to genuine, verified matches.",
  },
  {
    id: "fees",
    question: "What is your fee and payment structure?",
    answer:
      "We charge an initial registration fee, and upon successful marriage settlement (marriage fix time), a predetermined mutually agreed fixed amount is charged. Everything is discussed transparently upfront.",
  },
  {
    id: "supervisor",
    question: "What is the role of an assigned Marriage Supervisor?",
    answer:
      "An expert supervisor assists with background verification, liaises between prospective families, arranges introductory chats/video calls, and coordinates the first respectful meeting.",
  },
  {
    id: "pre-chat",
    question:
      "Can candidates talk or video call before the first physical meeting?",
    answer:
      "Yes. We support respectful introductory text and video interactions to help both candidates overcome anxiety and establish mutual compatibility before formal family meetings.",
  },
];
