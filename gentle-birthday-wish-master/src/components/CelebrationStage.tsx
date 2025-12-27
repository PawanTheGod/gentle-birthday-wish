import { useState, useEffect } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import StageGlows from "@/components/StageGlows";

interface CelebrationStageProps {
  sectionIndex: number;
}

const CelebrationStage = ({ sectionIndex }: CelebrationStageProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();
  const { isVisible, hasBeenVisible, elementRef } = useScrollVisibility({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible && hasBeenVisible) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setIsRevealed(false);
    }
  }, [isVisible, hasBeenVisible]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  // Responsive animation timing
  const animationSpeed = scrollSpeed.isScrolling && scrollSpeed.speed > 0.5
    ? "duration-500"
    : "duration-700";

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <StageGlows isVisible={isVisible} count={7} />

      <div className="text-center max-w-3xl relative z-10 w-full">
        {!isRevealed ? (
          <div 
            className={showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
            style={{
              transition: showContent ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              A small birthday wish
            </h2>
            
            <p className="text-muted-foreground font-light mb-10 text-lg">
              Take a moment to open this gentle message
            </p>
            
            <button
              onClick={handleReveal}
              className={`group relative px-10 py-6 rounded-3xl bg-gradient-to-br from-rose via-blush to-lavender
                shadow-float transition-all duration-700
                hover:shadow-glow hover:scale-105
                ${idleState.isIdle ? "animate-pulse-idle" : ""}`}
              style={{
                filter: idleState.isIdle 
                  ? `hue-rotate(${Math.sin(timeEvolution.phase * 0.5) * 10}deg)`
                  : undefined,
                transform: idleState.isIdle 
                  ? `scale(${1 + Math.sin(timeEvolution.phase) * 0.02})`
                  : undefined,
              }}
            >
              <span className="font-display text-2xl text-foreground/90">
                Open with care ✨
              </span>
              
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                transition-opacity duration-700 animate-glow-pulse`} />
            </button>
          </div>
        ) : (
          <div 
            className={showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            style={{
              transition: showContent ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            }}
          >
            <div 
              className={`p-10 md:p-14 rounded-3xl glass-elegant shadow-glow transition-all duration-700 ${
                idleState.isIdle ? "animate-breathe-idle" : ""
              }`}
              style={{
                filter: idleState.isIdle 
                  ? `hue-rotate(${Math.sin(timeEvolution.phase * 0.3) * 3}deg)`
                  : undefined,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
              }}
            >
              <p 
                className="font-display text-3xl md:text-4xl text-foreground leading-relaxed mb-6"
                style={{
                  animation: showContent ? "fade-in-up-gentle 1.2s ease-out 0.2s both" : "none",
                }}
              >
                "Happy Birthday to someone who makes the world a little softer just by being in it."
              </p>
              
              <p 
                className="text-muted-foreground font-light mt-6 text-lg"
                style={{
                  animation: showContent ? "fade-in-up-gentle 1.2s ease-out 0.4s both" : "none",
                }}
              >
                May your day be filled with small joys and quiet wonders.
              </p>
            </div>

            {/* Additional decorative content */}
            <div 
              className="mt-12 flex justify-center gap-6"
              style={{
                animation: showContent ? "fade-in-up-gentle 1.2s ease-out 0.6s both" : "none",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-rose/10 border border-rose/20 flex items-center justify-center">
                <span className="text-xl">🌸</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-lavender/10 border border-lavender/20 flex items-center justify-center">
                <span className="text-xl">💐</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-peach/10 border border-peach/20 flex items-center justify-center">
                <span className="text-xl">🌺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrationStage;