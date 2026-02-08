import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ReadingProgress from "./components/ReadingProgress";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

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
      <body className={`${manrope.variable} ${fraunces.variable} antialiased`}>
        <ReadingProgress />
        <SiteHeader />
        {children}
        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
