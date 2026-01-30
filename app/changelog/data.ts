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
    version: "0.1.28-beta",
    date: "January 30, 2026",
    summaryTitle: "Canvas upgrades & Drive refinement",
    summaryBody:
      "This release delivers major upgrades to the Canvas core, a completely refined Drive interface, and a performance-optimized workspace loading engine.",
    changes: [
      {
        type: "feature",
        title: "Smart Nodes",
        description:
          "Overhauled AIChatNode and MultimediaNode to deliver significantly smoother interactivity and optimized performance.",
      },
      {
        type: "feature",
        title: "Workspace Loading",
        description:
          "Engineered a seamless workspace loading state, eliminating visual stutter during context switches.",
      },
      {
        type: "improvement",
        title: "Auth Experience",
        description:
          "Redesigned the authentication flow for a cleaner, more intuitive user onboarding experience.",
      },
      {
        type: "improvement",
        title: "Drive Interface",
        description:
          "Revamped the Drive interface with improved file management controls and instant visual feedback.",
      },
      {
        type: "improvement",
        title: "Unified Sidebar",
        description:
          "Unified the sidebar architecture to ensure consistent navigation across the entire application platform.",
      },
    ],
  },
  {
    version: "0.0.27-beta",
    date: "January 18, 2026",
    summaryTitle: "Reliability improvements",
    summaryBody:
      "This release addresses stability issues with the sign-out process, ensuring smoother session management.",
    changes: [
      {
        type: "bugfix",
        title: "Sign out process",
        description:
          "Fixed issues where the sign-out process would not clear the session correctly.",
      },
    ],
  },
  {
    version: "0.0.26-beta",
    date: "January 11, 2026",
    summaryTitle: "UI/UX enhancements and Canvas fixes",
    summaryBody:
      "We've refreshed the UI with Hugeicons, improved the upload experience, and resolved critical issues in the Canvas view.",
    changes: [
      {
        type: "improvement",
        title: "Hugeicons Migration",
        description:
          "Migrated the entire icon set to Hugeicons for a cleaner, more consistent visual experience.",
      },
      {
        type: "bugfix",
        title: "Link Extraction",
        description:
          "Resolved issues where links were not being correctly extracted from certain documents.",
      },
      {
        type: "improvement",
        title: "Upload UI",
        description:
          "Improved the upload interface to provide better feedback and a smoother file handling experience.",
      },
      {
        type: "bugfix",
        title: "Canvas Edges",
        description:
          "Fixed an issue where connecting edges between nodes on the Canvas were not visible.",
      },
      {
        type: "bugfix",
        title: "Canvas Node Connections",
        description:
          "Resolved problems that prevented nodes from properly connecting in the Canvas view.",
      },
    ],
  },
  {
    version: "0.0.25-beta",
    date: "January 4, 2026",
    summaryTitle: "Enhanced Document Processing",
    summaryBody:
      "This update focuses on our data ingestion pipeline, improving document extraction reliability and adding support for more file types.",
    changes: [
      {
        type: "bugfix",
        title: "Document Extraction",
        description:
          "Fixed bugs related to text extraction from complex document formats.",
      },
      {
        type: "feature",
        title: "Expanded Document Support",
        description:
          "Added support for processing a wider range of document formats.",
      },
    ],
  },
  {
    version: "0.0.24-beta",
    date: "December 27, 2025",
    summaryTitle: "Security Enhancements",
    summaryBody:
      "We've strengthened our security posture on Windows with improved code signing compliance.",
    changes: [
      {
        type: "feature",
        title: "Windows Code Signing",
        description:
          "Implemented Azure Key Vault code signing to ensure full compliance with Windows SmartScreen.",
      },
    ],
  },
  {
    version: "0.0.23-beta",
    date: "December 20, 2025",
    summaryTitle: "Conversation History & Stability",
    summaryBody:
      "This release adds access to conversation history and improves the reliability of authentication and onboarding.",
    changes: [
      {
        type: "feature",
        title: "Ask Conversation History",
        description:
          "You can now view and search through your past 'Ask' conversation history.",
      },
      {
        type: "bugfix",
        title: "Token Refresh",
        description:
          "Fixed an issue where authentication tokens would sometimes fail to refresh, causing session disconnects.",
      },
      {
        type: "improvement",
        title: "Onboarding Guidelines",
        description:
          "Refined the onboarding flow with comprehensive guidelines to help new users get started.",
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