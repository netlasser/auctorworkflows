

# Polish Tweaks for Felipe Workflows

A collection of small but impactful refinements to take the site from great to exceptional.

---

## 1. Smooth scroll-to-top button
Add a floating "back to top" arrow button that appears after scrolling past the hero. Fades in/out smoothly in the bottom-right corner.



## 2. Navbar active section highlight
As users scroll through sections, subtly highlight the corresponding nav link (e.g., underline or bolder text) so they always know where they are on the page.

## 3. Service cards hover effect
Add a subtle lift/shadow on hover to the service cards in the grid, making them feel more interactive and clickable.

## 4. Testimonial auto-rotate
Add an auto-advance timer (every 5 seconds) to the testimonial carousel so it cycles through quotes without user interaction. Pauses on hover.

## 5. Footer "back to top" link
Add a small "Back to top" text link in the footer for users who scroll all the way down.

## 6. Case study card hover overlay
Add a subtle overlay with a "View project" label that appears on hover over the case study images, hinting they're interactive.

---

## Technical Details

### Files to modify:
- **src/components/Navbar.tsx** -- Add scroll-spy logic using IntersectionObserver to track active section and highlight the matching nav link
- **src/components/Services.tsx** -- Add `hover:shadow-lg hover:-translate-y-1 transition-all` classes to service cards
- **src/components/Testimonials.tsx** -- Add `useEffect` with `setInterval` for auto-rotation, clear on hover
- **src/components/Work.tsx** -- Add hover overlay with "View project" text and arrow icon
- **src/components/Footer.tsx** -- Add "Back to top" button
- **src/pages/Index.tsx** -- Add a floating scroll-to-top button component with scroll position tracking

### No new dependencies required -- all changes use existing framer-motion, Lucide icons, and Tailwind utilities.

