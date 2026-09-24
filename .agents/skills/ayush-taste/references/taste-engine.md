# The Ayush Taste Discovery Engine & Codebase Profiler

This protocol instructs an agent on how to adapt **Ayush Taste** to *any* product or codebase, extract its existing aesthetic DNA, generate a persistent `taste.md` profile, and translate abstract feature briefs into tactile, living micro-illustrations.

---

## 1. The Codebase Discovery Protocol (Step 0)

Before writing any new illustration or animation code in an unfamiliar repository:

1. **Check for an Existing Taste Profile**:
   Look for `taste.md` or `.agents/taste.md` in the project root.
   - If found: Load it immediately into context. Follow its tokens and rules strictly.
   - If not found: Execute the **Taste Discovery Protocol** below and generate `taste.md`.

2. **Scan Package Dependencies (`package.json`)**:
   - Check for motion primitives: `"motion"`, `"framer-motion"`. (Always prefer `import { motion } from "motion/react"`).
   - Check for text morphing: `"torph"`. (If missing, propose installing `torph` or fallback to subtle blur-crossfade).
   - Check for icon sets: `@phosphor-icons/react`, `@hugeicons/react`, `lucide-react`. Use the project's native icon library.

3. **Extract Styling & Architectural Tokens**:
   - Page background (e.g., `bg-gray-50`, `#FAFAFA`, dark mode `#0A0A0A`).
   - Card surface (e.g., `bg-white`, `bg-neutral-900`).
   - Structural borders (e.g., `border-gray-200`, `border-[#eaeaea]`).
   - Typography font families (sans, mono, serif) and tracking preferences.

---

## 2. Generating the Local `taste.md` Profile

When adapting to a new project, write a `taste.md` file in the repository root formatted as follows:

```markdown
# [Product Name] — Acquired Taste Profile
Generated via Ayush Taste Engine.

## 1. Color Palette & Canvas Foundation
- Page Background:      bg-gray-50 (#F9FAFB)
- Card Canvas:          bg-white (#FFFFFF)
- Structural Borders:   border-gray-200 / border-[#eaeaea]
- Primary Accent:       oklch(0.703 0.16 239.5) / #2563EB (Electric Blue)
- Success State:        #10B981 / #15803D (Emerald)
- Warning / Sync State: #F59E0B / #B45309 (Amber)

## 2. Concentric Radii Mathematics
Formula: R_inner = R_outer - Padding
- Outer Frame:          rounded-lg (8px) or rounded-[10px] with p-[2px]
- Inner Card:           rounded-md (6px) or rounded-lg (8px)
- Badges & Buttons:     rounded-full (pill)

## 3. Elevation & Multi-Layer Shadows
- Card Default:         shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]
- Lifted / Ticket:      shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.15)]

## 4. Typography Scale
- Card Header:          text-[10px] font-medium tracking-tight text-neutral-900
- Status Badge:         text-[8px] font-medium px-1.5 py-0.5 rounded-full
- Micro Label:          text-[7px] font-medium text-neutral-400
- Tabular Numbers:      font-mono tabular-nums

## 5. Motion Physics & Easing
- Spring Physics:       stiffness: 400, damping: 25 (Apple duration 0.5s, bounce 0.15)
- UI Ease-Out:          cubic-bezier(0.23, 1, 0.32, 1)
- Handwriting Curve:    cubic-bezier(0.32, 0.72, 0, 1)
- Reading Hold:         4.2s–4.8s before soft 350ms blur-crossfade loop
```

---

## 3. Product Intent & Section Placement Analysis

Before drafting code, analyze four contextual dimensions:

### 1. What does the product actually do? (Domain Context)
* **Fintech / Payments**: Invoices, tabular amounts, currency symbols, escrow locks, bank receipts, payment proof checkmarks.
* **Dev Tools / AI Infra**: Terminal traces, latency counters (`12ms`), JSON payload previews, node connections, radar scans.
* **Agencies / Contracts**: E-signatures, deliverable file rows (`.fig`, `.pdf`), client scope status badges, revision counters.
* **Analytics / SaaS**: Metric stat cards, skeleton bar charts, trend chips (`+24.8%`), threshold indicators.

### 2. What is the section placement?
* **Hero Product Stage**: Needs central authority. Wide concentric frame, simulated primary workflow, or split interactive stage.
* **How It Works (Linear Sequence)**: Uniform card dimensions (`h-[200px] md:w-[373px]`). Must tell a chronological 3-step story:
  - Step 1: Input / Setup / Agreement.
  - Step 2: Processing / Execution / AI Protection.
  - Step 3: Resolution / Payment / Value Unlocked.
* **Bento Grid**: Asymmetrical balance:
  - 1 Anchor Card (spans 2 columns or full height): Primary mechanic (e.g. morphing dashboard or real-time graph).
  - 2–3 Supporting Cards: Micro-mechanics (e.g. ticket receipt, status cycle deck, vector pulse stream).

### 3. What is the user's specific prompt & intent?
* Extract the single primary action the user wants to communicate.
* *Example*: If the prompt says "Show how our AI spots compliance issues", the illustration must NOT be a generic brain icon. It must depict:
  1. A document row with text lines.
  2. A blue AI scan streak sweeping across the lines.
  3. A compliance badge locking into place: `"100% Compliant · 0 flags"`.

---

## 4. Translating Abstract Copy into Living Micro-UIs

Use this translation table whenever converting marketing copy into UI code:

| Abstract Marketing Copy | Living UI Translation | Real-Time Interaction |
|---|---|---|
| "Fast onboarding" | Client proposal card with avatar + invite pill | Checkmarks draw via `pathLength`, cursor signs document |
| "AI scope protection" | File card + feedback skeleton lines | Gradient beam scans comments; shield icon locks in |
| "Automated invoicing" | Scalloped ticket receipt with tabular amount | Status pill morphs to verified; lock shackle unlatches |
| "Real-time sync" | Connected nodes with blueprint grid | SVG linear-gradient pulse travels along path vectors |
| "Workflow automation" | Task queue card stack | Offset cards cycle with spring pop and status checkmark |
| "Instant approvals" | Dark neutral pill CTA button | Cursor clicks button; morphs via `layoutId` into approved invoice |
