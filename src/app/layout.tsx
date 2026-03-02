import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "@/app/globals.css";

const sans = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CourseFlow",
  description: "Course enrollment and attendance management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${sans.variable} ${mono.variable} h-full font-primary`}>
        <a
          href="#main-content"
          className="sr-only z-[80] focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:bg-primary focus:px-3 focus:py-2 focus:font-data focus:text-inverse-fg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
