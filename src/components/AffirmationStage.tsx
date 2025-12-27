import { useState } from "react";

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

  return (
    <div
      className="relative w-full aspect-square cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`absolute inset-0 transition-all duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
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

const AffirmationStage = ({ isVisible, onContinue }: AffirmationStageProps) => {
  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center max-w-4xl w-full">
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 animate-fade-in-up">
          Birthday Affirmations
        </h2>
        
        <p className="text-muted-foreground font-light mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Tap each card to reveal a gentle wish for you
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {affirmations.map((affirmation, index) => (
            <div
              key={affirmation.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              <AffirmationCard front={affirmation.front} back={affirmation.back} />
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="px-6 py-3 rounded-xl bg-secondary/50 border border-border/30
            text-foreground/70 font-body transition-all duration-500
            hover:bg-secondary hover:text-foreground animate-fade-in-up"
          style={{ animationDelay: "0.9s" }}
        >
          Continue →
        </button>
      </div>
    </section>
  );
};

export default AffirmationStage;