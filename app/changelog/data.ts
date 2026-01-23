export interface ChangelogChange {
  type: "feature" | "improvement" | "bugfix" | "note";
  title: string;
  description: string;
  image?: string;
  gif?: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  summaryTitle: string;
  summaryBody: string;
  changes: ChangelogChange[];
}

export const changelogData: ChangelogItem[] = [
	 {
    version: "0.0.23-beta",
    date: "December 20, 2025",
    summaryTitle: "Onboarding clarity and reliability improvements",
    summaryBody:
      "This release focuses on making setup smoother and more predictable. We improved permission guidance, onboarding feedback, and system reliability to reduce friction for new users.",
    changes: [
      {
        type: "feature",
        title: "Video Permission Guides",
        description:
          "Added interactive video tutorials in permissions setup showing users exactly how to grant microphone and accessibility permissions.",
      },
      {
        type: "feature",
        title: "Weekly Statistics Emails",
        description:
          "Automated weekly emails showing total words dictated, WPM, time saved, and week-over-week comparisons.",
      },
      {
        type: "improvement",
        title: "Setup permission flow",
        description: "Improved permission request flow during initial setup with clearer explanations of why permissions are needed and what they enable.",
      },
      {
        type: "bugfix",
        title: "Installer reliability",
        description: "Fixed intermittent failures during the installation process that could cause incomplete setup on some systems.",
        gif: "/changelog/0-0-22/installer-fix.gif",
      },
      {
        type: "improvement",
        title: "Onboarding feedback",
        description: "Added progress indicators and success confirmations during onboarding to make the process more predictable.",
      },
    ],
  },
  {
    version: "0.0.22-beta",
    date: "December 7, 2025",
    summaryTitle: "Onboarding clarity and reliability improvements",
    summaryBody:
      "This release focuses on making setup smoother and more predictable. We improved permission guidance, onboarding feedback, and system reliability to reduce friction for new users.",
    changes: [
      {
        type: "feature",
        title: "Video Permission Guides",
        description:
          "Added interactive video tutorials in permissions setup showing users exactly how to grant microphone and accessibility permissions.",
      },
      {
        type: "feature",
        title: "Weekly Statistics Emails",
        description:
          "Automated weekly emails showing total words dictated, WPM, time saved, and week-over-week comparisons.",
      },
      {
        type: "improvement",
        title: "Setup permission flow",
        description: "Improved permission request flow during initial setup with clearer explanations of why permissions are needed and what they enable.",
      },
      {
        type: "bugfix",
        title: "Installer reliability",
        description: "Fixed intermittent failures during the installation process that could cause incomplete setup on some systems.",
        gif: "/changelog/0-0-22/installer-fix.gif",
      },
      {
        type: "improvement",
        title: "Onboarding feedback",
        description: "Added progress indicators and success confirmations during onboarding to make the process more predictable.",
      },
    ],
  },
  {
    version: "0.0.21-beta",
    date: "November 30, 2025",
    summaryTitle: "Performance optimizations and stability improvements",
    summaryBody:
      "This release delivers significant performance improvements across all core features. We optimized the indexing engine and enhanced the stability of background processes.",
    changes: [
      {
        type: "feature",
        title: "Stats Card",
        description: "Added a statistics card showing usage metrics and productivity insights.",
      },
      {
        type: "feature",
        title: "Shareable Cards",
        description: "New feature allowing users to create and share interactive cards with their content.",
      },
      {
        type: "feature",
        title: "Free and Pro User Distinction",
        description: "Implemented clear distinction between free and pro user features and capabilities.",
      },
      {
        type: "feature",
        title: "Code Adding Feature",
        description: "Added functionality to easily insert and manage code snippets in your documents.",
      },
      {
        type: "improvement",
        title: "Indexing speed",
        description: "Reduced indexing time by up to 40% through algorithmic improvements and more efficient file scanning.",
        gif: "/changelog/0-0-21/indexing-speed.gif",
      },
      {
        type: "bugfix",
        title: "Memory management",
        description: "Fixed memory leaks that could accumulate during extended sessions with large document collections.",
      },
    ],
  },
  {
    version: "0.0.20-beta",
    date: "November 23, 2025",
    summaryTitle: "New search capabilities and interface refinements",
    summaryBody:
      "This release introduces semantic search for more intuitive results. We also refined the interface based on user feedback to improve workflow efficiency.",
    changes: [
      {
        type: "improvement",
        title: "Search interface",
        description: "Redesigned search results page with better grouping, filtering, and preview capabilities.",
      },
      {
        type: "improvement",
        title: "Query suggestions",
        description: "Added intelligent query suggestions that adapt to your search patterns and content library.",
      },
      {
        type: "improvement",
        title: "Search accuracy",
        description: "Improved accuracy for code search queries with better language-specific tokenization.",
      },
    ],
  },
  {
    version: "0.0.19-beta",
    date: "November 16, 2025",
    summaryTitle: "Enhanced content organization and linking",
    summaryBody:
      "This release focuses on better organization tools. We added new linking capabilities and improved the folder structure visualization.",
    changes: [
      {
        type: "feature",
        title: "Authentication System",
        description: "Implemented a comprehensive authentication system for secure access to user data.",
      },
      {
        type: "feature",
        title: "Window Icon",
        description: "Added a custom window icon for better visual identity and user experience.",
      },
      {
        type: "feature",
        title: "macOS Code Certificate",
        description: "Obtained and implemented proper macOS code certificate for security and trust.",
      },
      {
        type: "improvement",
        title: "Folder visualization",
        description: "Enhanced folder structure visualization with better icons and hierarchical representation.",
      },
      {
        type: "improvement",
        title: "Tag management",
        description: "New tag management interface with bulk operations and tag suggestions.",
      },
    ],
  },
  {
    version: "0.0.18-beta",
    date: "November 13, 2025",
    summaryTitle: "Critical bug fixes and window positioning improvements",
    summaryBody:
      "This release addresses critical authentication and installation timeout issues. We also improved the window positioning system for a better user experience.",
    changes: [
      {
        type: "bugfix",
        title: "Authentication",
        description:
          "Fixed authentication issues where users were unable to update settings.",
      },
      {
        type: "feature",
        title: "Ask Window position fixed",
        description:
          "Now Ask window will be fixed to wherever you place it, even after closing and opening the window.",
      },
      {
        type: "bugfix",
        title: "Timeout issue fixed",
        description:
          "Fixed timeout issue where users were unable to install the app due to timeout config error.",
      },
    ],
  },
];