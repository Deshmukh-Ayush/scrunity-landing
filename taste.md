# Scrunity — Acquired Taste Profile
Generated via Ayush Taste Engine.

## 1. Color Palette & Canvas Foundation
- Page Background:      bg-gray-50 (#F9FAFB)
- Card Canvas:          bg-white (#FFFFFF)
- Structural Borders:   border-gray-200 (#E5E7EB) / border-[#eaeaea]
- Primary Text:         text-[#171717] / text-neutral-900
- Secondary Text:       text-[#4d4d4d] / text-neutral-500
- Micro Text / Labels:  text-[#8f8f8f] / text-neutral-400
- Primary Accent:       oklch(0.703 0.16 239.5) / #2563EB (Electric Blue)
- Success State:        #10B981 / #15803D (Emerald)
- Warning / Revision:   #F59E0B / #B45309 (Amber)

## 2. Concentric Radii Mathematics
Formula: R_inner = R_outer - Padding
- Outer Frame:          rounded-lg (8px) or rounded-[10px] with p-[2px]
- Inner Card:           rounded-md (6px) or rounded-lg (8px)
- Badges & Buttons:     rounded-full (pill)

## 3. Elevation & Multi-Layer Shadows
- Card Default:         shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]
- Lifted / Ticket:      shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.15)]

## 4. Typography Scale
- Card Header:          text-[10px] font-medium tracking-[-0.01em] text-[#171717]
- Status Badge:         text-[8px] md:text-[10px] font-medium px-1.5 py-0.5 rounded-full
- Micro Label:          text-[7px] font-medium text-[#8f8f8f]
- Numbers & Currencies: font-mono tabular-nums text-gray-900

## 5. Motion Physics & Easing
- Spring Physics:       stiffness: 400, damping: 25 (Apple duration 0.5s, bounce 0.15)
- UI Ease-Out:          cubic-bezier(0.23, 1, 0.32, 1)
- Handwriting Curve:    cubic-bezier(0.32, 0.72, 0, 1)
- Reading Hold:         4.2s–4.8s before soft 350ms blur-crossfade loop
- Button Press:         whileTap={{ scale: 0.985 }}
- Card Hover:           whileHover={{ y: -2 }}

## 6. Living Archetypes Implemented
1. Proposal E-Signature Inking (`src/components/how-it-works/card-1.tsx`)
2. Deliverable Review & AI Scope Creep Shield (`src/components/how-it-works/card-2.tsx`)
3. Scalloped Milestone Invoice & Escrow Lock (`src/components/how-it-works/card-3.tsx`)
4. Dropped Contract Morphing into Live Dashboard (`src/components/features-one/illustration1.tsx`)
5. 3D Stacked Card Task Queue with Error Shake (`src/components/features-one/illustration2.tsx`)
6. Cursor Approval Morphing into Itemized Invoice (`src/components/features-one/illustration3.tsx`)
7. Split Blueprint Stage with Conic Glow & Pulse Vectors (`src/components/join/illustration.tsx`)
