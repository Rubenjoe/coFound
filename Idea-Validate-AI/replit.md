# AI Cofound - Startup Idea Validation Platform

## Overview

AI Cofound is a web application that provides instant, AI-powered business validation for startup ideas. Users submit their startup concept through a simple form, and the system generates a comprehensive validation report including target customer analysis, market overview, competitor analysis, lean canvas framework, and a 2-4 week MVP roadmap. The application emphasizes clarity and progressive disclosure—starting with a simple input interface and revealing detailed, actionable insights in an easily digestible format.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing (lightweight alternative to React Router).

**UI Component System**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows a "New York" style variant with custom color tokens for light/dark themes.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global client state management library is used—component state is managed locally with React hooks.

**Design System**: Custom design tokens defined in CSS variables supporting light and dark modes. Typography uses Inter font family (via Google Fonts CDN) with specific weight and size scales. The layout system uses Tailwind spacing primitives (3, 4, 6, 8, 12, 16, 20 units) for consistency.

**Form Handling**: React Hook Form with Zod schema validation via @hookform/resolvers for type-safe form validation.

**Theme System**: Custom theme provider with localStorage persistence and system preference detection for light/dark mode switching.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with two primary endpoints:
- `POST /api/validate` - Accepts startup idea, generates AI validation report
- `GET /api/reports` - Retrieves all generated reports (not currently used in UI)

**Data Storage**: In-memory storage using a Map-based implementation (`MemStorage` class). This is a simple storage layer that maintains reports in RAM—data is lost on server restart. The architecture is abstracted through an `IStorage` interface, making it straightforward to swap in persistent storage (database) later.

**AI Integration**: OpenAI API integration for generating validation reports. The system uses structured prompts to ensure consistent JSON output matching the defined schema. Error handling includes specific checks for missing API keys with user-friendly error messages.

**Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling. The server build includes dependency bundling for faster cold starts (allowlist of commonly used dependencies).

**Development Mode**: Vite middleware integration for HMR (Hot Module Replacement) during development, with Replit-specific plugins for enhanced developer experience when running on Replit platform.

### Data Models & Validation

**Schema Definition**: Zod schemas defined in `shared/schema.ts` provide type-safe validation across client and server. The schemas define:
- Customer segments (name, demographics, pain points)
- Market overview (TAM, growth rate, trends, opportunities)
- Competitors (name, positioning, strengths)
- Lean Canvas (9-block business model framework)
- MVP Roadmap (weekly milestones with tasks, deliverables, metrics)
- Validation Report (aggregates all above with viability score and idea summary)

**Type Safety**: TypeScript types are inferred from Zod schemas using `z.infer<>`, ensuring consistency between runtime validation and compile-time types.

### Progressive Enhancement & UX Flow

**State Machine**: The home page implements a three-state view system:
1. **Input** - Idea submission form with example prompts
2. **Loading** - Animated progress indicator with step-by-step analysis feedback
3. **Report** - Comprehensive dashboard with scrollable sections and sticky navigation

**Loading Experience**: Custom loading component simulates analysis progress through predefined steps (target customers, market analysis, competitors, lean canvas, MVP roadmap), providing user feedback during the AI generation process.

**Report Navigation**: Scroll-aware navigation that highlights the active section based on viewport position. Smooth scrolling to sections when navigation items are clicked.

## External Dependencies

### AI Service
- **OpenAI API**: Primary AI service for generating validation reports using GPT models. Requires `OPENAI_API_KEY` environment variable. The application includes graceful degradation with clear error messages when the API key is not configured.

### Database & Session Management
- **Drizzle ORM**: Database toolkit configured for PostgreSQL (see `drizzle.config.ts`), though currently not actively used. The configuration expects a `DATABASE_URL` environment variable.
- **connect-pg-simple**: PostgreSQL session store for Express sessions (imported but not currently utilized).

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Shadcn/ui**: Pre-built component library built on Radix + Tailwind
- **Lucide React**: Icon library for consistent iconography throughout the app

### Development Tools
- **Vite**: Build tool and dev server with HMR support
- **TypeScript**: Type safety across the entire codebase
- **ESBuild**: Fast JavaScript bundler used in production builds
- **Replit Plugins**: Development-time plugins for Replit platform integration (cartographer, dev banner, runtime error overlay)

### Fonts
- **Google Fonts**: External CDN for Inter, DM Sans, Fira Code, Geist Mono, and Architects Daughter font families loaded via `<link>` tags in HTML head.

### Notable Technical Decisions

**Why In-Memory Storage**: The current implementation uses in-memory storage for simplicity and rapid prototyping. While Drizzle ORM is configured and ready, the storage layer is abstracted to allow easy migration to PostgreSQL when persistence is needed.

**Why OpenAI**: The application requires sophisticated natural language understanding to analyze startup ideas and generate structured business insights. OpenAI's GPT models provide reliable JSON-structured output when properly prompted.

**Why Monorepo Structure**: Client, server, and shared code live in the same repository with TypeScript path aliases, enabling code reuse (especially Zod schemas) and simplified development workflow.

**Why Shadcn/ui**: Provides production-ready, accessible components while maintaining full control over styling and customization. Components are copied into the project rather than installed as dependencies, allowing for modifications.