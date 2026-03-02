import { Avatar } from "@/components/ui/Avatar";

export interface TopbarProps {
  title: string;
  subtitle?: string | undefined;
  rightSlot?: React.ReactNode | undefined;
}

export function Topbar({ title, subtitle, rightSlot }: Readonly<TopbarProps>) {
  return (
    <header className="flex min-h-[200px] flex-wrap items-end justify-between gap-6 bg-primary px-6 py-10 text-inverse-fg md:px-14 md:py-12">
      <div>
        <h1 className="text-[clamp(42px,5.5vw,64px)] leading-[0.95] tracking-[-2px] text-inverse-fg">{title}</h1>
        {subtitle ? <p className="mt-2 font-mono text-caption tracking-[0.08em] text-muted-2">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">{rightSlot ?? <Avatar initials="AD" className="border-background bg-background text-foreground" />}</div>
    </header>
  );
}
