# Invook (Thinking Sound Lab Website)

The official web presence for **Invook**, an infinite canvas for creative minds to bring ideas to life with unified AI tools.

- **Primary Domain**: [invook.ai](https://invook.ai)
- **Secondary Domain**: [thinkingsoundlab.com](https://thinkingsoundlab.com)

Built with Next.js 15 and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui & Framer Motion
- **Analytics**: Vercel Analytics
- **Linting**: ESLint

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Run type check

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── explore/           # Explore Gallery (Images/Videos)
│   ├── pricing/           # Pricing page
│   ├── contact-us/        # Contact page
│   ├── changelog/         # Product updates
│   ├── privacy-policy/    # Legal documentation
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/                   # API clients and utilities
│   ├── api/               # Explore API & Multipart Upload
│   └── upload/            # Upload Orchestrator
├── store/                 # State management (Zustand)
└── public/                # Static assets
```

## Key Features

- **Explore Gallery**: A community-driven showcase of AI-generated content.
- **Asset Management**: Authenticated users can view, edit (prompt/tags), and delete their uploads.
- **Multipart Uploads**: Robust chunked upload system for large media files (up to 50MB).
- **Responsive Lightbox**: Optimized media viewing experience across all devices.
- **SEO Ready**: Dynamic sitemap and metadata optimization.
- **Unified Auth**: Integration with backend magic-link and Google OAuth.

## Analytics

This project uses [Vercel Analytics](https://vercel.com/docs/analytics) to track page views and user interactions.

## Contact

For support or inquiries, email: [support@thinkingsoundlab.com](mailto:support@thinkingsoundlab.com)

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).
