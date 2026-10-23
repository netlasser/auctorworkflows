import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Optional index shown ahead of the mono label, e.g. "03". */
  index?: string;
  /** Small mono eyebrow label. */
  label: string;
  /** Section title. */
  title: ReactNode;
  /** Optional supporting line under the title. */
  description?: ReactNode;
  /** Optional right-aligned slot (controls, toggles, meta). */
  action?: ReactNode;
  align?: "left" | "center";
  /** "band" renders a more compact centered header for trust strips. */
  size?: "section" | "band";
  /** Full-width hairline above the header. */
  divider?: boolean;
  className?: string;
}

const SectionHeader = ({
  index,
  label,
  title,
  description,
  action,
  align = "left",
  size = "section",
  divider = true,
  className,
}: SectionHeaderProps) => {
  const centered = align === "center";
  const band = size === "band";

  return (
    <div
      className={cn(
        "relative",
        divider && "border-t border-border pt-8 lg:pt-10",
        centered && "text-center",
        className
      )}
    >
      {index && !action && (
        <span
          aria-hidden
          className="ghost-index pointer-events-none absolute -top-4 right-0 hidden select-none font-heading text-[6.5rem] font-semibold leading-none tracking-[-0.08em] lg:block"
        >
          {index}
        </span>
      )}

      <div
        className={cn(
          "flex flex-col gap-5",
          centered ? "items-center" : "md:flex-row md:items-end md:justify-between"
        )}
      >
        <span className={cn("section-label", centered && "justify-center")}>
          {index && (
            <>
              <span className="text-muted-ink">{index}</span>
              <span aria-hidden className="h-px w-8 bg-border" />
            </>
          )}
          <span>{label}</span>
        </span>

        {action && <div className={cn(!centered && "shrink-0")}>{action}</div>}
      </div>

      <h2
        className={cn(
          "mt-6 font-heading font-semibold text-balance text-foreground",
          band
            ? "text-[clamp(1.45rem,2.6vw,2rem)] leading-[1.15]"
            : "text-[clamp(2.15rem,4.4vw,3.7rem)] leading-[0.98]",
          centered ? "mx-auto max-w-3xl" : "max-w-3xl"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-5 leading-relaxed text-dim",
            band ? "text-sm sm:text-[0.95rem]" : "text-[15px] sm:text-base",
            centered ? "mx-auto max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
