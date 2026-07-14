"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/navigation/FullscreenMenu";
import { MenuButton } from "@/components/navigation/MenuButton";
import { Navigation } from "@/components/navigation/Navigation";
import type { NavigationItem } from "@/lib/constants/navigation";

interface HeaderProps {
  menuDescription?: string;
  navigationItems?: NavigationItem[];
  siteName?: string;
}

export function Header({
  menuDescription,
  navigationItems,
  siteName = "Arkhitecture",
}: HeaderProps) {
  const menuId = useId();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOverDarkHero, setIsOverDarkHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;

    const frame = window.requestAnimationFrame(() => {
      setIsMenuOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-theme='dark']");

    if (!hero) {
      const frame = window.requestAnimationFrame(() => {
        setIsOverDarkHero(false);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverDarkHero(entry?.isIntersecting ?? false);
      },
      // The header only cares about the top band of the viewport.
      { rootMargin: "0px 0px -88% 0px" },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const navTheme = isOverDarkHero ? "dark" : "light";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-header px-[var(--container-padding)] py-4 text-foreground sm:py-5">
        <div
          className={[
            "nav-shell mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between gap-6 rounded-[4px] px-4 py-3 sm:px-7 sm:py-3.5 lg:gap-12",
            hasScrolled && "nav-shell--scrolled",
          ]
            .filter(Boolean)
            .join(" ")}
          data-scrolled={hasScrolled ? "true" : "false"}
          data-nav-theme={navTheme}
        >
          <Link
            className="nav-link nav-text nav-wordmark uppercase leading-[var(--line-height-ui)] transition-colors duration-base ease-architectural-out"
            href="/"
            onClick={closeMenu}
          >
            {siteName}
          </Link>

          <Navigation
            className="hidden lg:block"
            itemClassName="nav-link nav-text"
            items={navigationItems}
          />

          <MenuButton
            className="nav-link nav-text lg:hidden"
            controlsId={menuId}
            isOpen={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
          />
        </div>
      </header>

      <FullscreenMenu
        description={menuDescription}
        id={menuId}
        isOpen={isMenuOpen}
        items={navigationItems}
        onClose={closeMenu}
        siteName={siteName}
      />
    </>
  );
}
