"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/navigation/FullscreenMenu";
import { MenuButton } from "@/components/navigation/MenuButton";
import { Navigation } from "@/components/navigation/Navigation";

export function Header() {
  const menuId = useId();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
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

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-header px-[var(--container-padding)] py-6 text-foreground">
        <div className="flex items-center justify-between gap-8">
          <Link
            className="text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
            href="/"
            onClick={closeMenu}
          >
            Arkhitecture
          </Link>

          <Navigation className="hidden lg:block" />

          <MenuButton
            className="lg:hidden"
            controlsId={menuId}
            isOpen={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
          />
        </div>
      </header>

      <FullscreenMenu id={menuId} isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
