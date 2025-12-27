import { useEffect, useState } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import StageGlows from "@/components/StageGlows";

interface ClosureStageProps {
  sectionIndex: number;
}

const ClosureStage = ({ sectionIndex }: ClosureStageProps) => {
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();
  const { isVisible, hasBeenVisible, elementRef } = useScrollVisibility({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible && hasBeenVisible) {
      const timer1 = setTimeout(() => setShowLine1(true), 400);
      const timer2 = setTimeout(() => setShowLine2(true), 1200);
      const timer3 = setTimeout(() => setShowLine3(true), 2000);
      const timer4 = setTimeout(() => setShowHeart(true), 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else {
      setShowLine1(false);
      setShowLine2(false);
      setShowLine3(false);
      setShowHeart(false);
    }
  }, [isVisible, hasBeenVisible]);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <StageGlows isVisible={isVisible} count={10} />

      <div className="text-center max-w-3xl relative z-10 w-full">
        <div className="space-y-8">
          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed ${
              showLine1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${idleState.isIdle ? "animate-float-idle" : ""}`}
            style={{
              filter: idleState.isIdle
                ? `hue-rotate(${Math.sin(timeEvolution.phase + 0) * 2}deg)`
                : undefined,
              transition: showLine1 ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            }}
          >
            I hope this birthday feels a little lighter,
          </p>

          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed ${
              showLine2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${idleState.isIdle ? "animate-float-idle" : ""}`}
            style={{
              filter: idleState.isIdle
                ? `hue-rotate(${Math.sin(timeEvolution.phase + 1) * 2}deg)`
                : undefined,
              transition: showLine2 ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            }}
          >
            a little warmer,
          </p>

          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed ${
              showLine3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${idleState.isIdle ? "animate-float-idle" : ""}`}
            style={{
              filter: idleState.isIdle
                ? `hue-rotate(${Math.sin(timeEvolution.phase + 2) * 2}deg)`
                : undefined,
              transition: showLine3 ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            }}
          >
            and a little more you.
          </p>
        </div>

        <div
          className={`mt-16 ${
            showHeart ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            transition: showHeart ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
          }}
        >
          <div 
            className={`inline-block p-8 rounded-full glass-elegant shadow-glow ${
              idleState.isIdle ? "animate-breathe-idle" : "animate-breathe"
            }`}
            style={{
              filter: idleState.isIdle
                ? `hue-rotate(${Math.sin(timeEvolution.phase) * 10}deg)`
                : undefined,
              transform: idleState.isIdle
                ? `scale(${1 + Math.sin(timeEvolution.phase * 1.5) * 0.05}) rotate(${Math.sin(timeEvolution.phase * 0.5) * 3}deg)`
                : undefined,
              background: "linear-gradient(135deg, rgba(255, 182, 193, 0.2), rgba(221, 160, 221, 0.2))",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 60px rgba(255, 182, 193, 0.2)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-primary"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <p className="mt-8 text-muted-foreground font-light text-lg">
            Happy Birthday Kartiki aka HighK 🎂
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 px-6 py-3 rounded-xl bg-card border border-border/50
              text-foreground/60 font-body text-sm transition-all duration-500
              hover:bg-secondary hover:text-foreground"
          >
            ↑ Start again
          </button>

          {/* Additional decorative elements */}
          <div 
            className="mt-16 flex justify-center gap-8"
            style={{
              animation: showHeart ? "fade-in-up-gentle 1.2s ease-out 0.4s both" : "none",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-rose/10 border border-rose/20 flex items-center justify-center">
              <span className="text-xl">💖</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-lavender/10 border border-lavender/20 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-peach/10 border border-peach/20 flex items-center justify-center">
              <span className="text-xl">🌟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosureStage;