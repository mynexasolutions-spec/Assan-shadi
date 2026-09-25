import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SubmitBiodataClient from "./SubmitBiodataClient";

export const metadata: Metadata = buildMetadata({
  title: "Submit Your Muslim Marriage Biodata",
  description:
    "Submit your Muslim marriage biodata to Asaan Shaadi. Share your details privately with our Bengaluru team and get matched with verified families.",
  path: "/submit-biodata",
});

export default function SubmitBiodataPage() {
  return <SubmitBiodataClient />;
}
