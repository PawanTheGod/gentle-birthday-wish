import { useEffect, useState } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import StageGlows from "@/components/StageGlows";

interface WelcomeStageProps {
  sectionIndex: number;
}

const WelcomeStage = ({ sectionIndex }: WelcomeStageProps) => {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showDecorative, setShowDecorative] = useState(false);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();
  const { isVisible, hasBeenVisible, elementRef } = useScrollVisibility({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible && hasBeenVisible) {
      const textTimer = setTimeout(() => setShowText(true), 200);
      const subtextTimer = setTimeout(() => setShowSubtext(true), 600);
      const decorativeTimer = setTimeout(() => setShowDecorative(true), 1000);
      
      return () => {
        clearTimeout(textTimer);
        clearTimeout(subtextTimer);
        clearTimeout(decorativeTimer);
      };
    } else if (!isVisible) {
      // Reset when scrolling away
      setShowText(false);
      setShowSubtext(false);
      setShowDecorative(false);
    }
  }, [isVisible, hasBeenVisible]);

  // Adjust animation speed based on scroll
  const animationSpeed = scrollSpeed.isScrolling && scrollSpeed.speed > 0.5
    ? "duration-700" // Faster for energetic scrolling
    : scrollSpeed.isScrolling
    ? "duration-1000" // Normal
    : "duration-1200"; // Slower when not scrolling

  // Idle breathing effect
  const idleClass = idleState.isIdle ? "animate-breathe-idle" : "";

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      {/* Stage glows */}
      <StageGlows isVisible={isVisible} count={6} />

      <div className="text-center max-w-3xl relative z-10 w-full">
        <h1
          className={`font-display text-5xl md:text-7xl text-foreground mb-6 transition-all ${animationSpeed} ${idleClass} ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            filter: idleState.isIdle 
              ? `hue-rotate(${Math.sin(timeEvolution.phase) * 5}deg)`
              : "none",
            transition: showText ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
            textShadow: showText 
              ? "0 2px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)"
              : "none",
            letterSpacing: showText ? "0.02em" : "0.05em",
          }}
        >
          Today exists to celebrate you
        </h1>
        
        <p
          className={`text-lg md:text-xl text-muted-foreground font-light leading-relaxed transition-all ${animationSpeed} ${
            showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transition: showSubtext ? "opacity 1.2s ease-out 0.3s, transform 1.2s ease-out 0.3s" : "none",
          }}
        >
          quietly, warmly, and kindly.
        </p>

        {/* Decorative elements */}
        <div 
          className={`mt-16 flex justify-center gap-8 ${
            showDecorative ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transition: showDecorative ? "opacity 1.2s ease-out 0.4s, transform 1.2s ease-out 0.4s" : "none",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-rose/20 border border-rose/30 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-lavender/20 border border-lavender/30 flex items-center justify-center">
            <span className="text-2xl">🎂</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-peach/20 border border-peach/30 flex items-center justify-center">
            <span className="text-2xl">💝</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div 
          className={`mt-20 text-muted-foreground/60 text-sm ${
            showDecorative ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: showDecorative ? "opacity 1.2s ease-out 0.8s" : "none",
          }}
        >
          Scroll to continue
          <div className="mt-2 animate-bounce">↓</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStage;