import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/logo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Alihan Padros Karakuş — Mukkadim",
  description:
    "Felsefe, ilahiyat, CS ve mitoloji üzerine yazılar. Alihan Padros Karakuş'un kişisel blogu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        {/* Kırmızı ışık hâlesi */}
        <div
          aria-hidden
          className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[520px] w-[720px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(229,72,77,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-[42rem] px-6 max-sm:px-5">
          <nav className="flex items-center gap-3 pt-8">
            <Link href="/" aria-label="Ana sayfa" className="transition-transform hover:scale-105">
              <Logo size={34} />
            </Link>
            <Link
              href="/"
              className="font-semibold tracking-tight text-accent"
            >
              Mukkadim
            </Link>
          </nav>
          {children}
          <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t pt-8 pb-16 font-mono text-[0.72rem] text-muted">
            <span>padrosum@disroot.org</span>
            <span>
              © Alihan Padros Karakuş —{" "}
              <a
                href="http://www.mustakildergi.com"
                target="_blank"
                rel="noopener"
                className="text-accent underline decoration-faint underline-offset-3 hover:decoration-accent"
              >
                Mustakil Dergi
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
