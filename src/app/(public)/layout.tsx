import Link from "next/link";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-black bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="font-data text-label uppercase tracking-[0.12em]">
            CourseFlow
          </Link>
          <nav className="flex flex-wrap items-center gap-2 font-data text-caption uppercase">
            <Link
              href="/apply"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white bg-black px-4 font-mono text-caption uppercase tracking-[0.08em] text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Apply
            </Link>
            <Link
              href="/login?role=student"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white bg-black px-4 font-mono text-caption uppercase tracking-[0.08em] text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Student Login
            </Link>
            <Link
              href="/login?role=admin"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white bg-black px-4 font-mono text-caption uppercase tracking-[0.08em] text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-12">
        {children}
      </main>
      <footer className="border-t border-black bg-black px-4 py-6 text-center font-data text-caption text-white md:px-8">
        CourseFlow
      </footer>
    </div>
  );
}
