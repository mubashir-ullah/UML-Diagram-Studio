# UML Diagram Compiler Design Guidelines

## Design Approach
**Design System:** Modern Developer Productivity Tool (inspired by Linear, VS Code, and Cursor)
**Rationale:** Utility-focused application requiring efficiency, clarity, and professional aesthetics for technical users

## Core Layout Structure

### Three-Panel Layout
- **Left Panel (40%):** Code editor with syntax highlighting
- **Center Panel (40%):** Live diagram preview canvas
- **Right Panel (20%):** AI chatbot sidebar (collapsible to 0% when closed)
- Resizable panels with draggable dividers
- Minimum panel width: 300px to maintain usability

### Top Navigation Bar (60px height)
- Logo and product name (left-aligned)
- Diagram type selector dropdown (PlantUML, Mermaid, etc.)
- Export buttons (PNG, SVG) with icons
- Sample templates dropdown
- Settings/theme toggle (right-aligned)

## Typography System

**Font Stack:**
- Primary: `Inter` via Google Fonts (400, 500, 600 weights)
- Code/Monospace: `JetBrains Mono` for editor and code snippets

**Type Scale:**
- Headings: 16px (semibold) for panel headers
- Body: 14px (regular) for UI elements
- Code: 13px (monospace) for editor content
- Small: 12px for secondary labels and timestamps

## Spacing System

**Tailwind Units:** Consistent use of 2, 4, 6, 8, 12, 16 units
- Component padding: `p-4` for cards, `p-6` for panels
- Section gaps: `gap-4` for tight groupings, `gap-6` for panel content
- Margins: `mb-4` for stacked elements, `mt-8` for major sections

## Component Library

### Code Editor Panel
- Line numbers in gutter
- Syntax highlighting for PlantUML/Mermaid syntax
- Monospace font with 1.5 line height
- Subtle background differentiation from preview
- Real-time error indicators (red underlines)
- Footer: Character/line count, syntax mode indicator

### Diagram Preview Panel
- Centered canvas with zoom controls (toolbar: 50%, 100%, 150%, Fit)
- Pan functionality for large diagrams
- Loading skeleton while rendering
- Empty state: Helpful prompt with sample code link
- Grid background (subtle, toggleable)

### AI Chatbot Sidebar
- Collapsible with slide animation
- Chat message list (scrollable)
- User messages: Right-aligned bubbles
- AI responses: Left-aligned with avatar icon
- Code blocks in responses: Syntax highlighted with "Insert to Editor" button
- Input field at bottom with "Generate UML" placeholder
- Send button with icon
- Conversation history (scrollable)

### Template Selector
- Dropdown menu with categories
- Template preview thumbnails (small)
- Click to insert into editor
- Categories: Class Diagrams, Sequence, Activity, State, Use Case

### Export Controls
- Icon buttons with tooltips
- Download as PNG (raster export)
- Download as SVG (vector export)
- Copy diagram link (shareable URL)

## Interaction Patterns

### Panel Resizing
- Drag dividers to resize panels
- Double-click divider to reset to default
- Smooth transition (transition-all duration-200)

### Real-time Compilation
- 300ms debounce on code changes
- Smooth fade transition when diagram updates
- Error messages appear above preview with dismiss button

### Chatbot Interactions
- Expand/collapse sidebar with smooth slide (translate-x animation)
- Auto-scroll to latest message
- Typing indicator dots while AI generates
- Click code snippet to insert at cursor position

### Theme Toggle
- Icon button (sun/moon) in top bar
- Instant theme switch without animation
- Persist preference to localStorage

## Accessibility

- All interactive elements: Focus visible rings
- Keyboard shortcuts: Cmd/Ctrl+K for AI chat focus, Cmd/Ctrl+E for editor focus
- ARIA labels for icon buttons
- Sufficient contrast ratios (WCAG AA minimum)
- Screen reader announcements for diagram updates

## States & Feedback

**Loading States:**
- Preview: Skeleton pulse animation
- AI responses: Typing indicator

**Empty States:**
- Editor: "Start typing your UML code..." with sample link
- Preview: Illustration + "Your diagram will appear here"
- Chat: "Ask AI to generate UML diagrams"

**Error States:**
- Editor: Red underlines with tooltip on hover
- Preview: Error message with line number reference
- Chat: Retry button for failed requests

## Visual Hierarchy

1. **Primary Actions:** Export buttons, Send chat message
2. **Secondary Actions:** Template selector, theme toggle
3. **Tertiary Actions:** Zoom controls, settings

## Performance Notes
- Lazy load chat history
- Virtualize long code editor content
- Debounce diagram rendering
- Progressive image loading for thumbnails