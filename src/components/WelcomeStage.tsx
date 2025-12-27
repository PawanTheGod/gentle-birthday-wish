import { useEffect, useState } from "react";

interface WelcomeStageProps {
  onContinue: () => void;
  isVisible: boolean;
}

const WelcomeStage = ({ onContinue, isVisible }: WelcomeStageProps) => {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const textTimer = setTimeout(() => setShowText(true), 500);
      const subtextTimer = setTimeout(() => setShowSubtext(true), 1500);
      const buttonTimer = setTimeout(() => setShowButton(true), 2500);
      
      return () => {
        clearTimeout(textTimer);
        clearTimeout(subtextTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [isVisible]);

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center max-w-2xl">
        <h1
          className={`font-display text-5xl md:text-7xl text-foreground mb-6 transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Today exists to celebrate you
        </h1>
        
        <p
          className={`text-lg md:text-xl text-muted-foreground font-light leading-relaxed transition-all duration-1000 delay-300 ${
            showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          quietly, warmly, and kindly.
        </p>

        <button
          onClick={onContinue}
          className={`mt-12 px-8 py-4 rounded-2xl bg-card border border-border shadow-soft 
            font-body text-foreground/80 transition-all duration-500 
            hover:shadow-glow hover:scale-105 hover:bg-rose/20
            animate-breathe ${
              showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          Begin your birthday journey
        </button>
      </div>
    </section>
  );
};

export default WelcomeStage;