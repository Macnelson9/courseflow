export interface DashboardGridProps {
  children: React.ReactNode;
}

export function DashboardGrid({ children }: Readonly<DashboardGridProps>) {
  return <section className="grid gap-6 md:grid-cols-2">{children}</section>;
}
