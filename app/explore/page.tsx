import type { Metadata } from "next";
import ExploreGallery from "./explore-gallery";

export const metadata: Metadata = {
    title: "Explore",
    description:
        "Discover stunning AI-generated images and videos created by the Invook community",
};

export default function ExplorePage() {
    return <ExploreGallery />;
}
