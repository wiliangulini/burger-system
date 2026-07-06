import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-red-700 text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "border border-stone-300 text-stone-800 transition hover:border-red-700 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "rounded-lg px-4 py-2.5 text-sm font-semibold",
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} type={type} {...props} />;
}
