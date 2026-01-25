"use client";

import { InstallationSteps } from "./installation-steps";
import { useState, useEffect } from "react";

// Get download URLs from environment variables
const MAC_DOWNLOAD_URL = process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || "";
const WINDOWS_DOWNLOAD_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "";

export default function DownloadsContent() {
  const [os, setOs] = useState<"mac" | "windows" | "other">("other");

  useEffect(() => {
    // Detect user's operating system
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("mac") !== -1) {
      setOs("mac");
    } else if (userAgent.indexOf("win") !== -1) {
      setOs("windows");
    } else {
      setOs("other");
    }
  }, []);

  const handleDownload = () => {
    const downloadUrl = os === "mac" ? MAC_DOWNLOAD_URL : WINDOWS_DOWNLOAD_URL;

    if (!downloadUrl) {
      console.error("Download URL not configured");
      return;
    }

    // Trigger download
    window.location.href = downloadUrl;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Installation Steps - Only show for Mac or Windows */}
      {(os === "mac" || os === "windows") && (
        <div className="pt-0">
          <InstallationSteps platform={os} onDownload={handleDownload} />
        </div>
      )}
    </main>
  );
}
