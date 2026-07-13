import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/tokens.css";
import "@/styles/typography.css";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Snowfox Automation",
    template: "%s | Snowfox Automation",
  },
  description:
    "Canadian-developed automation and machine learning tools for intelligence collection, processing, and compliance.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-CA" className={cn("font-sans", inter.variable)}>
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}