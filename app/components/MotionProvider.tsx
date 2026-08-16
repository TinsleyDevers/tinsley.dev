"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// LazyMotion + `m` components keep the full framer-motion runtime out of the
// main bundle; reducedMotion="user" honors the OS-level reduce-motion setting.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
