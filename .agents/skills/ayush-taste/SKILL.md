---
name: ayush-taste
description: The official Ayush Taste design engineering standard. Make sure to activate and use this skill whenever the user asks to design, craft, build, or animate high-craft SaaS illustrations, interactive micro-UIs, feature cards, how-it-works sections, bento grids, onboarding stages, or marketing interfaces, or asks to make an interface "feel right", "anti-slop", or look like Scrunity. Enforces physical UI mechanics, SVG pathLength inking, AI scanner beams, escrow unlocks, fluid TextMorph transitions, concentric radii, and ambient lighting shaders. Capable of generating single illustrations, multi-step card sequences, or complete bento grids for any product.
---

# Ayush Taste: The Design Engineering Standard

A comprehensive design engineering system for building living, interactive in-code SaaS marketing illustrations and high-craft interfaces, extracted from the Scrunity landing page.

This skill equips any AI agent to craft pixel-perfect, anti-slop micro-UIs for **any product**, adapting to the user's codebase while maintaining absolute aesthetic excellence.

---

## The Master Build Sequence for the Agent

When this skill is invoked to create or animate an illustration, you MUST execute these steps in order:

```
┌────────────────────────────────────────────────────────┐
│ 1. Scan or Generate `taste.md` in User's Codebase      │
├────────────────────────────────────────────────────────┤
│ 2. Study Product Context, Placement & User Intent      │
├────────────────────────────────────────────────────────┤
│ 3. Consult `references/illustrations.md` for Archetype │
├────────────────────────────────────────────────────────┤
│ 4. Generate Living Micro-UI (Single / Multi / Bento)   │
├────────────────────────────────────────────────────────┤
│ 5. Wire Tactile Physics, Inking, Scan & TextMorph      │
├────────────────────────────────────────────────────────┤
│ 6. Pre-Flight Checklist & Typecheck Verification       │
└────────────────────────────────────────────────────────┘
```

---

### Step 1: Check or Generate the Project's `taste.md`

Always ensure the user's project has a codified taste profile:
1. Check if `taste.md` exists in the repository root.
2. If it exists, read it to adopt the project's exact background colors, card surfaces, borders, font families, and accent tokens.
3. If it does NOT exist:
   - Run the discovery protocol from [`references/taste-engine.md`](references/taste-engine.md).
   - Scan `package.json` for motion and icon packages (`motion`, `torph`, Phosphor, Lucide).
   - Scan CSS/Tailwind for background and border colors.
   - **Create `taste.md` in the project root** to lock in the acquired tokens before writing illustration code.

---

### Step 2: Study Product Domain, Section Placement & Intent

Never invent abstract graphics. Analyze the user's specific context:

1. **What does the product actually do?**
   - *Contracts / Legal / Agencies*: E-signatures, document folders, review revisions, client scopes.
   - *Fintech / Billing*: Invoices, tabular numbers, escrow locks, payment proof stamps.
   - *Developer Infra / AI*: Terminal outputs, latency gauges, light-beam radar scans, node vectors.
2. **Where does this illustration live?**
   - **Hero Stage**: High authority, large concentric frame, simulated end-to-end journey.
   - **How It Works (Linear Sequence)**: Uniform cards (`h-[200px] md:w-[373px]`) telling a sequential 3-step story:
     `Step 1 (Input/Sign) → Step 2 (Process/Protect) → Step 3 (Settle/Release)`.
   - **Bento Grid**: Asymmetrical balance. One 2-column or full-height anchor card (e.g. morphing dashboard) + two supporting micro-cards.
3. **What is the single core message?**
   Translate the user's copy into a real system mechanic using the table in [`references/taste-engine.md`](references/taste-engine.md).

---

### Step 3: Consult the Reference Illustrations Atlas

Before writing code, study the canonical implementations in [`references/illustrations.md`](references/illustrations.md):

* **Archetype 1 (The Hand-Inked Document)**:
  Client proposal, checklist verification, automated cursor glide (`[0.23, 1, 0.32, 1]`), tactile click (`scale: 0.82`), and cursive handwriting inking via SVG `pathLength: 0 → 1` (`[0.32, 0.72, 0, 1]`).
* **Archetype 2 (The AI Scope Scanner)**:
  Deliverable file card, incoming feedback skeleton lines, horizontal light-beam radar sweep (`via-blue-400/25 blur-[2px]`), and dual-stage shield contour + checkmark draw.
* **Archetype 3 (The Scalloped Ticket & Escrow Unlocking)**:
  Invoice voucher with top-edge `radial-gradient` scallops, tabular amounts, payment proof checkmark, and physical lock shackle popping open (`y: -3`).
* **Archetype 4 (The Shared Layout Morph)**:
  Dropped entity (PDF/dataset) morphing via `layoutId` into a responsive dashboard with active skeleton metrics.
* **Archetype 5 (The 3D Stacked Card Deck)**:
  Physical perspective card stack cycling states (`loading → success → error`) with spring pop and full-card error shake.

---

### Step 4: Assemble the Micro-UI Components

Every illustration must follow this 4-layer composition:

1. **Outer Frame with Concentric Mathematics**:
   Outer container `rounded-lg` or `rounded-[10px]` with `p-[2px]`.
   Inner card strictly satisfies $R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$.
2. **Architectural Blueprint Grid Backdrop**:
   ```tsx
   <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />
   ```
3. **Atmospheric Ambient Glow**:
   `GlowEffect` in `mode="breathe"`, `blur="stronger"`, `opacity-30` behind the card.
   Shifts color to celebrate resolution (Sky/Indigo during review → Emerald/Cyan once verified).
4. **Living Card Surface**:
   Multi-layer micro-shadow (`shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]`).
   Tactile hover lift (`whileHover={{ y: -2 }}`) and active press (`whileTap={{ scale: 0.985 }}`).

---

### Step 5: Wire Motion Physics & Text Transitions

Adopt copy-pasteable formulas from [`references/motion-recipes.md`](references/motion-recipes.md):

* **Always use `TextMorph` from `torph/react`** for status badges, tags, and subtitle transitions. Never let text snap or teleport.
* **Always use SVG `pathLength: 0 → 1`** for checks, shields, and handwriting signatures.
* **Paced Staged Lifecycle**:
  - Step 1: Initial state & element stagger (0ms–600ms).
  - Step 2: Automated action or AI scan (600ms–2000ms).
  - Step 3: Resolution, text morph & celebration spring pop (2000ms–2500ms).
  - Step 4: **Hold stage for 4.2s–4.8s** so viewers can comfortably read the card.
  - Step 5: Soft-blur crossfade (`opacity: 0.6, blur: 1px` over 350ms) before cleanly looping.
* **Click-to-Replay**:
  Attach `onClick` to the card so visitors can click to immediately replay or trigger the interaction.
* **Reduced Motion**:
  `const shouldReduceMotion = useReducedMotion();`
  When enabled, present settled verified states cleanly without continuous motion.

---

## The Non-Negotiable Anti-Slop Creed

Before confirming any illustration code, run this strict check:

| Defect | Instant Failure Reason | Required Fix |
|---|---|---|
| Card bobs or floats infinitely | Pure slop; feels like a cheap template | Anchor the card solidly; animate internal system mechanics |
| Rotating rainbow gradient | Loud visual clutter that distracts from product | Use restrained, diffused ambient backlighting (`opacity-30`, `blur-xl`) |
| Bouncy scale(0) entrance | Unrealistic; elements don't appear from nothing | Enter from `scale(0.95)` with opacity, or use physical inking |
| Text abruptly snaps on state change | Jarring and unpolished | Use `<TextMorph>` from `torph/react` for character-by-character morphing |
| Stale generic screenshot | Uncommunicative stock design | Build living in-code micro-UI with avatars, badges, and real metrics |
| Jittering numbers | Tabular numbers missing | Add `font-mono tabular-nums` to all metrics and amounts |

---

## Bundled Reference Library

For complete code, archetypes, and discovery algorithms, refer to:
* **[The Illustrations Atlas](references/illustrations.md)**: Full source code and breakdowns of all canonical cards from `features-one` and `how-it-works`.
* **[The Taste Discovery Engine](references/taste-engine.md)**: Automated codebase scanning protocol and `taste.md` generator.
* **[Motion Recipes & Formulas](references/motion-recipes.md)**: SVG inking, AI scanner streaks, escrow shackle physics, and `GlowEffect` shaders.
