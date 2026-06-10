import type { Metadata } from "next";
import { EB_Garamond, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Alihan Padros Karakuş — Mukkadim",
  description:
    "Felsefe, ilahiyat, CS ve mitoloji üzerine yazılar. Alihan Padros Karakuş'un kişisel blogu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${garamond.variable} ${cinzel.variable} ${jetbrains.variable}`}>
      <body>
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none fixed -top-[200px] -right-[200px] z-0 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[780px] px-8 max-sm:px-5">
          {children}
          <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10 pb-16 font-mono text-[0.7rem] tracking-[0.08em] text-muted">
            <span>padrosum@disroot.org</span>
            <span>
              © Alihan Padros Karakuş —{" "}
              <a
                href="http://www.mustakildergi.com"
                target="_blank"
                rel="noopener"
                className="text-gold-dim hover:text-gold"
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
