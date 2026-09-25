import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us – BTM Layout, Bengaluru Office",
  description:
    "Contact Asaan Shaadi's head office in BTM Layout, Bengaluru. Call, WhatsApp or email our matrimonial advisors, Monday to Sunday, 10 AM to 10 PM IST.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
