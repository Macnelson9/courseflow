import Link from "next/link";

export interface AuthFooterProps {
  prompt: string;
  linkLabel: string;
  href: string;
}

export function AuthFooter({ prompt, linkLabel, href }: Readonly<AuthFooterProps>) {
  return (
    <footer className="text-center font-mono text-caption text-muted">
      <span>{prompt} </span>
      <Link href={href} className="underline underline-offset-2">
        {linkLabel}
      </Link>
    </footer>
  );
}
