

## Plan: Replace Work Section with 3D Case Studies Carousel

### What Changes

**Replace `src/components/Work.tsx`** entirely with a new premium 3D carousel case studies section featuring:

1. **Header** — Centered with cyan "Selected Work" eyebrow, gradient "Case Studies" heading, and subtitle
2. **3D Carousel** — Horizontal draggable/scrollable track with perspective and scroll-snap
3. **4 Case Study Cards** (380×640px) with:
   - Visual area (45%) with gradient overlay, floating badge that slides in on hover
   - Content area (55%) with industry tag, title, description, animated stat counters, tech pills, and CTA button
   - 3D tilt effect on hover (rotateX/Y via mouse tracking, cyan glow border)
   - Shine sweep animation on image
   - Staggered tech pill fade-in on hover
4. **Navigation** — Arrow buttons + dot indicators below the carousel
5. **Stat counters** — Numbers count up from 0 when card enters viewport (2s easeOut)

### Technical Approach

- Use `framer-motion` for animations (already installed)
- Use `useRef` + mouse event handlers for 3D tilt calculation
- Use `useRef` + scroll events for horizontal drag with momentum
- Use `useInView` from framer-motion + `useEffect`/`useState` for counting animation
- Use CSS `perspective`, `transform-style: preserve-3d`, `rotateX/Y` for 3D effects
- Inline styles for dynamic tilt transforms; Tailwind for layout/colors
- Remove old case study image imports (no longer needed — cards use gradient backgrounds instead)
- Add custom CSS for shine sweep keyframe animation in `index.css`

### Cards Data

4 cards as specified: Mereb Technologies, Chapa, Acuity Analytics, Laven — each with tag, title, description, 3 stats, 3 tech pills, and a badge.

### Files Modified

1. **`src/components/Work.tsx`** — Full rewrite
2. **`src/index.css`** — Add shine sweep keyframe and any supporting styles

