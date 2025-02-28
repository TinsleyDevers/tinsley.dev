// components/SpaceBackground.tsx
"use client";

import React, { useEffect, useState } from "react";

const starColors = ["#ffffff", "#ffe5b4", "#ffd9e8", "#d4f4fa"];
const crossColors = ["#ffffff", "#ffcdf3", "#c9ecff", "#fff0b3"];

interface Star {
  top: number;
  left: number;
  size: number;
  twinkleDelay: number;
  color: string;
}

interface CrossStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  scale: number;
  color: string;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
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
  const starCount = 160;
  const crossStarCount = 12;
  const cloudCount = 6;

  const [stars, setStars] = useState<Star[]>([]);
  const [crossStars, setCrossStars] = useState<CrossStar[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [shootingStarId, setShootingStarId] = useState(0);
  const [clouds, setClouds] = useState<Cloud[]>([]);

  const randRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    // main stars
    const baseStars: Star[] = Array.from({ length: starCount }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: randRange(1, 2.2),
      twinkleDelay: Math.random() * 5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // looping
    const duplicatedStars: Star[] = baseStars.map((s) => ({
      ...s,
      left: s.left + 100,
    }));

    setStars([...baseStars, ...duplicatedStars]);

    // cross sparkle stars
    const baseCross: CrossStar[] = Array.from({ length: crossStarCount }).map(
      (_, idx) => ({
        id: idx,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5, // random delay
        scale: randRange(0.5, 1.2), // scale between 0.5 and 1.2
        color: crossColors[Math.floor(Math.random() * crossColors.length)],
      })
    );

    // Duplicate cross stars
    const duplicatedCross: CrossStar[] = baseCross.map((c) => ({
      ...c,
      id: c.id + crossStarCount,
      left: c.left + 100,
    }));

    setCrossStars([...baseCross, ...duplicatedCross]);

    // Generate clouds
    const baseClouds: Cloud[] = Array.from({ length: cloudCount }).map(
      (_, idx) => ({
        id: idx,
        top: Math.random() * 80,
        left: Math.random() * 100,
        width: randRange(150, 350),
        height: randRange(50, 130),
        opacity: randRange(0.07, 0.15),
      })
    );

    // Duplicate clouds
    const duplicatedClouds: Cloud[] = baseClouds.map((cl) => ({
      ...cl,
      id: cl.id + cloudCount,
      left: cl.left + 100,
    }));

    setClouds([...baseClouds, ...duplicatedClouds]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      spawnShootingStar();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const spawnShootingStar = () => {
    setShootingStarId((prev) => prev + 1);
    const newStar: ShootingStar = {
      id: shootingStarId,
      top: Math.random() * 70,
      left: Math.random() * 80,
    };
    setShootingStars((prev) => [...prev, newStar]);

    // Remove it after animation (2s)
    setTimeout(() => {
      setShootingStars((prevStars) =>
        prevStars.filter((star) => star.id !== newStar.id)
      );
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #0a0d1c, #1d2c51 40%, #5b6187 100%)",
      }}
    >
      {/* STAR + CROSS-STAR SCROLLER */}
      <div className="absolute top-0 left-0 h-full w-[200%] animate-loopStars">
        {stars.map((star, idx) => (
          <div
            key={`star-${idx}`}
            className="absolute rounded-full twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}

        {crossStars.map((c) => (
          <div
            key={`cross-${c.id}`}
            className="cross-star"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              transform: `rotate(45deg) translate(-50%, -50%) scale(${c.scale})`,
              filter: `drop-shadow(0 0 2px ${c.color})`,
            }}
          ></div>
        ))}

        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animation: "shootingStar 2s linear forwards",
            }}
          />
        ))}
      </div>

      {/* CLOUD SCROLLER */}
      <div className="absolute top-0 left-0 h-full w-[200%] pointer-events-none animate-loopClouds">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
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
    </div>
  );
}
