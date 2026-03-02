import { cn } from "@/lib/utils/cn";

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: Readonly<DividerProps>) {
  return <hr className={cn("border-0 border-t border-border", className)} aria-hidden="true" />;
}
