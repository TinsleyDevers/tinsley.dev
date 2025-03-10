// app/layout.tsx
import "../styles/globals.css";
import SpaceBackground from "../components/SpaceBackground";
import MainContent from "../components/MainContent";
import EasterEggs from "../components/EasterEggs";

export const metadata = {
  title: "{tinsley.dev}",
  description: "My personal portfolio!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          href="/path/to/critical-image.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="text-white scroll-smooth">
        <EasterEggs />
        <SpaceBackground />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
