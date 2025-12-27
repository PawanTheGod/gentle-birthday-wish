import { useState, useEffect } from "react";
import { useScrollSpeed } from "@/hooks/use-scroll-speed";
import { useIdleState } from "@/hooks/use-idle-state";
import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import StageGlows from "@/components/StageGlows";

interface AffirmationStageProps {
  isVisible: boolean;
  onContinue: () => void;
}

const affirmations = [
  {
    id: 1,
    front: "Growth",
    back: "Another year of growth, softness, and becoming.",
  },
  {
    id: 2,
    front: "Gentleness",
    back: "May this year be gentle with you.",
  },
  {
    id: 3,
    front: "Joy",
    back: "You deserve all the quiet joys life has to offer.",
  },
  {
    id: 4,
    front: "Wonder",
    back: "May you find wonder in the small moments.",
  },
];

const AffirmationCard = ({ front, back }: { front: string; back: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const scrollSpeed = useScrollSpeed();
  const idleState = useIdleState(2000);
  const timeEvolution = useTimeEvolution();

  const animationSpeed = scrollSpeed.isScrolling && scrollSpeed.speed > 0.5
    ? "duration-500"
    : "duration-700";

  return (
    <div
      className="relative w-full aspect-square cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`absolute inset-0 transition-all ${animationSpeed} preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        } ${idleState.isIdle && !isFlipped ? "animate-float-idle" : ""}`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          filter: idleState.isIdle && !isFlipped
            ? `hue-rotate(${Math.sin(timeEvolution.phase + parseInt(front) * 0.5) * 5}deg)`
            : undefined,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose/60 to-lavender/60 
            border border-border/30 shadow-soft flex items-center justify-center
            transition-all duration-500 group-hover:shadow-glow group-hover:scale-105 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-display text-3xl text-foreground/90">{front}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border border-border/50 shadow-glow 
            flex items-center justify-center p-6 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <p className="font-body text-center text-foreground/80 leading-relaxed">
            {back}
          </p>
        </div>
      </div>
    </div>
  );
};

interface AffirmationStageProps {
  sectionIndex: number;
}

const AffirmationStage = ({ sectionIndex }: AffirmationStageProps) => {
  const [showContent, setShowContent] = useState(false);
  const { isVisible, hasBeenVisible, elementRef } = useScrollVisibility({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible && hasBeenVisible) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible, hasBeenVisible]);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <StageGlows isVisible={isVisible} count={8} />

      <div className="text-center max-w-4xl w-full relative z-10">
        <h2 
          className={`font-display text-4xl md:text-5xl text-foreground mb-4 ${
            showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
          }}
        >
          Birthday Affirmations
        </h2>
        
        <p 
          className={`text-muted-foreground font-light mb-12 text-lg ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s" : "none",
          }}
        >
          Tap each card to reveal a gentle wish for you
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {affirmations.map((affirmation, index) => (
            <div
              key={affirmation.id}
              className={showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
              style={{
                transition: showContent 
                  ? `opacity 1.2s ease-out ${0.3 + index * 0.15}s, transform 1.2s ease-out ${0.3 + index * 0.15}s`
                  : "none",
              }}
            >
              <AffirmationCard front={affirmation.front} back={affirmation.back} />
            </div>
          ))}
        </div>

        {/* Additional decorative text */}
        <div 
          className={`text-muted-foreground/60 text-sm mt-8 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: showContent ? "opacity 1.2s ease-out 1.2s" : "none",
          }}
        >
          Each card holds a small moment of warmth
        </div>
      </div>
    </div>
  );
};

export default AffirmationStage;