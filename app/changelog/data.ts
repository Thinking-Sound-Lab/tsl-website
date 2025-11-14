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
