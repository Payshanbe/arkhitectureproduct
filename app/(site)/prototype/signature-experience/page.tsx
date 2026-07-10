import type { Metadata } from "next";

import { SignatureExperienceAnimatedPrototype } from "@/features/prototype/signature-experience/SignatureExperienceAnimatedPrototype";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  description:
    "A prototype for the Version 1.1 Studio process signature scroll experience.",
  path: "/prototype/signature-experience",
  title: "Signature Experience Prototype",
});

export default function SignatureExperiencePrototypePage() {
  return <SignatureExperienceAnimatedPrototype />;
}
