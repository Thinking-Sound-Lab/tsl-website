# Design System

This design system is inspired by Greptile's clean, modern aesthetic with a focus on technical precision and readability.

## Color Palette

### Primary Colors
```css
--primary: 142 53% 52%;           /* Greptile Green #4FB862 */
--primary-foreground: 0 0% 98%;   /* White text on primary */
```

### Background Colors
```css
--background: 0 0% 100%;          /* Light theme background */
--foreground: 222 84% 5%;         /* Dark text */
--muted: 210 40% 96%;             /* Light gray background */
--muted-foreground: 215 16% 47%;  /* Muted text */
```

### Dark Theme
```css
--background: 222 84% 5%;         /* Dark background */
--foreground: 210 40% 98%;        /* Light text */
--muted: 217 33% 17%;             /* Dark gray background */
--muted-foreground: 215 20% 65%;  /* Muted light text */
```

### Accent Colors
```css
--accent: 210 40% 96%;            /* Subtle accent */
--accent-foreground: 222 84% 5%; /* Text on accent */
--border: 214 32% 91%;            /* Border color */
--ring: 142 53% 52%;              /* Focus ring */
```

## Typography

### Font Family
- **Primary**: Inter, sans-serif
- **Monospace**: JetBrains Mono, monospace

### Font Scale
```css
/* Display */
--text-6xl: 3.75rem;    /* 60px */
--text-5xl: 3rem;       /* 48px */
--text-4xl: 2.25rem;    /* 36px */

/* Headings */
--text-3xl: 1.875rem;   /* 30px */
--text-2xl: 1.5rem;     /* 24px */
--text-xl: 1.25rem;     /* 20px */
--text-lg: 1.125rem;    /* 18px */

/* Body */
--text-base: 1rem;      /* 16px */
--text-sm: 0.875rem;    /* 14px */
--text-xs: 0.75rem;     /* 12px */
```

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semi-bold**: 600
- **Bold**: 700

### Line Heights
- **Tight**: 1.25
- **Snug**: 1.375
- **Normal**: 1.5
- **Relaxed**: 1.625
- **Loose**: 2

## Spacing System

### Base Unit: 0.25rem (4px)

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

## Layout Grid

### Container Sizes
- **Mobile**: 100% width with px-4 (16px padding)
- **Tablet**: 100% width with px-6 (24px padding)
- **Desktop**: Max-width 1200px with px-8 (32px padding)
- **Large**: Max-width 1920px

### Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Component Specifications

### Buttons

#### Primary Button
- Background: `var(--primary)`
- Color: `var(--primary-foreground)`
- Border Radius: 0.375rem (6px)
- Padding: 0.5rem 1rem (8px 16px)
- Font Weight: 500
- Transition: all 200ms ease

#### Secondary Button
- Background: `var(--background)`
- Color: `var(--foreground)`
- Border: 1px solid `var(--border)`
- Same sizing as primary

### Cards
- Background: `var(--background)`
- Border: 1px solid `var(--border)`
- Border Radius: 0.5rem (8px)
- Padding: 1.5rem (24px)
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

### Navigation
- Height: 4rem (64px)
- Background: `var(--background)` with backdrop blur
- Border Bottom: 1px solid `var(--border)`
- Sticky positioning

## Animation

### Transitions
- **Fast**: 150ms ease-out
- **Normal**: 200ms ease-out
- **Slow**: 300ms ease-out

### Common Animations
```css
.fade-in {
  animation: fadeIn 200ms ease-out;
}

.slide-up {
  animation: slideUp 300ms ease-out;
}

.hover-lift {
  transition: transform 200ms ease-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

## Accessibility

### Focus States
- Outline: 2px solid `var(--ring)`
- Outline Offset: 2px
- Border Radius: inherit

### Color Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- All interactive elements meet WCAG AA standards

## Usage Guidelines

1. **Consistency**: Use defined tokens for all colors, spacing, and typography
2. **Responsive**: Mobile-first approach with progressive enhancement
3. **Accessibility**: Ensure all components meet WCAG 2.1 AA standards
4. **Performance**: Optimize for fast loading and smooth animations
5. **Semantic HTML**: Use proper HTML elements for better accessibility