import { useEffect, useState } from "react";

interface ClosureStageProps {
  isVisible: boolean;
}

const ClosureStage = ({ isVisible }: ClosureStageProps) => {
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setShowLine1(true), 500);
      const timer2 = setTimeout(() => setShowLine2(true), 2000);
      const timer3 = setTimeout(() => setShowLine3(true), 3500);
      const timer4 = setTimeout(() => setShowHeart(true), 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isVisible]);

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center max-w-2xl">
        <div className="space-y-8">
          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed transition-all duration-1000 ${
              showLine1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            I hope this birthday feels a little lighter,
          </p>

          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed transition-all duration-1000 ${
              showLine2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            a little warmer,
          </p>

          <p
            className={`font-display text-3xl md:text-4xl text-foreground leading-relaxed transition-all duration-1000 ${
              showLine3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            and a little more you.
          </p>
        </div>

        <div
          className={`mt-16 transition-all duration-1000 ${
            showHeart ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="inline-block p-8 rounded-full bg-gradient-to-br from-rose/40 to-lavender/40 shadow-glow animate-breathe">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-primary"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <p className="mt-8 text-muted-foreground font-light text-lg">
            Happy Birthday 🎂
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 px-6 py-3 rounded-xl bg-card border border-border/50
              text-foreground/60 font-body text-sm transition-all duration-500
              hover:bg-secondary hover:text-foreground"
          >
            ↑ Start again
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClosureStage;