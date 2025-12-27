import { useEffect, useState } from "react";

interface PlayfulStageProps {
  isVisible: boolean;
  onContinue: () => void;
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

const PlayfulStage = ({ isVisible, onContinue }: PlayfulStageProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredBalloon, setHoveredBalloon] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      const colors = [
        "bg-rose",
        "bg-lavender",
        "bg-peach",
        "bg-sky",
        "bg-blush",
      ];
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          startY: 100 + Math.random() * 20,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 8,
          duration: Math.random() * 10 + 15,
        });
      }
      setParticles(newParticles);
    }
  }, [isVisible]);

  const balloons = [
    { id: 1, color: "from-rose to-blush", message: "Joy" },
    { id: 2, color: "from-lavender to-secondary", message: "Peace" },
    { id: 3, color: "from-peach to-accent", message: "Love" },
    { id: 4, color: "from-sky to-lavender", message: "Hope" },
    { id: 5, color: "from-blush to-rose", message: "Light" },
  ];

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.color} opacity-40`}
            style={{
              left: `${particle.x}%`,
              width: particle.size,
              height: particle.size,
              animation: `floatUp ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
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
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 animate-fade-in-up">
          A little playfulness
        </h2>
        
        <p className="text-muted-foreground font-light mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Hover over the wishes to see them glow
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {balloons.map((balloon, index) => (
            <div
              key={balloon.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredBalloon(balloon.id)}
              onMouseLeave={() => setHoveredBalloon(null)}
            >
              <div
                className={`relative w-20 h-24 md:w-24 md:h-28 rounded-full bg-gradient-to-b ${balloon.color}
                  shadow-soft transition-all duration-500 cursor-pointer
                  flex items-center justify-center
                  ${hoveredBalloon === balloon.id ? "scale-110 shadow-glow" : "animate-float-gentle"}
                `}
                style={{
                  animationDelay: `${index * 0.5}s`,
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

        <button
          onClick={onContinue}
          className="px-6 py-3 rounded-xl bg-secondary/50 border border-border/30
            text-foreground/70 font-body transition-all duration-500
            hover:bg-secondary hover:text-foreground animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          Continue to finale →
        </button>
      </div>
    </section>
  );
};

export default PlayfulStage;