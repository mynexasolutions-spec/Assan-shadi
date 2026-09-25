import type { Metadata } from "next";
import Link from "next/link";
import { Home, FileText, ListChecks, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/submit-biodata", label: "Submit Biodata", icon: FileText },
  { href: "/how-it-works", label: "How It Works", icon: ListChecks },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#252525] px-4 py-24 text-center text-[#FAF7F2]">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b9965b] font-sans-modern">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-bold font-serif-luxury tracking-tight sm:text-5xl">
        This page could not be found
      </h1>
      <p className="mt-4 max-w-md text-sm text-stone-300 font-sans-modern leading-relaxed">
        The page you are looking for may have moved or no longer exists. Continue
        browsing from one of the links below.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-sans-modern">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex items-center gap-2 rounded-[5px] border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-colors hover:border-[#b9965b]/50 hover:bg-white/10 hover:text-[#FFD78A]"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
