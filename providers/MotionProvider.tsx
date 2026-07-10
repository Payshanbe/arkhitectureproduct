"use client";

import type { ReactNode } from "react";

import { GSAPProvider } from "@/providers/GSAPProvider";
import { LenisProvider } from "@/providers/LenisProvider";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <GSAPProvider>
      <LenisProvider>{children}</LenisProvider>
    </GSAPProvider>
  );
}
