# Project Purpose

This project is a **curated peer-to-peer webshop for high-end second-hand clothing**.

This is **not** a generic marketplace.

Core principles:

- Every **brand** is manually approved.
- Every **piece** is manually approved.
- Nothing becomes public without human decision.
- The platform is optimized for **taste, trust, and editorial quality**, not volume or growth hacks.

The frontend must reflect a **premium, Scandinavian, editorial feel**.

# UX Philosophy

Always prefer:

- Large imagery
- White space
- Few actions per screen
- Calm layouts
- Editorial presentation

Avoid:

- Gamification
- Infinite scroll spam
- Marketplace clutter
- Badge explosions
- cheap ecommerce UI

This should feel like a digital boutique, not a classifieds app.


# Frontend Architecture

- Next.js App Router
- Server Components by default
- Client Components only when required
- Backend API owns business logic
- Frontend only renders states

Do not introduce new libraries without asking
Do not bloat components with complex logic or state management
Keep components small and focused on presentation

# Code Style
- Use TypeScript for all code
- Use functional components and hooks
- Use CSS Modules for styles
- Follow the existing code style and patterns
- Write clear, descriptive names for variables and functions
- Avoid unnecessary abstraction or over-engineering
- Keep components small and focused on a single responsibility
- Write comments to explain why, not what
- Use consistent formatting and linting rules
- Avoid inline styles and hardcoded values
- Use environment variables for configuration

# Internationalization and Localization
- Use `next-i18next` for internationalization
- Store all user-facing text in translation files (per component and locale)
- Use keys that reflect the purpose of the text, not the literal content

# Performance Optimization
- Optimize images using Next.js Image component
- Use lazy loading for non-critical components and images
- Avoid unnecessary re-renders by using React.memo and useCallback
- Use server-side rendering for SEO-critical pages


# Accessibility
- Follow WCAG guidelines for accessibility
- Use semantic HTML elements
- Ensure sufficient color contrast
- Provide alt text for images
- Make interactive elements keyboard accessible
- Use ARIA attributes where necessary to enhance accessibility