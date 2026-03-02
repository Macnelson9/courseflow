export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      {children}
    </main>
  );
}
