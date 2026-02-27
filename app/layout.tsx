import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Console from "./components/Console";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tinsley.dev",
  description:
    "Tinsley Devers — IT Systems & Developer turning complex problems into intuitive solutions.",
  keywords: [
    "IT",
    "systems administrator",
    "product manager",
    "developer",
    "portfolio",
    "Tinsley Devers",
    "software engineer",
    "NYC",
    "ATK.social",
  ],
  authors: [{ name: "Tinsley Devers" }],
  metadataBase: new URL("https://tinsley.dev"),
  openGraph: {
    title: "Tinsley Devers — IT Systems & Developer",
    description:
      "Turning complex problems into intuitive solutions..",
    url: "https://tinsley.dev",
    siteName: "tinsley.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinsley Devers — IT Systems & Developer",
    description:
      "Turning complex problems into intuitive solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#ffffff] text-[#171717]`}
      >
        <a href="#work" className="skip-link">
          Skip to main content
        </a>
        <Console />
        {children}
      </body>
    </html>
  );
}
