import { useEffect, useState } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import StageGlows from "@/components/StageGlows";

interface PlayfulStageProps {
  sectionIndex: number;
}

interface Particle {
  id: number;
  x: number;
  startY: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const PlayfulStage = ({ sectionIndex }: PlayfulStageProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredBalloon, setHoveredBalloon] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();
  const { isVisible, hasBeenVisible, elementRef } = useScrollVisibility({ threshold: 0.3 });

  // Seeded random for controlled randomness
  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    if (isVisible && hasBeenVisible) {
      setShowContent(true);
      const colors = [
        "bg-rose",
        "bg-lavender",
        "bg-peach",
        "bg-sky",
        "bg-blush",
      ];
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        const seed = i * 1000;
        newParticles.push({
          id: i,
          x: seededRandom(seed) * 100,
          startY: 100 + seededRandom(seed + 1) * 20,
          size: seededRandom(seed + 2) * 8 + 4,
          color: colors[Math.floor(seededRandom(seed + 3) * colors.length)],
          delay: seededRandom(seed + 4) * 8,
          duration: seededRandom(seed + 5) * 10 + 15,
        });
      }
      setParticles(newParticles);
    } else {
      setShowContent(false);
    }
  }, [isVisible, hasBeenVisible]);

  const balloons = [
    { id: 1, color: "from-rose to-blush", message: "Joy" },
    { id: 2, color: "from-lavender to-secondary", message: "Peace" },
    { id: 3, color: "from-peach to-accent", message: "Love" },
    { id: 4, color: "from-sky to-lavender", message: "Hope" },
    { id: 5, color: "from-blush to-rose", message: "Light" },
  ];

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      <StageGlows isVisible={isVisible} count={9} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => {
          // Adjust speed based on scroll
          const speedMultiplier = scrollSpeed.isScrolling && scrollSpeed.speed > 0.5
            ? 0.7 // Faster for energetic scrolling
            : scrollSpeed.isScrolling
            ? 1
            : idleState.isIdle
            ? 0.5 // Slower when idle
            : 1;
          
          const duration = particle.duration * speedMultiplier;
          const opacity = idleState.isIdle 
            ? 0.2 + Math.sin(timeEvolution.phase + particle.id * 0.5) * 0.1
            : 0.4;

          return (
            <div
              key={particle.id}
              className={`absolute rounded-full ${particle.color}`}
              style={{
                left: `${particle.x}%`,
                width: particle.size,
                height: particle.size,
                animation: `floatUp ${duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                opacity,
                filter: `hue-rotate(${timeEvolution.colorShift * 15}deg)`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0;
          }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { 
            transform: translateY(-100vh) rotate(360deg); 
            opacity: 0;
          }
        }
      `}</style>

      <div className="text-center max-w-3xl w-full relative z-10">
        <h2 
          className={`font-display text-4xl md:text-5xl text-foreground mb-4 ${
            showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
          }}
        >
          A little playfulness
        </h2>
        
        <p 
          className={`text-muted-foreground font-light mb-12 text-lg ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s" : "none",
          }}
        >
          Hover over the wishes to see them glow
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {balloons.map((balloon, index) => (
            <div
              key={balloon.id}
              className={showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
              style={{
                transition: showContent 
                  ? `opacity 1.2s ease-out ${0.3 + index * 0.1}s, transform 1.2s ease-out ${0.3 + index * 0.1}s`
                  : "none",
              }}
              onMouseEnter={() => setHoveredBalloon(balloon.id)}
              onMouseLeave={() => setHoveredBalloon(null)}
            >
              <div
                className={`relative w-20 h-24 md:w-24 md:h-28 rounded-full bg-gradient-to-b ${balloon.color}
                  shadow-soft transition-all duration-500 cursor-pointer
                  flex items-center justify-center
                  ${hoveredBalloon === balloon.id 
                    ? "scale-110 shadow-glow" 
                    : idleState.isIdle 
                    ? "animate-float-idle" 
                    : "animate-float"}
                `}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  filter: idleState.isIdle && hoveredBalloon !== balloon.id
                    ? `hue-rotate(${Math.sin(timeEvolution.phase + index) * 8}deg)`
                    : undefined,
                  transform: idleState.isIdle && hoveredBalloon !== balloon.id
                    ? `scale(${1 + Math.sin(timeEvolution.phase * 2 + index) * 0.03})`
                    : undefined,
                }}
              >
                <span className={`font-display text-lg md:text-xl text-foreground/80 transition-all duration-300 ${
                  hoveredBalloon === balloon.id ? "scale-110" : ""
                }`}>
                  {balloon.message}
                </span>

                {/* Balloon string */}
                <div className="absolute -bottom-8 left-1/2 w-px h-8 bg-border/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional decorative text */}
        <div 
          className={`text-muted-foreground/60 text-sm mt-12 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out 1s" : "none",
          }}
        >
          Each wish carries a gentle message
        </div>
      </div>
    </div>
  );
};

export default PlayfulStage;