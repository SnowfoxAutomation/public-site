import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/tokens.css";
import "@/styles/typography.css";
import "@/styles/globals.css";

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
    <html lang="en-CA">
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}