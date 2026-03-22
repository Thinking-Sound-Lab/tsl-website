import type { Metadata } from "next";
import ExploreGallery from "./explore-gallery";

export const metadata: Metadata = {
  title: "AI Prompts for Images & Videos | Invook",
  description: "Explore a library of AI-generated images and videos with their exact prompts. Reuse, remix, or create instantly using Invook Canvas.",
};

export default function ExplorePage() {
    return <ExploreGallery />;
}
