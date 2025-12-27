import { useEffect, useState } from "react";
import { useTimeEvolution } from "@/hooks/use-time-evolution";

interface Glow {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  initialPhase: number;
}

interface StageGlowsProps {
  isVisible: boolean;
  count?: number;
}

const StageGlows = ({ isVisible, count = 8 }: StageGlowsProps) => {
  const [glows, setGlows] = useState<Glow[]>([]);
  const timeEvolution = useTimeEvolution();

  useEffect(() => {
    if (isVisible) {
      const newGlows: Glow[] = [];
      for (let i = 0; i < count; i++) {
        const seed = i * 1000;
        const random = (seed: number) => {
          const x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        };

        newGlows.push({
          id: i,
          x: random(seed + 1) * 100,
          y: random(seed + 2) * 100,
          size: random(seed + 3) * 60 + 40, // 40-100px
          opacity: random(seed + 4) * 0.15 + 0.05, // Very subtle, 0.05-0.2
          speed: random(seed + 5) * 0.3 + 0.2, // Very slow
          initialPhase: random(seed + 6) * Math.PI * 2,
        });
      }
      setGlows(newGlows);
    }
  }, [isVisible, count]);

  if (!isVisible || glows.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {glows.map((glow) => {
        // Very slow, gentle drift
        const driftX = Math.sin(timeEvolution.phase * glow.speed + glow.initialPhase) * 15;
        const driftY = Math.cos(timeEvolution.phase * glow.speed * 0.7 + glow.initialPhase) * 15;
        
        // Subtle opacity pulse
        const pulseOpacity = glow.opacity + Math.sin(timeEvolution.phase * 0.5 + glow.initialPhase) * 0.03;

        return (
          <div
            key={glow.id}
            className="absolute rounded-full blur-xl"
            style={{
              left: `${glow.x + driftX}%`,
              top: `${glow.y + driftY}%`,
              width: `${glow.size}px`,
              height: `${glow.size}px`,
              opacity: pulseOpacity,
              background: `radial-gradient(circle, hsl(350 60% 90% / 0.4), transparent 70%)`,
              transform: `translate(-50%, -50%)`,
              transition: "opacity 2s ease-in-out, transform 3s ease-in-out",
            }}
          />
        );
      })}
    </div>
  );
};

export default StageGlows;

