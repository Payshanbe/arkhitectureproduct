"use client";

import { useEffect, useRef } from "react";

import { initGSAP } from "@/animations/gsap";
import { menuReveal } from "@/animations/menuReveal";
import { Navigation } from "@/components/navigation/Navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavigationItem } from "@/lib/constants/navigation";
import { cn } from "@/utils/cn";

interface FullscreenMenuProps {
  description?: string;
  id: string;
  isOpen: boolean;
  items?: NavigationItem[];
  onClose: () => void;
  siteName?: string;
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

export function FullscreenMenu({
  description = "A quiet path through selected work, studio thinking, and contact.",
  id,
  isOpen,
  items,
  onClose,
  siteName = "Arkhitecture",
}: FullscreenMenuProps) {
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
        className="nav-panel relative min-h-svh px-[var(--container-padding)] py-5 text-foreground sm:py-6"
        ref={panelRef}
        role="dialog"
      >
        <div className="flex min-h-[calc(100svh-48px)] flex-col justify-between gap-16">
          <div className="nav-menu-topbar flex items-center justify-between rounded-[4px] px-4 py-3 sm:px-7 sm:py-3.5">
            <p className="type-label text-foreground-muted">
              Navigation
            </p>
            <button
              className="nav-link nav-text min-h-11 uppercase leading-[var(--line-height-ui)] transition-colors duration-base ease-architectural-out"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <div ref={navigationRef}>
            <Navigation
              items={items}
              label="Fullscreen navigation"
              onNavigate={onClose}
              variant="menu"
            />
          </div>

          <div
            className="grid gap-6 border-t border-border pt-6 text-[length:var(--font-size-ui)] leading-[var(--line-height-body)] text-foreground-secondary sm:grid-cols-2"
            ref={supportingRef}
          >
            <p className="max-w-[var(--text-width)]">
              {description}
            </p>
            <p className="text-left uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground-muted sm:text-right">
              {siteName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
