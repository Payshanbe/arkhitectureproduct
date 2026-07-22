import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/utils/cn";

interface BrandLogoProps {
  className?: string;
  name?: string;
  variant?: "footer" | "header";
}

export function BrandLogo({
  className,
  name = BRAND_NAME,
  variant = "header",
}: BrandLogoProps) {
  return (
    <span
      aria-label={name}
      className={cn("brand-lockup", `brand-lockup--${variant}`, className)}
    >
      <span aria-hidden="true" className="brand-mark" />
      <span aria-hidden="true" className="brand-wordmark" />
    </span>
  );
}
