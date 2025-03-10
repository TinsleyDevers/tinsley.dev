export const detectDeviceCapabilities = () => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isLowPower: false,
      prefersReducedMotion: false,
    };
  }

  // Device detection
  const isMobile = window.innerWidth < 768;
  const isLowPower =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return {
    isMobile,
    isLowPower,
    prefersReducedMotion,
    isHighPerformance: !isMobile && !isLowPower && !prefersReducedMotion,
  };
};

// Throttle function to limit execution frequency
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
