import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "lift-hover shadow-soft bg-foreground text-background hover:opacity-90",
  secondary:
    "lift-hover border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-surface-2",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as ButtonAsButton;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
