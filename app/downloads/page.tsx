import type { Metadata } from "next";
import DownloadsContent from "./downloads-content";

export const metadata: Metadata = {
  title: "Downloads",
};

export default function DownloadsPage() {
  return <DownloadsContent />;
}
