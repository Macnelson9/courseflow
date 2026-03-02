import { Avatar } from "@/components/ui/Avatar";
import Link from "next/link";
import { Home } from "lucide-react";
import { MobileNav, type MobileNavItem } from "@/components/layout/MobileNav";

export interface TopbarProps {
  title: string;
  subtitle?: string | undefined;
  rightSlot?: React.ReactNode | undefined;
  mobileNavItems?: MobileNavItem[] | undefined;
}

export function Topbar({ title, subtitle, rightSlot, mobileNavItems }: Readonly<TopbarProps>) {
  return (
    <header className="flex min-h-[150px] flex-wrap items-end justify-between gap-4 bg-primary px-4 py-6 text-inverse-fg sm:min-h-[170px] sm:px-6 sm:py-8 md:min-h-[200px] md:px-14 md:py-12">
      <div>
        <h1 className="break-words text-[clamp(28px,7vw,64px)] leading-[0.95] tracking-[-1px] text-inverse-fg sm:tracking-[-2px]">{title}</h1>
        {subtitle ? <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.06em] text-muted-2 sm:text-caption sm:tracking-[0.08em]">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        {mobileNavItems ? <MobileNav items={mobileNavItems} /> : null}
        <Link
          href="/"
          data-gsap-button="true"
          data-no-gsap="true"
          className="stack-btn-inverse hidden min-h-11 min-w-11 items-center justify-center gap-2 border px-3 font-mono text-[10px] uppercase tracking-[0.06em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex sm:px-4 sm:text-caption sm:tracking-[0.08em]"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        {rightSlot ?? <Avatar initials="AD" className="border-background bg-background text-foreground" />}
      </div>
    </header>
  );
}
