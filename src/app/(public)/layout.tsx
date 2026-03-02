import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-black bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="font-data text-label uppercase tracking-[0.12em]">
            CourseFlow
          </Link>
          <PublicNav />
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-12">
        {children}
      </main>
      <footer className="border-t border-black bg-black px-4 py-6 text-center font-data text-caption text-white md:px-8">
        CourseFlow 2026
      </footer>
    </div>
  );
}
