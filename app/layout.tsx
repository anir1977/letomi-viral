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
  title: "CurioSpark - Clear Curiosity, Carefully Explained",
  description: SITE_DESCRIPTION,
  keywords: "curiosity articles, psychology, technology, health, science, nature, everyday knowledge",
  alternates: {
    canonical: SITE_URL,
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
    title: "CurioSpark - Clear Curiosity, Carefully Explained",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "CurioSpark - Clear Curiosity, Carefully Explained",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CurioSpark - Clear Curiosity, Carefully Explained",
    description: SITE_DESCRIPTION,
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseScriptEnabled =
    process.env.NEXT_PUBLIC_ADSENSE_SITE_VERIFICATION === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://curiospark.org" />
        <meta name="robots" content="index, follow" />
        {adsenseScriptEnabled && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9750203778031302"
            crossOrigin="anonymous"
          />
        )}
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
