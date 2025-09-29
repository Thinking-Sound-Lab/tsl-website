# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (opens at http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Project Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS.

### Key Structure
- `/app/` - Next.js App Router directory containing pages and layouts
- `/app/layout.tsx` - Root layout with Geist font configuration and global styles
- `/app/page.tsx` - Homepage component
- `/app/globals.css` - Global styles with Tailwind CSS and custom CSS variables

### Technology Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS 4 with custom CSS variables for theming
- **UI Components**: shadcn/ui for all UI components
- **Fonts**: Inter font family (update from Geist)
- **Linting**: ESLint with Next.js configuration

### Development Guidelines
- **UI Components**: Always use shadcn/ui components for consistent design system
- **Font**: Use Inter font family instead of Geist for better readability
- **Code Style**: Keep code simple, clean, and well-organized
- **File Organization**: Create proper file and folder structure with clear naming conventions

### Styling System
- Uses Tailwind CSS with a custom theme configuration in `globals.css`
- CSS variables for background/foreground colors with automatic dark mode support
- Font variables should be configured for Inter font family

### Path Configuration
- `@/*` alias points to the root directory for imports