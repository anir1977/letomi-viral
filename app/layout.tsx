import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CurioSpark - Short Facts. Big Curiosity.",
  description: "Discover fascinating facts about psychology, science, human behavior, and life. Feed your curiosity with bite-sized knowledge.",
  keywords: "facts, curiosities, psychology, science, human behavior, life facts, knowledge",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: "CurioSpark - Fascinating Facts & Surprising Truths",
    description: "Discover mind-blowing facts backed by science. Psychology, history, nature & human behavior explained.",
    url: "https://www.curiospark.org",
    siteName: "CurioSpark",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CurioSpark - Fascinating Facts & Surprising Truths",
    description: "Discover mind-blowing facts backed by science",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
