import { cn } from "@/lib/utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
}

export function Avatar({ initials, className, ...props }: Readonly<AvatarProps>) {
  return (
    <div
      className={cn("inline-flex h-12 w-12 items-center justify-center border border-border bg-surface font-mono text-body text-foreground", className)}
      aria-label={`Avatar for ${initials}`}
      {...props}
    >
      {initials}
    </div>
  );
}
