import type { Metadata } from "next";
import ResearchFeed from "./research-feed";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  return <ResearchFeed />;
}
