export interface VideoUseCase {
  id: string;
  title: string;
  author: string;
  videoUrl: string;
  appIcons: string[];
  appNames: string[];
}

export const videoUseCases: VideoUseCase[] = [
  {
    id: "1",
    title: "Whispering in an open office on macbook",
    author: "Sahaj G.",
    videoUrl: "https://www.youtube.com/embed/P6W2iyp6YA4?si=mv6jphQ9-waMPdha",
    appIcons: ["📝"],
    appNames: ["Notion"],
  },
  {
    id: "2",
    title: "Push PRs with Wispr and get your steps in",
    author: "Jonas T.",
    videoUrl: "https://www.youtube.com/embed/9ZQP7PfHnuI?si=lw-LpIl-67vQzI_w",
    appIcons: ["⚡"],
    appNames: ["Wispr"],
  },
  {
    id: "3",
    title: "Turbocharge customer feedback and reporting",
    author: "Dan M.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appIcons: ["📊", "🎯", "📧"],
    appNames: ["Google Sheets", "Analytics", "Outlook"],
  },
  {
    id: "4",
    title: "Polished meeting follow-ups in minutes, not days",
    author: "Sarah K.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appIcons: ["💬"],
    appNames: ["Chat"],
  },
  {
    id: "5",
    title: "Lesson recaps now become easy as 1-2-3",
    author: "Alex R.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appIcons: ["📚"],
    appNames: ["Education"],
  },
  {
    id: "6",
    title: "Fly through LinkedIn comments to build your audience",
    author: "Maria L.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appIcons: ["💼"],
    appNames: ["LinkedIn"],
  },
];

// Helper function to extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string {
  const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : "";
}

// Helper function to get YouTube thumbnail URL
export function getYouTubeThumbnail(videoUrl: string): string {
  const videoId = getYouTubeVideoId(videoUrl);
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
