---
name: ayush-designs-skill
description: Design and engineer high-craft, anti-slop SaaS landing pages and interactive marketing interfaces in the distinct Ayush design engineering aesthetic. Make sure to use this skill whenever the user asks to build, redesign, structure, or improve a SaaS landing page, marketing site, hero section, pricing page, feature showcase, or `/join` waitlist/onboarding route, or wants to implement interactive `motion/react` micro-illustrations, architectural breakout dividers, concentric border radius containers, or clean whitespace-first typography hierarchy.
---

# Ayush Design Engineering System

A comprehensive skill for engineering high-craft SaaS landing pages and interactive marketing interfaces, extracted from the Scrunity landing page codebase.

This design system is defined by:
1. **Pristine Whitespace & Restraint**: Spacious layouts that breathe, letting typography and micro-interactions command attention without visual clutter.
2. **The `Container` Architectural Foundation**: Every section is strictly anchored inside the `Container` component (`max-w-7xl bg-gray-50`) bordered by `border-x border-gray-200`.
3. **Full-Viewport Breakout Dividers**: Edge-to-edge subtle lines (`h-px w-screen -translate-x-1/2 bg-gray-200`) intersecting vertical container borders to form an architectural blueprint grid.
4. **Blur-Reveal Typography Hierarchy**: Cohesive `Heading`, `SubHeading`, and `Para` components featuring `motion/react` blur-in transitions on scroll (`blur(10px)` → `blur(0px)`).
5. **Living In-Code Illustrations**: Zero generic screenshots or static stock art. Every feature is communicated via interactive or simulated micro-UIs: morphing layouts, card decks, automated cursor clicks, and ticket notches.
6. **The `/join` Route Masterpiece**: A 50/50 split onboarding stage with masked repeating dashed blueprint lines, spinning dual conic-gradient glows, and animated SVG vector pulse streaks.

---

## Core Invariants (Non-Negotiable Rules)

When generating or refactoring any landing page with this skill:

1. **Always use `Container` from `components/container.tsx`**:
   Wrap page content inside `<Container className="...">`. Never write arbitrary full-width content blocks without this structure.
2. **Prioritize generous whitespace**:
   - Hero header: `pt-20 pb-10 md:pt-40 md:pb-20`
   - Section padding: `py-16 md:py-24`
   - Gap spacing: `gap-6` to `gap-10`
   - Reading width: Paragraphs must have explicit readable constraints (`max-w-xl`, `w-full md:w-150`).
3. **Use architectural breakout `<Divider />` between major sections**:
   Do not use standard enclosed HR tags. Use the breakout divider that spans `w-screen` from within the bordered container.
4. **Follow Concentric Border Radius Mathematics**:
   Outer radius and inner radius must satisfy:
   $$R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$$
   *Examples from the codebase:*
   - Pricing card: Outer `rounded-[24px]` + `p-2` (8px) → Inner `rounded-[16px]`
   - Newsletter card: Outer `rounded-[20px]` + `p-1.5` (6px) → Inner `rounded-[14px]`
   - Illustration frame: Outer `rounded-[10px]` + `p-[2px]` → Inner `rounded-lg` (8px)
5. **Strict Typography Hierarchy**:
   Always use the dedicated typography components (`Heading`, `SubHeading`, `Para`) from `components/utility/texts.tsx` with tight tracking and blur reveals.
6. **Button Tactile Physics**:
   Buttons must use pill silhouettes (`rounded-full`), dark neutral fill (`bg-neutral-800` or `bg-neutral-900`), an inset highlight shadow (`shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]`), and spring press physics (`whileTap={{ scale: 0.96 }}`).
7. **Animation Framework**:
   Always import motion primitives from `"motion/react"` (the current Motion standard for React 19 / Next.js).

---

## Progressive Disclosure & Reference Library

For deep technical implementations, copy-pasteable component source, and complete page recipes, refer to the bundled references:

- **[Typography & Layout Guide](references/typography-and-layout.md)**: Exact tokens, `Container`, `Divider`, `Heading`, `SubHeading`, `Para`, `Button`, and concentric border formulas.
- **[Motion & Interaction System](references/motion-patterns.md)**: Motion physics, spring configurations, in-view blur reveals, text morphing, and reduced motion adaptations.
- **[Illustration System & /join Route](references/illustrations-and-join-route.md)**: The SVG pulse-streak engine, dual conic glow badge, repeating dashed grid lines, card decks, and cursor simulations.
- **[Full SaaS Landing Page Generator](references/saas-page-generator.md)**: Complete production template to scaffold a landing page for any SaaS product from scratch.

---

## Quick Reference: Component & Token Palette

### 1. Palette & Colors
```css
/* Light minimal foundation */
Page Background:       bg-gray-50 (oklch(1 0 0) or #F9FAFB)
Panel / Form Canvas:   bg-gray-100 (oklch(0.96 0 0))
Card Surface:          bg-white
Structural Borders:    border-gray-200 (or border-gray-200/90)
Primary Text:          text-neutral-800 / text-neutral-900
Secondary Text:        text-neutral-500
Tertiary / Micro Text: text-neutral-400
Accent / Brand:        oklch(0.703 0.16 239.5) (electric cyan/blue)
```

### 2. Multi-Layer Border Shadows
```css
/* Subtle elevation without heavy muddy drops */
--shadow-border-sm: 0px 0px 0px 1px rgba(0, 0, 0, 0.06),
                    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
                    0px 2px 4px 0px rgba(0, 0, 0, 0.04);

--shadow-border:    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
                    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
                    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
```

### 3. Typography Scale
| Element | Mobile | Desktop | Weight & Tracking | Color | Motion Reveal |
|---|---|---|---|---|---|
| `Heading` | `text-[36px]` | `text-[56px]` | `font-medium tracking-tight leading-none md:leading-16` | `text-neutral-800` | In-view `blur(10px)` → `0px`, `y: 10` → `0` |
| `SubHeading` | `text-[24px]` | `text-[28px]` | `font-medium tracking-tighter` | `text-neutral-800` | In-view `blur(10px)` → `0px` |
| `Para` | `text-[16px]` | `text-[16px]` | `font-medium tracking-tight leading-relaxed` | `text-neutral-500` | In-view `blur(10px)` → `0px` |
| `Badge / Tag` | `text-[9px]` | `text-[10px]` | `font-medium tracking-[0.16em] uppercase` | `text-neutral-400` | Static / Pill wrapper |
| `Mono / Num` | `text-[10px]` | `text-[11px]` | `font-mono tabular-nums` | `text-gray-400` | Static |

---

## Anatomy of a Page

Every landing page follows this exact 7-layer architecture:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Sticky Navbar (72px, h-auto logo, pill links, CTA, blob) │
├─────────────────────────────────────────────────────────────┤
│ 2. Hero Header in Container:                                │
│    Left: Heading ("Save time \n and think less")            │
│    Right: Para + Dual CTAs ("Join Waitlist" + "Get Access") │
├─────────────────────────────────────────────────────────────┤
│ 3. Hero Product Stage (Concentric rounded app frame)        │
│    Left sidebar + Generative AI Chat / Live product UI      │
├─────────────────────────────────────────────────────────────┤
│ 4. Main Body Container (border-x border-gray-200 px-10.5)   │
│    ├─ Animated SubHeading ("Turns contracts...")           │
│    ├─ 3-Column Feature Cards (Morphing Illustrations)       │
│    ├─ <Divider /> (Edge-to-edge breakout line)              │
│    ├─ How It Works (3-step interactive cards: deck, notch)  │
│    ├─ <Divider />                                           │
│    ├─ Pricing (3 concentric cards with tabular-nums)        │
│    ├─ <Divider />                                           │
│    ├─ Interactive Value Section (SVG path flow / Dark UI)   │
│    ├─ <Divider />                                           │
│    └─ Footer (Status indicator, Newsletter, Legal, Social)  │
├─────────────────────────────────────────────────────────────┤
│ 5. Dedicated /join Route (Split 50/50 stage + SVG Pulse)    │
└─────────────────────────────────────────────────────────────┘
```

---

## The Feature Illustration Philosophy

Never use generic icon-in-circle placeholders. Each feature illustration must depict a real system mechanic using one of these four proven archetypes:

1. **Morphing State Machine (`Illustration1`)**:
   An initial dropped entity (e.g. document, prompt, dataset) morphs via `layoutId` into a fully rendered dashboard with animated skeleton bars.
2. **Physical Card Deck with Status Cycle (`Illustration2`)**:
   An offset stacked deck of cards (`y = offset * 12`, `scale = 1 - offset * 0.05`) cycling states (`loading` → `success` → `error`), with SVG `pathLength` checkmarks and an error shake animation.
3. **Simulated Cursor Interaction (`Illustration3`)**:
   A realistic automated cursor travels across the canvas to click a button, which depresses on press and morphs via `layoutId` into a detailed receipt or confirmation card featuring a scalloped ticket notch.
4. **Dynamic Measured Node Flow (`Easy`)**:
   A canvas where multiple process nodes are measured in DOM coordinates (`getBoundingClientRect`), connected by an SVG path animated via `stroke-dashoffset`, lighting up with tubelight neon flickers as the signal passes.

---

## The `/join` Route Architecture

The `/join` page is a masterclass in conversion-stage design engineering:
- **Layout**: Two equal columns (`min-h-[calc(100svh-72px)] gap-2 p-2`).
  - **Left**: Minimal form container (`bg-gray-100 rounded-lg p-12 backdrop-blur-md`) with clean `SubHeading`, `Para`, and inputs.
  - **Right**: Technical blueprint stage (`bg-gray-50 rounded-lg overflow-hidden`).
- **Blueprint Grid**: Repeating linear-gradient dashed lines (`repeating-linear-gradient(...) 0 8px, transparent 8px 20px`) faded with CSS mask gradients (`mask-x-from-30%`, `mask-y-from-30%`).
- **Center Glowing Logo**:
  - Dual spinning conic gradients (`scale-[1.5] animate-spin [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)]`).
  - White logo tile centered with high contrast.
- **SVG Moving Pulse Gradients**:
  Linear gradients along static connector paths where `x1, y1, x2, y2` travel along normalized direction vectors on a synchronized cyclic timeline (`CYCLE = TOP_TRAVEL + HOLD + BOTTOM_TRAVEL`).

---

## Code Review & Pre-Flight Checklist

Before confirming any landing page code, review against this table:

| Requirement | Correct Implementation | Incorrect / Slop |
|---|---|---|
| **Container** | `<Container className="...">` from `components/container.tsx` | Arbitrary `max-w-6xl mx-auto px-4` divs |
| **Separators** | `<Divider />` breaking out to `w-screen` | `<hr className="my-8" />` or standard border-b |
| **Heading** | `<Heading>` with `blur(10px)` in-view reveal | Plain `<h1>` with generic bold styling |
| **SubHeading** | `<SubHeading>` with keyword accent span tags | Standard `<h2>` with no motion or rhythm |
| **Card Borders** | Concentric radii: $R_{\text{inner}} = R_{\text{outer}} - p$ | Arbitrary uncoordinated border radii |
| **Button** | Pill, `shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]`, `whileTap` | Flat rectangle with default `:hover` opacity |
| **Numbers** | `tabular-nums` on all currencies, metrics, and timestamps | Standard proportional numbers that jitter |
| **Imports** | `import { motion } from "motion/react"` | `import { motion } from "framer-motion"` |
| **Motion** | Spring physics (`bounce: 0`, `stiffness: 300`, `damping: 25`) | Linear CSS transitions or floaty ease-in |
| **Whitespace** | `py-20` to `py-32`, generous space around cards | Cramped elements with `py-6` or `gap-2` |
