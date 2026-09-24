---
name: ayush-taste
description: The official Ayush Taste design engineering standard. Use whenever designing, animating, reviewing, or polishing high-craft SaaS marketing interfaces, feature illustrations, interactive micro-UIs, how-it-works cards, onboarding stages, or landing page components. Enforces anti-slop principles, restrained ambient lighting, physical inking and scanning interactions, SVG pathLength physics, fluid TextMorph transitions, concentric radii, and tactile responsiveness.
---

# Ayush Taste: The Design Engineering Standard

A codified design engineering skill capturing the distinct craft sensibility, motion vocabulary, and anti-slop principles established across the Scrunity landing page and interactive illustrations.

Taste is not arbitrary preference — it is the disciplined aggregate of invisible details, physical realism, and aesthetic restraint.

---

## The Core Philosophy: Anti-Slop Invariants

Never deliver generic AI slop. When crafting or animating any interface, audit against these non-negotiable rules:

| Never (Slop) | Always (Ayush Taste) | Why |
|---|---|---|
| Floating bob animations (`y: [-5, 5, -5]`) | Anchored cards with physical in-context interactions | Floating cards feel disconnected, gamey, and meaningless. |
| Spinning multi-colored rainbow gradients | Restrained, diffused ambient backlighting (`opacity-25` to `opacity-35`, `blur-xl`) | Gradients should provide atmospheric depth, not visual noise. |
| Cartoony bouncy scales (`scale(0) → 1.2 → 1`) | Subtle spring settling (`[0.95, 1.03, 1]` or Apple spring `{ duration: 0.5, bounce: 0.15 }`) | Micro-UIs must feel like precision software, not mobile games. |
| Instant teleporting text / state changes | Character-by-character fluid morphing via `TextMorph` from `torph/react` | Smooth state transitions maintain visual continuity. |
| Static generic stock art / icons | Living, staged micro-UIs demonstrating real product mechanics | Visitors should witness the product working before their eyes. |
| Ungated motion | Full `prefers-reduced-motion` and `@media (hover: hover)` gating | Respect accessibility and avoid false hover triggers on touch. |

---

## 1. The Blueprint Canvas & Atmospheric Lighting Engine

Every feature card and illustration stage exists on an architectural blueprint foundation:

### A. The Blueprint Grid Canvas
```tsx
{/* Container Frame */}
<div className="relative flex h-[200px] w-full select-none items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px] md:w-[373px]">
  {/* Architectural Grid with Radial Vignette */}
  <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />
</div>
```

### B. Ambient Atmosphere (`GlowEffect`)
Behind every active card or stage rests an atmospheric ambient glow using `GlowEffect` in `mode="breathe"` (`blur="stronger"`, `scale={1.2}`, `opacity-30`):

```tsx
<div className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-48 -translate-x-1/2 -translate-y-1/2 opacity-30 transition-opacity duration-700">
  <GlowEffect
    colors={
      isResolved
        ? ["#10b981", "#06b6d4", "#3b82f6", "#10b981"] // Emerald / Cyan triumph
        : ["#38bdf8", "#818cf8", "#3b82f6", "#38bdf8"] // Sky / Indigo focus
    }
    mode="breathe"
    blur="stronger"
    duration={6}
    scale={1.2}
  />
</div>
```

**Atmospheric Palette Rules:**
* **Drafting / In-Review / Escrow**: Sky & Indigo (`#38bdf8`, `#818cf8`, `#3b82f6`).
* **AI Analysis / Scope Guard**: Electric Blue & Cyan (`#0284c7`, `#06b6d4`, `#3b82f6`).
* **Signed / Sealed / Payment Verified**: Emerald & Cyan (`#10b981`, `#06b6d4`, `#3b82f6`).

---

## 2. Living Micro-Illustration Archetypes

Every illustration tells an authentic product story through one of four proven archetypes:

### Archetype 1: The E-Signature & Hand-Inked Document
A client agreement where deliverables are verified, a client cursor glides in, executes tactile mouse-down, and writes a cursive ink stroke across the signature line in real-time.
* **Cursor Motion**: Enters from `(x: 40, y: 20)` to start of line `(x: 2, y: 11)` using `--ease-out` `[0.23, 1, 0.32, 1]` in 550ms.
* **Tactile Click**: Scales to `0.82` for 120ms.
* **Inking**: SVG signature path animates `pathLength: 0 → 1` over 750ms with `[0.32, 0.72, 0, 1]`, while the cursor sweeps concurrently to `(x: 44, y: 4)`.
* **Resolution**: Cursor lifts (`scale: 1, opacity: 0`), top badge morphs to `"Signed"` (emerald), bottom pill morphs to `"Signed · $4,500"` with spring pop.

### Archetype 2: The AI Scope Creep Scanner
A deliverable review card where client comments arrive, an AI radar beam sweeps across feedback lines, and an agreement shield locks in.
* **Feedback Stagger**: Three skeleton comment bars cascade in with staggered delays (`0.06s`).
* **AI Scan Beam**: A 24px wide gradient streak (`via-blue-400/25 blur-[2px]`) glides horizontally (`x: "-100%" → "250%"`, 850ms `easeInOut`) across the feedback bars.
* **Shield Lock-in**:
  * Outer shield contour draws via SVG `pathLength: 0.4 → 1` (350ms, `[0.23, 1, 0.32, 1]`).
  * Internal checkmark strikes into place (`pathLength: 0 → 1`, 280ms).
  * Scope pill morphs from `"Checking agreement..."` to `"Scope: within agreement"` via `TextMorph`.
  * Micro-tag `"Verified · 0 creep"` appears.

### Archetype 3: The Scalloped Ticket Receipt & Escrow Release
An invoice ticket receipt with top-edge scallops, tabular milestone amounts, and physical lock mechanics.
* **Perforated Ticket Scallops**: `radial-gradient` pattern sitting on the top edge matching background color (`#F9FAFB`).
* **Verification Check**: SVG `pathLength: 0 → 1` checkmark draws in badge, morphing text to `"Payment proof verified"`.
* **Lock Shackle Physical Spring**: The shackle of the lock icon physically pops open (`y: -3`, spring `stiffness: 450, damping: 20`), and text morphs from `"Funds held in escrow"` to `"Milestone released"`.

### Archetype 4: The Animated Vector Pulse Stream
As seen on the `/join` onboarding stage: SVG connector paths where linear gradients animate `x1, y1, x2, y2` vectors along normalized directions, transmitting energy pulses from source nodes into destination targets.

---

## 3. The Fluid Text Morphing Standard

Never abruptly replace status text. Always import and use `TextMorph`:

```tsx
import { TextMorph } from "torph/react";

<span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${
  isVerified
    ? "border-blue-200 bg-blue-50 text-blue-700"
    : "border-neutral-200 bg-neutral-50 text-neutral-500"
}`}>
  <TextMorph>
    {isVerified ? "Scope: within agreement" : "Checking agreement..."}
  </TextMorph>
</span>
```

---

## 4. Concentric Radii & Multi-Layer Shadow Mathematics

Outer and inner radii must strictly respect padding:
$$R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$$

* **Container Frame**: Outer `rounded-lg` + `p-[2px]` → Inner card `rounded-md` (6px) or `rounded-lg` (8px).
* **Card Depth**: Multi-layer border shadows skipping heavy muddy drop shadows:
  ```css
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.15)]
  ```

---

## 5. Micro-Typography Scale

| Role | Classes | Motion / Style |
|---|---|---|
| Card Header / Title | `text-[10px] leading-4 font-medium tracking-tight text-[#171717]` | Tight tracking, high contrast |
| Status Badge | `text-[8px] md:text-[10px] leading-3 font-medium px-1.5 py-0.5 rounded-full` | `TextMorph` transitions |
| Micro Label | `text-[7px] font-medium text-[#8f8f8f]` | Subdued metadata |
| Currency / Timestamps | `font-mono tabular-nums text-gray-900` | Prevents layout jitter during value updates |

---

## 6. Tactile Physics & Easing Tokens

* **Hover Feedback**: `whileHover={{ y: -2 }}` with spring `{ stiffness: 400, damping: 25 }`.
* **Press Feedback**: `whileTap={{ scale: 0.985 }}`.
* **Custom Easing**:
  * Strong UI Ease-Out: `[0.23, 1, 0.32, 1]`
  * Deceleration / Ink Curve: `[0.32, 0.72, 0, 1]`
  * Spring Settlement: `stiffness: 400, damping: 25` (subtle bounce, no cartoon wobble)
* **Lifecycle Hold & Seamless Reset**:
  Hold verified state for 4.2s–4.8s so viewers can comfortably read the interface. Before restarting the loop, crossfade smoothly with a 350ms soft blur (`opacity: 0.6, blur: 1px`). Never snap or pop abruptly.
* **Interactive Trigger**:
  Always add `onClick` to cards allowing users to click and immediately replay or fast-forward the interaction.
