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
    version: "2.5.0",
    date: "October 15, 2025",
    changes: [
      {
        type: "feature",
        title: "AI-Powered Smart Suggestions",
        description:
          "Introducing real-time contextual suggestions that understand your workflow. The AI analyzes your typing patterns and suggests completions that make sense in your current context.",
      },
      {
        type: "feature",
        title: "Multi-Language Support",
        description:
          "Invook now supports 50+ languages with enhanced accuracy. Switch seamlessly between languages and get accurate transcriptions in your preferred language.",
      },
      {
        type: "improvement",
        title: "Enhanced Voice Recognition",
        description:
          "Improved accuracy by 25% with our latest neural network models. Better handling of accents, background noise, and technical terminology.",
      },
    ],
  },
  {
    version: "2.4.0",
    date: "September 28, 2025",
    changes: [
      {
        type: "feature",
        title: "Custom Voice Commands",
        description:
          "Create your own voice commands and shortcuts. Automate repetitive tasks with simple voice triggers. Configure commands in Settings > Voice Commands.",
      },
      {
        type: "improvement",
        title: "Faster Processing Speed",
        description:
          "Reduced latency by 40% with optimized processing pipeline. Experience near-instant transcription with our improved engine.",
      },
      {
        type: "bugfix",
        title: "Fixed Audio Input Issues",
        description:
          "Resolved issues with microphone detection on certain devices. Improved compatibility with USB and Bluetooth microphones.",
      },
    ],
  },
  {
    version: "2.3.0",
    date: "September 10, 2025",
    changes: [
      {
        type: "feature",
        title: "Team Collaboration Features",
        description:
          "Share transcriptions with your team members. Add comments, annotations, and collaborate in real-time on shared documents.",
      },
      {
        type: "feature",
        title: "Export to Multiple Formats",
        description:
          "Export your transcriptions to PDF, Word, plain text, and more. Maintain formatting and structure across all export formats.",
      },
      {
        type: "improvement",
        title: "Improved UI/UX",
        description:
          "Redesigned interface with better accessibility and user experience. New dark mode theme with customizable colors.",
      },
    ],
  },
  {
    version: "2.2.0",
    date: "August 22, 2025",
    changes: [
      {
        type: "feature",
        title: "Offline Mode",
        description:
          "Use Invook without an internet connection. All processing happens locally on your device for complete privacy.",
      },
      {
        type: "improvement",
        title: "Battery Optimization",
        description:
          "Reduced battery consumption by 30% on mobile devices. Optimized processing for longer usage sessions.",
      },
      {
        type: "bugfix",
        title: "Fixed Sync Issues",
        description:
          "Resolved synchronization problems between desktop and mobile apps. Your data now syncs seamlessly across all devices.",
      },
      {
        type: "note",
        title: "Security Update",
        description:
          "Enhanced encryption protocols for improved data security. All voice data is now end-to-end encrypted.",
      },
    ],
  },
  {
    version: "2.1.0",
    date: "August 5, 2025",
    changes: [
      {
        type: "feature",
        title: "Voice Profiles",
        description:
          "Create multiple voice profiles for different users. Each profile learns and adapts to individual speaking patterns.",
      },
      {
        type: "improvement",
        title: "Punctuation Accuracy",
        description:
          "Enhanced automatic punctuation with 95% accuracy. Better detection of sentence boundaries and question marks.",
      },
      {
        type: "bugfix",
        title: "Fixed Keyboard Shortcuts",
        description:
          "Resolved conflicts with system keyboard shortcuts. All shortcuts now work consistently across platforms.",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "July 18, 2025",
    changes: [
      {
        type: "feature",
        title: "Complete UI Redesign",
        description:
          "Brand new interface with modern design principles. Cleaner layout, better navigation, and improved accessibility.",
      },
      {
        type: "feature",
        title: "API Access",
        description:
          "Developers can now integrate Invook into their applications. Comprehensive REST API with detailed documentation.",
      },
      {
        type: "improvement",
        title: "Performance Improvements",
        description:
          "Faster app launch times and reduced memory usage. Overall performance improvements across all platforms.",
      },
    ],
  },
  {
    version: "1.9.0",
    date: "June 30, 2025",
    changes: [
      {
        type: "feature",
        title: "Smart Formatting",
        description:
          "Automatic formatting of dates, times, phone numbers, and addresses. Saves time with intelligent text formatting.",
      },
      {
        type: "improvement",
        title: "Noise Cancellation",
        description:
          "Advanced noise cancellation for clearer audio input. Works great in noisy environments like cafes and offices.",
      },
    ],
  },
];
