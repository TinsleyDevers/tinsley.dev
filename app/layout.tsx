import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Console from "./components/Console";
import MotionProvider from "./components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tinsley Devers — IT Systems & Developer",
    template: "%s — Tinsley Devers",
  },
  description:
    "Tinsley Devers — IT Systems & Developer turning complex problems into intuitive solutions.",
  authors: [{ name: "Tinsley Devers" }],
  metadataBase: new URL("https://tinsley.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tinsley Devers — IT Systems & Developer",
    description: "Turning complex problems into intuitive solutions.",
    url: "https://tinsley.dev",
    siteName: "tinsley.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinsley Devers — IT Systems & Developer",
    description: "Turning complex problems into intuitive solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tinsley Devers",
  url: "https://tinsley.dev",
  jobTitle: "IT Systems Administrator & Developer",
  email: "mailto:contact@tinsley.dev",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Baruch College (CUNY)",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Calhoun Community College",
    },
  ],
  sameAs: [
    "https://github.com/tinsleydevers",
    "https://www.linkedin.com/in/tinsley-devers/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#ffffff] text-[#171717]`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Console />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
