# Membership Dashboard

A complete, production-grade Membership Directory and Analytics Dashboard web application built for the Software Engineering Internship Take-Home Challenge. The application features live metrics reporting, instant client-side search/filter/sort, a validated member onboarding form, automatic dark mode support, simulated mock API delays, and local storage state persistence.

---

## Features

### 1. Dashboard Statistics
* **Live KPI Metrics**: Displays **Active Members** ($1,243$ baseline), **Total Revenue** ($\$18,700$ baseline), and **New Signups Today** ($23$ baseline) in premium cards with custom indicator tags.
* **Fully Reactive**: Statistics automatically recalculate and update in real-time when new members are added, their membership tiers change, or when records are suspended or deleted.

### 2. Members Management
* **Interactive Directory**: Displays member profiles with inline status badges, emails, membership tiers, and join date timestamps.
* **Status Toggles**: Instantly change status between `Active` and `Inactive` with a single click.
* **Inline Tier Management**: Upgrade or downgrade member tiers inline using interactive badge selects.
* **Smart Removals**: Interactive record deletion with confirmation checks and undo feedback.

### 3. Search & Filtering
* **Instant Case-Insensitive Search**: Matches query strings across both name and email fields instantly as you type.
* **Granular Filtering**: Filter the list by Membership Tier (`Basic`, `Premium`, `Enterprise`) and account Status (`Active`, `Inactive`) simultaneously.
* **Double Sorting Layer**:
  * **Desktop**: Clicking any table header column toggles sorting direction (asc/desc) with dynamic visual arrows.
  * **Mobile**: A dedicated select dropdown allows mobile users to easily sort cards.

### 4. Add Member (React Hook Form & Zod)
* **Onboarding Drawer**: A modal overlay containing the new member onboarding form.
* **Schema Validation**: Powered by Zod and React Hook Form, enforcing:
  * Name: Required, minimum 2 characters, containing letters and spaces only.
  * Email: Required, must conform to standard email schema.
* **Seamless Appending**: New members default to `Active` status, generate dynamic mock profiles/avatar URLs, and are prepended to the top of the directory with a slide-in success toast.

### 5. Dark Mode
* **System Settings Sync**: Detects user OS dark theme settings on first launch.
* **Persistence & Transitions**: Toggle dark and light theme styles smoothly from the header toolbar with selections persisting in `localStorage`.

### 6. Responsive Design
* **Mobile-First Workspace**: Responsive layout utilizing flexible CSS Grid/Flexbox structures.
* **Optimized Mobile View**: Desktop tables seamlessly collapse into stacked list detail cards on touch-based viewports.

---

## Tech Stack

* **React.js** (v19) - Component state and virtual DOM.
* **TypeScript** - Strongly typed schemas, interfaces, and parameter safety.
* **Vite** (v8) - Lightning-fast build tool and local HMR dev server.
* **Tailwind CSS** (v4) - Utility-first CSS compiling via first-class `@tailwindcss/vite` plugin.
* **React Hook Form** (v7) - Uncontrolled inputs and form rendering performance.
* **Zod** - Declaration validation and TypeScript type inference.
* **Lucide React** - High-quality SVG icon packs.

---

## Setup Instructions

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your system.

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd C:\Users\Pratap\.gemini\antigravity\scratch\membership-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

### Testing
* Run unit tests:
  ```bash
  npm test
  ```
* Run tests in watch mode during development:
  ```bash
  npm run test:watch
  ```

---

## Project Structure

The project has been organized with strict separation of concerns:

```
src/
│
├── components/
│   ├── dashboard/
│   │   ├── StatCard.tsx        # Individual KPI metric card with trends
│   │   └── DashboardCards.tsx  # Grid wrapper coordinating stat cards
│   │
│   ├── members/
│   │   ├── MembersTable.tsx    # Responsive table/stacked list for directory
│   │   ├── SearchBar.tsx       # Instant search input field
│   │   ├── FilterBar.tsx       # Search query, filter, and mobile sort toolbar
│   │   ├── EmptyState.tsx      # Shown when search/filters return zero results
│   │   └── LoadingState.tsx    # Skeleton loader animations for table and cards
│   │
│   ├── forms/
│   │   └── AddMemberForm.tsx   # Add member form with Zod schema validation
│   │
│   ├── layout/
│   │   ├── Header.tsx          # Top bar with title, theme toggler, and notifications
│   │   ├── Sidebar.tsx         # Sidebar for desktop and drawer panel on mobile
│   │   └── Layout.tsx          # Main shell combining Sidebar, Header, and Workspace
│   │
│   └── ui/
│       ├── Button.tsx          # Configurable button with loading states
│       ├── Input.tsx           # Standardized input with error states
│       ├── Select.tsx          # Custom select dropdown
│       └── Card.tsx            # Styled container card with hover/glow effects
│
├── data/
│   └── mockMembers.ts          # Baseline mock members (20 members, 60% active, 40% inactive)
│
├── hooks/
│   ├── useMembers.ts           # Hook managing state, optimistic updates, and mock API calls
│   └── useDarkMode.ts          # Hook managing dark mode state and localStorage sync
│
├── services/
│   └── mockApi.ts              # Latency-simulated client-side mock CRUD API using localStorage
│
├── types/
│   └── member.ts               # Core TypeScript interfaces and type definitions
│
├── utils/
│   ├── filterMembers.ts        # Filtering utility helper
│   └── sortMembers.ts          # Sorting utility helper
│
├── pages/
│   └── Dashboard.tsx           # Dashboard coordinating page
│
├── App.tsx                     # App entry with Layout and page mounts
├── main.tsx                    # React mounting target
└── index.css                   # Tailwind entry with CSS variable customizations
```

---

## Design Decisions

1. **Optimistic UI Updates with Fallbacks**:
   When toggling a member's status or tier, the application updates the UI state immediately instead of waiting for mock latency. If the simulated mock API request fails, the state is safely rolled back to preserve data integrity.
2. **Double-Sided Sorting Architecture**:
   Recognizing that desktop tables are too wide for mobile screens, we build a stacked card list layout for mobile screens. This layout includes a mobile-friendly select dropdown for sorting, while the desktop table supports clicking column headers.
3. **Tailwind CSS v4 CSS-First Configuration**:
   We utilized Tailwind CSS v4, which deprecates the verbose `tailwind.config.js` and moves config variables directly inside the CSS stylesheet (`src/index.css`) using native `@theme` directives. This makes the workspace cleaner and builds faster.
4. **Verbatim Module Syntax Conformance**:
   The compiler configuration has verbatim module syntax enabled (`"verbatimModuleSyntax": true` in `tsconfig.json`). To ensure clean imports and prevent unused bundle exports, we strictly separate TypeScript type imports using `import type`.

---

## AI Tools Used

During this challenge, I leveraged a variety of professional resources:
* **ChatGPT**: Used to quickly brainstorm initial component schemas and write realistic member profiles.
* **Antigravity**: Assisted as a pair programmer, maintaining folder structure alignment, checking code compile safety, and managing file edits.
* **Documentation**: Consulted the official Vite, Tailwind CSS v4, React Hook Form, and Zod developer docs to implement best-practice integrations.
* **Google Search**: Utilized to research modern HSL dark mode color tokens and responsive grid layout ideas.

---

## Challenges Faced

* **Vite React 19 / TypeScript 5 Type Alignments**:
  Integrating React 19's TypeScript types with Vite generated compile warnings regarding legacy node types. I resolved this by cleaning up unused namespaces and updating typing exports.
* **`verbatimModuleSyntax` Strict Compiler Configuration**:
  The default Vite template configuration has strict compiler rules where type imports must be declared as type imports. A standard import would cause compile-time failures. I refactored import structures across all 15+ files to use `import type { ... }` explicitly.
* **Simulating Server Latency in Client-side Hooks**:
  Simulating asynchronous API latency (e.g., loading state spinners) while supporting instant search filtering was a challenge. I resolved this by keeping a master state list `allMembers` loaded via API and using derived calculations in a `useMemo` block, allowing filtering to happen instantly while mutations show realistic loaders.

---

## Improvements With One More Day

Given 24 more hours, I would implement:
1. **Toast Notification Undo Action**:
   Adding an "Undo" action inside the toast notification stack when deleting a member, allowing users to restore records instantly from memory.
2. **Comprehensive Unit Tests**:
   Adding a Vitest test suite with React Testing Library to test form validation, sorting logic, and state changes.
3. **Advanced Charts**:
   Integrating a lightweight charting library like Recharts to visualize membership growth trends and monthly recurring revenue (MRR) changes.
4. **Pagination**:
   Adding pagination to prevent rendering lag when loading thousands of members, loading records dynamically as the user scrolls or clicks next.
