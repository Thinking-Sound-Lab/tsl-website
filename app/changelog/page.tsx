import type { Metadata } from "next";
import ChangelogFeed from "./changelog-feed";

export const metadata: Metadata = {
  title: "Changelog",
};

export default function ChangelogPage() {
  return <ChangelogFeed />;
}