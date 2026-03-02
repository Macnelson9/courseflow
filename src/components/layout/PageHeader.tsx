import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, action, breadcrumb }: Readonly<PageHeaderProps>) {
  return (
    <header className="space-y-3">
      {breadcrumb?.length ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-caption uppercase tracking-[0.08em] text-muted">
            {breadcrumb.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-2 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-h1 text-foreground">{title}</h1>
          {subtitle ? <p className="mt-1 font-mono text-body text-muted">{subtitle}</p> : null}
        </div>
        {action ? <div className="w-full md:w-auto">{action}</div> : null}
      </div>
    </header>
  );
}
