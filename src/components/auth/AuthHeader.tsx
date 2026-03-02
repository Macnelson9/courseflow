export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  adminLabel?: string;
}

export function AuthHeader({ title, subtitle, adminLabel }: Readonly<AuthHeaderProps>) {
  return (
    <header className="space-y-3 text-center">
      {adminLabel ? <p className="font-mono text-caption uppercase tracking-[0.1em] text-muted">{adminLabel}</p> : null}
      <p className="font-mono text-label uppercase tracking-[0.12em] text-muted">CourseFlow</p>
      <h1 className="text-h2 text-foreground">{title}</h1>
      {subtitle ? <p className="font-mono text-body text-muted">{subtitle}</p> : null}
    </header>
  );
}
