import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intercambio de Bienes",
  description: "Una plataforma simple para intercambiar bienes sin dinero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground md:flex-row">
        <Navbar />
        <div className="flex min-h-full flex-1 flex-col">
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
            Intercambio de Bienes — proyecto académico de trueque local, sin fines comerciales.
          </footer>
        </div>
      </body>
    </html>
  );
}
