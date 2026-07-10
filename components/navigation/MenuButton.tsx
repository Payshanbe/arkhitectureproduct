"use client";

import { cn } from "@/utils/cn";

interface MenuButtonProps {
  className?: string;
  controlsId: string;
  isOpen: boolean;
  onClick: () => void;
}

export function MenuButton({ className, controlsId, isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      aria-controls={controlsId}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-none text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent",
        className,
      )}
      type="button"
      onClick={onClick}
    >
      <span className="relative h-3 w-8" aria-hidden="true">
        <span
          className={cn(
            "absolute left-0 top-0 h-px w-8 origin-center bg-current transition-transform duration-base ease-architectural-out",
            isOpen && "translate-y-[5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-8 origin-center bg-current transition-transform duration-base ease-architectural-out",
            isOpen && "-translate-y-[6px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
