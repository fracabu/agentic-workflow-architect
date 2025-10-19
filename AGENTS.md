# Agentic Workflow Architect - Development Guidelines

## Build & Development Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Code Style Guidelines

### Imports & Structure
- Use absolute imports with `@/` alias (e.g., `import { Workflow } from '@/types'`)
- Group imports: React first, then external libraries, then internal modules
- Use named exports for types and utilities, default exports for components

### TypeScript & Types
- All components must be typed with React.FC interface
- Use interfaces for object types in `types.ts`
- Strict TypeScript configuration enabled
- Use `@google/genai` for API interactions with proper typing

### Component Conventions
- Use functional components with hooks
- Props interfaces defined above component
- Use semantic HTML and proper ARIA labels
- Implement proper error boundaries and loading states

### Styling & UI
- Use Tailwind CSS classes only
- Dark theme: gray-800/900 backgrounds, gray-300 text, blue-400 accents
- Consistent spacing with Tailwind's spacing scale
- Responsive design with sm:, lg: prefixes

### Error Handling
- Validate API responses against expected schemas
- Provide user-friendly error messages
- Handle API key validation and localStorage management
- Use try-catch blocks for async operations

### API Integration
- Use Google Gemini API with structured response schemas
- Clean terminal output by removing single quotes
- Implement proper loading states during API calls
- Store API keys securely in localStorage