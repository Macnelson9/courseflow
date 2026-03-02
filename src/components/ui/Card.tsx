import { cn } from "@/lib/utils/cn";

type CardVariant = "default" | "flat" | "bordered";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  headerTone?: "default" | "inverse";
}

const variantMap: Record<CardVariant, string> = {
  default: "bg-surface border-primary",
  flat: "bg-background border-primary",
  bordered: "bg-surface border-foreground",
};

export function Card({
  className,
  variant = "default",
  title,
  description,
  action,
  headerTone = "default",
  children,
  ...props
}: Readonly<CardProps>) {
  return (
    <section data-gsap-card="true" data-animate="fade-up" className={cn("border", variantMap[variant], className)} {...props}>
      {title || description || action ? (
        <header
          className={cn(
            "flex items-start justify-between gap-4 p-4",
            headerTone === "inverse" ? "bg-primary text-inverse-fg" : "bg-transparent text-foreground",
          )}
        >
          <div>
            {title ? (
              <h3 className={cn("text-[clamp(20px,2.3vw,28px)] font-bold tracking-[-0.5px]", headerTone === "inverse" ? "text-inverse-fg" : "text-foreground")}>
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className={cn("mt-1 font-mono text-caption uppercase tracking-[0.1em]", headerTone === "inverse" ? "text-muted-2" : "text-muted")}>
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </header>
      ) : null}
      <div className={cn("p-4", title || description || action ? "pt-0" : "")}>{children}</div>
    </section>
  );
}
