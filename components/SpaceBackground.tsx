// components/SpaceBackground.tsx.
"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  twinkleDelay: number;
  color: string;
  depth: number;
}

interface CrossStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  scale: number;
  color: string;
  depth: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface Nebula {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
}

interface Cloud {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}

export default function SpaceBackground() {
  const starCount = 100;
  const crossStarCount = 15;
  const nebulaCount = 4;
  const cloudCount = 6;

  const [stars, setStars] = useState<Star[]>([]);
  const [crossStars, setCrossStars] = useState<CrossStar[]>([]);
  const [nebulas, setNebulas] = useState<Nebula[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const starColors = useMemo(
    () => ["#ffffff", "#ffe5b4", "#ffd9e8", "#d4f4fa", "#e0c3fc"],
    []
  );
  const crossColors = useMemo(
    () => ["#ffffff", "#ffcdf3", "#c9ecff", "#fff0b3", "#e0c3fc"],
    []
  );
  const nebulaColors = useMemo(
    () => [
      "rgba(111, 66, 193, 0.15)",
      "rgba(219, 39, 119, 0.12)",
      "rgba(59, 130, 246, 0.1)",
      "rgba(16, 185, 129, 0.08)",
    ],
    []
  );

  const randRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    const baseStars: Star[] = Array.from({ length: starCount }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: randRange(1, 2.5),
      twinkleDelay: Math.random() * 5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      depth: Math.floor(Math.random() * 3),
    }));
    const duplicatedStars: Star[] = baseStars.map((s) => ({
      ...s,
      left: s.left + 100,
    }));
    setStars([...baseStars, ...duplicatedStars]);

    const baseCross: CrossStar[] = Array.from({ length: crossStarCount }).map(
      (_, idx) => ({
        id: idx,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        scale: randRange(0.5, 1.2),
        color: crossColors[Math.floor(Math.random() * crossColors.length)],
        depth: Math.floor(Math.random() * 3),
      })
    );
    const duplicatedCross: CrossStar[] = baseCross.map((c) => ({
      ...c,
      id: c.id + crossStarCount,
      left: c.left + 100,
    }));
    setCrossStars([...baseCross, ...duplicatedCross]);

    const baseNebulas: Nebula[] = Array.from({ length: nebulaCount }).map(
      (_, idx) => ({
        id: idx,
        top: randRange(10, 90),
        left: randRange(0, 100),
        width: randRange(200, 500),
        height: randRange(150, 350),
        rotation: randRange(-30, 30),
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
      })
    );
    const duplicatedNebulas: Nebula[] = baseNebulas.map((n) => ({
      ...n,
      id: n.id + nebulaCount,
      left: n.left + 100,
    }));
    setNebulas([...baseNebulas, ...duplicatedNebulas]);

    const baseClouds: Cloud[] = Array.from({ length: cloudCount }).map(
      (_, idx) => ({
        id: idx,
        top: Math.random() * 90,
        left: Math.random() * 100,
        width: randRange(150, 350),
        height: randRange(50, 130),
        opacity: randRange(0.05, 0.12),
      })
    );
    const duplicatedClouds: Cloud[] = baseClouds.map((cl) => ({
      ...cl,
      id: cl.id + cloudCount,
      left: cl.left + 100,
    }));
    setClouds([...baseClouds, ...duplicatedClouds]);
  }, [
    starCount,
    crossStarCount,
    nebulaCount,
    cloudCount,
    starColors,
    crossColors,
    nebulaColors,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const spawnShootingStar = useCallback(() => {
    const id = Date.now();
    const newStar: ShootingStar = {
      id,
      top: Math.random() * 60,
      left: Math.random() * 80,
      size: randRange(1.5, 3),
      duration: randRange(1.5, 3),
      delay: 0,
    };
    setShootingStars((prevStars) => [...prevStars, newStar]);
    setTimeout(() => {
      setShootingStars((prevStars) =>
        prevStars.filter((star) => star.id !== id)
      );
    }, newStar.duration * 1000 + 200);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(spawnShootingStar, 2000);
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const burstCount = Math.floor(randRange(2, 4));
        for (let i = 0; i < burstCount; i++) {
          setTimeout(spawnShootingStar, i * 300);
        }
      } else {
        spawnShootingStar();
      }
    }, 7000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [spawnShootingStar]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #070b19, #0e1b38 40%, #1a2b4a 80%, #2c3359 100%)",
      }}
    >
      {/* Nebulas */}
      <div
        className="absolute top-0 left-0 h-full w-[200%] animate-loopNebulas"
        style={{
          transform: `translateX(${mousePosition.x * -10}px) translateY(${
            mousePosition.y * -10
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {nebulas.map((nebula) => (
          <div
            key={`nebula-${nebula.id}`}
            className="absolute bg-blend-screen"
            style={{
              top: `${nebula.top}%`,
              left: `${nebula.left}%`,
              width: `${nebula.width}px`,
              height: `${nebula.height}px`,
              background: nebula.color,
              borderRadius: "50%",
              filter: "blur(60px)",
              transform: `rotate(${nebula.rotation}deg) translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      {/* Distant stars (depth=2) */}
      <div
        className="absolute top-0 left-0 h-full w-[200%] animate-loopDistantStars"
        style={{
          transform: `translateX(${mousePosition.x * -4}px) translateY(${
            mousePosition.y * -4
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {stars
          .filter((star) => star.depth === 2)
          .map((star, idx) => (
            <div
              key={`distant-star-${idx}`}
              className="absolute rounded-full twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size * 0.6}px`,
                height: `${star.size * 0.6}px`,
                backgroundColor: star.color,
                opacity: 0.6,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: "4s",
              }}
            />
          ))}
      </div>

      {/* Mid distance stars (depth=1) */}
      <div
        className="absolute top-0 left-0 h-full w-[200%] animate-loopStars"
        style={{
          transform: `translateX(${mousePosition.x * -8}px) translateY(${
            mousePosition.y * -8
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {stars
          .filter((star) => star.depth === 1)
          .map((star, idx) => (
            <div
              key={`mid-star-${idx}`}
              className="absolute rounded-full twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size * 0.8}px`,
                height: `${star.size * 0.8}px`,
                backgroundColor: star.color,
                opacity: 0.8,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: "3.5s",
              }}
            />
          ))}

        {crossStars
          .filter((c) => c.depth === 1)
          .map((c) => (
            <div
              key={`mid-cross-${c.id}`}
              className="cross-star"
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                transform: `rotate(45deg) translate(-50%, -50%) scale(${
                  c.scale * 0.8
                })`,
                filter: `drop-shadow(0 0 2px ${c.color})`,
                opacity: 0.8,
              }}
            />
          ))}
      </div>

      {/* Close stars (depth=0) */}
      <div
        className="absolute top-0 left-0 h-full w-[200%] animate-loopStars"
        style={{
          transform: `translateX(${mousePosition.x * -15}px) translateY(${
            mousePosition.y * -15
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {stars
          .filter((star) => star.depth === 0)
          .map((star, idx) => (
            <div
              key={`close-star-${idx}`}
              className="absolute rounded-full twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: "3s",
                boxShadow: `0 0 ${star.size * 0.7}px ${star.color}`,
              }}
            />
          ))}

        {crossStars
          .filter((c) => c.depth === 0)
          .map((c) => (
            <div
              key={`close-cross-${c.id}`}
              className="cross-star"
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                transform: `rotate(45deg) translate(-50%, -50%) scale(${c.scale})`,
                filter: `drop-shadow(0 0 3px ${c.color})`,
              }}
            />
          ))}

        {/* Shooting stars */}
        {shootingStars.map((s) => (
          <div
            key={`shooting-star-${s.id}`}
            className="absolute"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.8)",
              animation: `shootingStar ${s.duration}s linear forwards`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <div
              className="absolute top-0 right-0 transform translate-x-full"
              style={{
                width: `${s.size * 20}px`,
                height: `${s.size}px`,
                background:
                  "linear-gradient(to left, transparent, rgba(255, 255, 255, 0.8))",
                borderRadius: "0 50% 50% 0",
                transformOrigin: "left center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Cloud scroller */}
      <div className="absolute top-0 left-0 h-full w-[200%] pointer-events-none animate-loopClouds">
        {clouds.map((cloud) => (
          <div
            key={`cloud-${cloud.id}`}
            className="absolute bg-white"
            style={{
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              width: `${cloud.width}px`,
              height: `${cloud.height}px`,
              opacity: cloud.opacity,
              borderRadius: "50%",
              filter: "blur(30px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  );
}
