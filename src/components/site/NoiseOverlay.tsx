const NoiseOverlay = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.05] mix-blend-soft-light"
  >
    <filter id="aw-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.8"
        numOctaves="4"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#aw-noise)" />
  </svg>
);

export default NoiseOverlay;
