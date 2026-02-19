import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ReadingProgress from "./components/ReadingProgress";
import { Analytics } from "@vercel/analytics/next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CurioSpark - Short Facts. Big Curiosity.",
  description: SITE_DESCRIPTION,
  keywords: "facts, curiosities, psychology, science, human behavior, life facts, knowledge",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  // build: 2026-02-08
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
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "CurioSpark - Short Facts. Big Curiosity.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CurioSpark - Fascinating Facts & Surprising Truths",
    description: "Discover mind-blowing facts backed by science",
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9750203778031302"
          crossOrigin="anonymous"
        />
        {/* Balise canonique Next.js */}
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.origin + window.location.pathname : SITE_URL}
        />
      </head>
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
