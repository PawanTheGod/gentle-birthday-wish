import { useState } from "react";

interface CelebrationStageProps {
  isVisible: boolean;
  onContinue: () => void;
}

const CelebrationStage = ({ isVisible, onContinue }: CelebrationStageProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center max-w-2xl">
        {!isRevealed ? (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              A small birthday wish
            </h2>
            
            <button
              onClick={handleReveal}
              className="group relative px-10 py-6 rounded-3xl bg-gradient-to-br from-rose via-blush to-lavender
                shadow-float transition-all duration-700 
                hover:shadow-glow hover:scale-105"
            >
              <span className="font-display text-2xl text-foreground/90">
                Open with care ✨
              </span>
              
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 animate-glow-pulse" />
            </button>
          </div>
        ) : (
          <div className="animate-scale-in">
            <div className="p-10 md:p-14 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-glow">
              <p className="font-display text-3xl md:text-4xl text-foreground leading-relaxed mb-6">
                "Happy Birthday to someone who makes the world a little softer just by being in it."
              </p>
              
              <p className="text-muted-foreground font-light mt-6">
                May your day be filled with small joys and quiet wonders.
              </p>
            </div>

            <button
              onClick={onContinue}
              className="mt-10 px-6 py-3 rounded-xl bg-secondary/50 border border-border/30
                text-foreground/70 font-body transition-all duration-500
                hover:bg-secondary hover:text-foreground"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CelebrationStage;