import type { Metadata } from "next";
import StudioPage from "./studio-page";

export const metadata: Metadata = {
  title: "Studio | Invook",
  description: "Create AI-generated images and videos with Invook Studio",
};

export default function Studio() {
  return <StudioPage />;
}
