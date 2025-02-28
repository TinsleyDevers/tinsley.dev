// app/layout.tsx
import "../styles/globals.css";
import SpaceBackground from "../components/SpaceBackground";
import MainContent from "../components/MainContent";
import EasterEggs from "../components/EasterEggs";

export const metadata = {
  title: "{tinsley.dev}",
  description: "My personal portfolio!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white scroll-smooth">
        <EasterEggs />
        <SpaceBackground />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
