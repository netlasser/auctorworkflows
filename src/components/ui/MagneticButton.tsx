import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
}

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  rel,
  ariaLabel,
  strength = 0.28,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength * 0.7,
      scale: 1.03,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.55, ease: "power3.out" });
  };

  const classes = [
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-wide",
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : "border border-border text-foreground",
    className,
  ].join(" ");

  const inner = (
    <>
      <span
        className={`ease-cinematic absolute inset-0 translate-y-full rounded-full transition-transform duration-500 group-hover:translate-y-0 ${
          variant === "primary" ? "bg-[hsl(var(--primary-light))]" : "bg-[hsl(var(--card-hover))]"
        }`}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as never}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as never}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
    >
      {inner}
    </button>
  );
};

export default MagneticButton;
