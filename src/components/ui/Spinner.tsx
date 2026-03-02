import { cn } from "@/lib/utils/cn";

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: Readonly<SpinnerProps>) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent", className)}
    />
  );
}
