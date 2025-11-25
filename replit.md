# UML Diagram Studio

## Overview

UML Diagram Studio is a web-based AI-powered visual diagramming tool designed for creating UML diagrams with real-time preview capabilities. The application provides an interactive three-panel interface where users can write diagram code, preview the rendered diagram, and interact with an AI assistant for code generation and guidance. The tool supports PlantUML and Mermaid diagram syntaxes, with features including template management, export functionality (PNG/SVG), and a modern developer-focused design aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, chosen for fast HMR (Hot Module Replacement) and optimized production builds
- **Wouter** for lightweight client-side routing (significantly smaller than React Router)

**UI Component Strategy:**
- **shadcn/ui** component library built on Radix UI primitives, providing accessible, customizable components
- **Tailwind CSS** for utility-first styling with a custom design system inspired by Linear/VS Code aesthetics
- Custom CSS variables for theming (light/dark mode support) with HSL color values for granular control
- Monaco Editor integration for code editing with syntax highlighting and monospace font support

**State Management:**
- **TanStack Query (React Query)** for server state management, caching, and API request handling
- Local React state (useState/useCallback) for UI-specific state like panel visibility and diagram code
- No global state management library needed due to simple application scope

**Layout System:**
- Three-panel resizable layout using `react-resizable-panels`:
  - Left panel (40%): Monaco code editor
  - Center panel (40%): Diagram preview canvas
  - Right panel (20%): Collapsible AI chat sidebar
- Responsive design with minimum panel widths (300px) for usability

### Backend Architecture

**Server Framework:**
- **Express.js** with TypeScript for REST API endpoints
- Custom middleware for request logging and JSON body parsing
- Separate development (`index-dev.ts`) and production (`index-prod.ts`) entry points

**Development vs Production:**
- **Development:** Vite dev server integrated as Express middleware for HMR
- **Production:** Static file serving from pre-built `dist/public` directory
- Environment-specific plugin loading (Replit cartographer and dev banner only in development)

**API Endpoints:**
- `/api/chat` - AI-powered UML code generation using OpenAI GPT-5
- `/api/compile` - PlantUML/Mermaid diagram compilation to image URLs
- `/api/templates` - Template management for common diagram patterns
- `/api/export` - Diagram export functionality (PNG/SVG formats)

**Compilation Strategy:**
- PlantUML diagrams encoded using `plantuml-encoder` and rendered via external PlantUML server
- Mermaid diagram support planned/configured
- Real-time preview with 300ms debounce to prevent excessive compilation requests

### Data Storage Solutions

**Current Implementation:**
- **In-memory storage** (`MemStorage` class) using JavaScript Maps
- User management schema defined but not actively used (prepared for future authentication)
- No persistent database connection in current implementation

**Database Schema Design:**
- **Drizzle ORM** configured with PostgreSQL dialect
- Schema defined in `shared/schema.ts` with user authentication tables
- Migration configuration pointing to Neon Database serverless PostgreSQL (based on `@neondatabase/serverless` dependency)
- Database ready to be provisioned when authentication features are implemented

**Rationale for Current Approach:**
- In-memory storage sufficient for MVP focused on diagram creation/compilation
- Database infrastructure prepared but not activated to reduce operational complexity
- Easy migration path when user accounts and diagram persistence become requirements

### Authentication and Authorization

**Current State:**
- Authentication infrastructure defined but not implemented
- User schema exists with username/password fields
- No active session management or authentication middleware

**Prepared Infrastructure:**
- `connect-pg-simple` for PostgreSQL session store (when activated)
- Zod schema validation for user input (`insertUserSchema`)
- Storage interface (`IStorage`) abstracted to support future database integration

**Design Decision:**
- Delay authentication implementation to focus on core diagramming functionality
- Schema-first approach ensures clean migration when authentication is needed

### External Dependencies

**AI Integration:**
- **OpenAI API (GPT-5)** for intelligent UML code generation
- Context-aware conversation history support
- System prompt engineered for UML diagram expertise
- Graceful degradation with error messaging when API key not configured

**Third-Party Services:**
- **PlantUML Server** (external HTTP service) for diagram rendering
- Font services: Google Fonts (Inter, JetBrains Mono, Fira Code, DM Sans, Geist Mono)
- No CDN dependencies - fonts loaded directly from Google Fonts

**Development Tools:**
- **Replit-specific plugins** for development environment integration (cartographer, dev banner, runtime error modal)
- **ESBuild** for production bundling of server code
- **TSX** for TypeScript execution in development

**UI Libraries:**
- **Radix UI** primitives (18+ component packages) for accessible, unstyled component foundations
- **Monaco Editor** (@monaco-editor/react) for professional code editing experience
- **class-variance-authority** and **clsx** for component variant styling
- **cmdk** for command palette functionality
- **lucide-react** for icon system

**Validation & Data Handling:**
- **Zod** for runtime type validation and schema definition
- **drizzle-zod** for seamless integration between Drizzle ORM and Zod schemas
- **React Hook Form** with Hookform Resolvers for form state management

**Styling Infrastructure:**
- **Tailwind CSS** with PostCSS for processing
- **Autoprefixer** for CSS vendor prefix automation
- Custom Tailwind configuration with extended color palette and spacing system