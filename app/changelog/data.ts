export interface ChangelogItem {
  version: string;
  date: string;
  changes: ChangelogChange[];
}

export interface ChangelogChange {
  type: "feature" | "improvement" | "bugfix" | "note";
  title: string;
  description: string;
  image?: string;
  gif?: string;
}

export const changelogData: ChangelogItem[] = [
  {
    version: "0.0.21-beta",
    date: "November 27, 2025",
    changes: [
      {
        type: "improvement",
        title: "UI Improvements",
        description:
          "Enhanced user interface with improved visual design and user experience.",
      },
      {
        type: "feature",
        title: "Stats Card",
        description:
          "Created a separate stats card component for better data visualization and organization.",
      },
      {
        type: "feature",
        title: "Shareable Cards",
        description: "Added the ability to create and share cards with others.",
      },
      {
        type: "improvement",
        title: "Performance Improvements",
        description:
          "Optimized application performance for faster load times and smoother interactions.",
      },
      {
        type: "feature",
        title: "Free and Pro User Distinction",
        description:
          "Implemented clear differentiation between free and pro user features and access levels.",
      },
      {
        type: "feature",
        title: "Code Adding Feature",
        description:
          "Added the ability to add referral code so that the pro trial can be extended.",
      },
    ],
  },
  {
    version: "0.0.20-beta",
    date: "November 22, 2025",
    changes: [
      {
        type: "improvement",
        title: "Native Binary Improvements",
        description:
          "Enhanced native binary for better performance and stability across all platforms.",
      },
      {
        type: "improvement",
        title: "Testing Improvements",
        description:
          "Improved overall testing coverage and quality assurance processes.",
      },
      {
        type: "improvement",
        title: "Performance Optimization",
        description:
          "Implemented performance enhancements throughout the application.",
      },
    ],
  },
  {
    version: "0.0.19-beta",
    date: "November 20, 2025",
    changes: [
      {
        type: "feature",
        title: "Authentication System",
        description:
          "Added comprehensive authentication system for secure user access and management.",
      },
      {
        type: "feature",
        title: "Window Icon",
        description:
          "Added application window icon for better visual identification and branding.",
      },
      {
        type: "feature",
        title: "macOS Code Certificate",
        description:
          "Added code certificate for macOS to ensure secure installation and trusted application status.",
      },
      {
        type: "improvement",
        title: "Permission Handling",
        description:
          "Improved permission handling system for better security and user control.",
      },
      {
        type: "improvement",
        title: "Code Cleanup",
        description:
          "Cleaned and optimized codebase for better maintainability and performance.",
      },
    ],
  },
  {
    version: "0.0.18-beta",
    date: "November 13, 2025",
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
