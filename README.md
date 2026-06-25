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
* **JavaScript (ES6+)** - Modern JavaScript for clean, maintainable code.
* **Vite** (v8) - Lightning-fast build tool and local HMR dev server.
* **Tailwind CSS** (v4) - Utility-first CSS compiling via first-class `@tailwindcss/vite` plugin.
* **React Hook Form** (v7) - Uncontrolled inputs and form rendering performance.
* **Zod** - Runtime validation for runtime safety.
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
│   │   ├── StatCard.jsx        # Individual KPI metric card with trends
│   │   └── DashboardCards.jsx  # Grid wrapper coordinating stat cards
│   │
│   ├── members/
│   │   ├── MembersTable.jsx    # Responsive table/stacked list for directory
│   │   ├── SearchBar.jsx       # Instant search input field
│   │   ├── FilterBar.jsx       # Search query, filter, and mobile sort toolbar
│   │   ├── EmptyState.jsx      # Shown when search/filters return zero results
│   │   └── LoadingState.jsx    # Skeleton loader animations for table and cards
│   │
│   ├── forms/
│   │   └── AddMemberForm.jsx   # Add member form with Zod schema validation
│   │
│   ├── layout/
│   │   ├── Header.jsx          # Top bar with title, theme toggler, and notifications
│   │   ├── Sidebar.jsx         # Sidebar for desktop and drawer panel on mobile
│   │   └── Layout.jsx          # Main shell combining Sidebar, Header, and Workspace
│   │
│   └── ui/
│       ├── Button.jsx          # Configurable button with loading states
│       ├── Input.jsx           # Standardized input with error states
│       ├── Select.jsx          # Custom select dropdown
│       └── Card.jsx            # Styled container card with hover/glow effects
│
├── data/
│   └── mockMembers.js          # Baseline mock members (20 members, 60% active, 40% inactive)
│
├── hooks/
│   ├── useMembers.js           # Hook managing state, optimistic updates, and mock API calls
│   └── useDarkMode.js          # Hook managing dark mode state and localStorage sync
│
├── services/
│   └── mockApi.js              # Latency-simulated client-side mock CRUD API using localStorage
│
├── types/
│   └── member.js               # Core data types and type definitions
│
├── utils/
│   ├── filterMembers.js        # Filtering utility helper
│   └── sortMembers.js          # Sorting utility helper
│
├── pages/
│   └── Dashboard.jsx           # Dashboard coordinating page
│
├── App.jsx                     # App entry with Layout and page mounts
├── main.jsx                    # React mounting target
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
4. **JavaScript ES6+ Module Syntax**:
   The project uses standard ES6 module syntax with `import` and `export` statements for clean module organization and tree-shaking optimization.

---

## AI Tools Used

During this challenge, I leveraged a variety of professional resources:
* **ChatGPT**: Used to quickly brainstorm initial component schemas and write realistic member profiles.
* **Antigravity**: Assisted as a pair programmer, maintaining folder structure alignment, checking code compile safety, and managing file edits.
* **Documentation**: Consulted the official Vite, Tailwind CSS v4, React Hook Form, and Zod developer docs to implement best-practice integrations.
* **Google Search**: Utilized to research modern HSL dark mode color tokens and responsive grid layout ideas.

---

## Challenges Faced

* **Simulating Server Latency in Client-side Hooks**:
  Simulating asynchronous API latency (e.g., loading state spinners) while supporting instant search filtering was a challenge. I resolved this by keeping a master state list `allMembers` loaded via API and using derived calculations in a `useMemo` block, allowing filtering to happen instantly while mutations show realistic loaders.
* **TypeScript to JavaScript Conversion**:
  The project was successfully converted from TypeScript to vanilla JavaScript while maintaining 100% functionality. All type annotations were removed, and the build configuration was updated to support `.js` and `.jsx` files. This simplified the development experience while preserving all runtime behavior and validation through Zod.

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
