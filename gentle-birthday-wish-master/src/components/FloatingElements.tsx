import { useEffect, useState } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  baseDuration: number;
  type: "heart" | "star" | "sparkle" | "circle";
  randomOffset: number;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();

  // Seeded random function for controlled randomness
  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    const generateElements = () => {
      const types: FloatingElement["type"][] = ["heart", "star", "sparkle", "circle"];
      const newElements: FloatingElement[] = [];
      
      for (let i = 0; i < 15; i++) {
        const seed = i * 1000;
        const randomOffset = seededRandom(seed);
        newElements.push({
          id: i,
          x: seededRandom(seed + 1) * 100,
          y: seededRandom(seed + 2) * 100,
          size: seededRandom(seed + 3) * 16 + 8,
          delay: seededRandom(seed + 4) * 5,
          baseDuration: seededRandom(seed + 5) * 4 + 6,
          type: types[Math.floor(seededRandom(seed + 6) * types.length)],
          randomOffset,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const renderElement = (element: FloatingElement) => {
    // Calculate responsive animation duration based on scroll speed
    // Slow scroll = longer duration (smoother), fast scroll = shorter duration (energetic)
    const speedMultiplier = scrollSpeed.isScrolling 
      ? Math.max(0.3, 1 - scrollSpeed.speed * 0.7) // 0.3x to 1x speed
      : 1;
    
    // Idle state: slower, more gentle movement
    const idleMultiplier = idleState.isIdle ? 0.6 : 1;
    
    // Time-based variation for continuous evolution
    const timeVariation = 1 + Math.sin(timeEvolution.phase + element.randomOffset * Math.PI * 2) * 0.1;
    
    const duration = element.baseDuration * speedMultiplier * idleMultiplier * timeVariation;
    
    // Color shift based on time evolution
    const colorShift = timeEvolution.colorShift;
    const hueShift = colorShift * 20; // Shift hue by up to 20 degrees
    
    // Position with time-based drift
    const timeDriftX = Math.sin(timeEvolution.phase * 0.5 + element.randomOffset * Math.PI) * 2;
    const timeDriftY = Math.cos(timeEvolution.phase * 0.3 + element.randomOffset * Math.PI) * 2;
    
    const baseClasses = "absolute transition-opacity duration-1000 hover:opacity-60";
    const opacity = idleState.isIdle 
      ? 0.2 + Math.sin(timeEvolution.phase + element.randomOffset * Math.PI) * 0.1
      : 0.3;
    
    const animationName = scrollSpeed.isScrolling && scrollSpeed.speed > 0.5
      ? "drift-energetic"
      : idleState.isIdle
      ? "drift-idle"
      : "drift";
    
    switch (element.type) {
      case "heart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={baseClasses}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x + timeDriftX}%`,
              top: `${element.y + timeDriftY}%`,
              animation: `${animationName} ${duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              opacity,
              filter: `hue-rotate(${hueShift}deg)`,
              color: `hsl(var(--primary))`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "star":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={baseClasses}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x + timeDriftX}%`,
              top: `${element.y + timeDriftY}%`,
              animation: `${animationName} ${duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              opacity,
              filter: `hue-rotate(${hueShift}deg)`,
              color: `hsl(var(--accent))`,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "sparkle":
        return (
          <div
            className={`${baseClasses} rounded-full bg-secondary`}
            style={{
              width: element.size / 2,
              height: element.size / 2,
              left: `${element.x + timeDriftX}%`,
              top: `${element.y + timeDriftY}%`,
              animation: `${animationName} ${duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              opacity,
              boxShadow: `0 0 ${element.size}px hsl(var(--secondary))`,
              filter: `hue-rotate(${hueShift}deg)`,
            }}
          />
        );
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full border-2 border-rose`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x + timeDriftX}%`,
              top: `${element.y + timeDriftY}%`,
              animation: `${animationName} ${duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              opacity,
              filter: `hue-rotate(${hueShift}deg)`,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div key={element.id}>{renderElement(element)}</div>
      ))}
    </div>
  );
};

export default FloatingElements;