import type { Metadata } from "next";
import DownloadContent from "./download-content";

export const metadata: Metadata = {
	title: "Download - Invook",
	description: "Download Invook for Mac and Windows",
};

export default function DownloadPage() {
	return <DownloadContent />;
}
