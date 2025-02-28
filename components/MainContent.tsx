// components/MainContent.tsx
"use client";

import { useState } from "react";
import SplashScreen from "./SplashScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutGroup } from "framer-motion";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <LayoutGroup>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LayoutGroup>
  );
}
