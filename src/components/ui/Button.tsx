import { forwardRef } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-inverse-fg border-primary hover:bg-foreground",
  secondary: "bg-primary text-inverse-fg border-border hover:bg-foreground",
  ghost: "bg-primary text-inverse-fg border-border hover:bg-foreground",
  destructive: "bg-primary text-inverse-fg border-foreground hover:bg-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-3 text-caption",
  md: "h-12 px-4 text-label",
  lg: "h-14 px-6 text-label",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", loading = false, disabled, children, ...props },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={isDisabled}
      aria-busy={loading}
      disabled={isDisabled}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border font-mono uppercase tracking-[0.08em] transition duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <Spinner className="h-3.5 w-3.5" /> : null}
      <span>{children}</span>
    </button>
  );
});
