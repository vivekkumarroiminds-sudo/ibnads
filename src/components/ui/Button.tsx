import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "brand" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-brand-fg hover:opacity-90",
  outline: "border border-border bg-transparent text-fg hover:bg-surface",
  ghost: "bg-transparent text-fg hover:bg-surface",
};

// min-h ≥ 44px on md for accessible tap targets.
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-ring disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "brand",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "brand",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  const isExternal = href.startsWith("http");
  const classes = cn(base, variants[variant], sizes[size], className);
  if (isExternal) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
