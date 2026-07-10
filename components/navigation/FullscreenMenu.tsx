"use client";

import { useEffect, useRef } from "react";

import { initGSAP } from "@/animations/gsap";
import { menuReveal } from "@/animations/menuReveal";
import { Navigation } from "@/components/navigation/Navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface FullscreenMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

export function FullscreenMenu({ id, isOpen, onClose }: FullscreenMenuProps) {
  const previousActiveElement = useRef<Element | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    initGSAP();

    timelineRef.current = menuReveal({
      background: backdropRef.current ?? undefined,
      items: navigationRef.current?.querySelectorAll("li") ?? undefined,
      panel: panelRef.current ?? undefined,
      reducedMotion: prefersReducedMotion,
      supporting: supportingRef.current ?? undefined,
    });

    timelineRef.current.progress(0);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) {
      return;
    }

    if (isOpen) {
      timeline.play();
      return;
    }

    timeline.reverse();
  }, [isOpen]);

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu || !isOpen) {
      return;
    }

    previousActiveElement.current = document.activeElement;
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const focusableElements = getFocusableElements(menu);
    const firstFocusable = focusableElements[0];

    window.setTimeout(() => {
      firstFocusable?.focus();
    }, prefersReducedMotion ? 0 : 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusableElements = getFocusableElements(menu);
      const firstElement = currentFocusableElements[0];
      const lastElement = currentFocusableElements[currentFocusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";

      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, prefersReducedMotion]);

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "fixed inset-0 z-overlay overflow-hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      id={id}
      ref={menuRef}
    >
      <div ref={backdropRef} className="absolute inset-0 bg-[var(--color-overlay-dark)]" />
      <div
        aria-modal="true"
        aria-label="Site navigation"
        className="relative min-h-svh bg-background px-[var(--container-padding)] py-6 text-foreground"
        ref={panelRef}
        role="dialog"
      >
        <div className="flex min-h-[calc(100svh-48px)] flex-col justify-between gap-16">
          <div className="flex items-start justify-between">
            <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
              Navigation
            </p>
            <button
              className="min-h-11 text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <div ref={navigationRef}>
            <Navigation label="Fullscreen navigation" onNavigate={onClose} variant="menu" />
          </div>

          <div
            className="grid gap-6 border-t border-border pt-6 text-[length:var(--font-size-ui)] leading-[var(--line-height-body)] text-foreground-secondary sm:grid-cols-2"
            ref={supportingRef}
          >
            <p className="max-w-[var(--text-width)]">
              A quiet path through selected work, studio thinking, and contact.
            </p>
            <p className="text-left uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground-muted sm:text-right">
              Arkhitecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
