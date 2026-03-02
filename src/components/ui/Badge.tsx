import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "active" | "success" | "warning" | "destructive" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface text-foreground border-border",
  active: "bg-primary text-inverse-fg border-primary",
  success: "bg-foreground text-inverse-fg border-foreground",
  warning: "bg-secondary text-foreground border-border",
  destructive: "bg-foreground text-inverse-fg border-foreground",
  outline: "bg-transparent text-foreground border-border",
};

export function Badge({ className, variant = "default", ...props }: Readonly<BadgeProps>) {
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center rounded-badge border px-3 py-1 font-mono text-caption uppercase tracking-[0.1em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
