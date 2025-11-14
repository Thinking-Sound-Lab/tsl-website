# Thinking Sound Lab Website

This is the official website for Thinking Sound Lab, built with Next.js 15 and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Fonts**: Inter font family
- **Analytics**: Vercel Analytics
- **Linting**: ESLint with Next.js configuration

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

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts and Analytics
│   ├── page.tsx           # Homepage
│   ├── pricing/           # Pricing page
│   ├── community/         # Community page
│   ├── contact-us/        # Contact page
│   └── ...
├── components/            # Reusable React components
├── public/               # Static assets
└── CLAUDE.md             # Development guidelines
```

## Key Features

- Responsive design with mobile-first approach
- SEO optimized with metadata
- Vercel Analytics integration for web analytics
- Custom stitched border design system
- Animated components and transitions
- FAQ sections with accordion functionality
- Community integration (Discord, LinkedIn, YouTube, Instagram)

## Analytics

This project uses [Vercel Analytics](https://vercel.com/docs/analytics) to track page views and user interactions. The Analytics component is integrated in the root layout (`app/layout.tsx`).

## Environment

The site is designed to work on:
- macOS
- Windows
- Modern web browsers (Chrome, Firefox, Safari, Edge)

## Contact

For support or inquiries, email: support@thinkingsoundlab.com

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
