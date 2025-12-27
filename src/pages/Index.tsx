import { useState, useEffect } from "react";
import FloatingElements from "@/components/FloatingElements";
import WelcomeStage from "@/components/WelcomeStage";
import CelebrationStage from "@/components/CelebrationStage";
import AffirmationStage from "@/components/AffirmationStage";
import PlayfulStage from "@/components/PlayfulStage";
import ClosureStage from "@/components/ClosureStage";

type Stage = "welcome" | "celebration" | "affirmation" | "playful" | "closure";

const Index = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("welcome");
  const [visitedStages, setVisitedStages] = useState<Set<Stage>>(new Set(["welcome"]));

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
    setVisitedStages((prev) => new Set([...prev, stage]));
    
    // Smooth scroll to top when changing stages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Progress indicator dots
  const stages: Stage[] = ["welcome", "celebration", "affirmation", "playful", "closure"];

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Gradient background overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(350 70% 92% / 0.3), transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(280 50% 92% / 0.3), transparent 50%)"
        }}
      />

      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Progress indicator */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {stages.map((stage, index) => (
          <button
            key={stage}
            onClick={() => visitedStages.has(stage) && goToStage(stage)}
            disabled={!visitedStages.has(stage)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentStage === stage
                ? "bg-primary w-6 shadow-glow"
                : visitedStages.has(stage)
                ? "bg-primary/40 hover:bg-primary/60"
                : "bg-border"
            }`}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </nav>

      {/* Stage containers */}
      <div className="relative z-10">
        <WelcomeStage
          isVisible={currentStage === "welcome"}
          onContinue={() => goToStage("celebration")}
        />

        <CelebrationStage
          isVisible={currentStage === "celebration"}
          onContinue={() => goToStage("affirmation")}
        />

        <AffirmationStage
          isVisible={currentStage === "affirmation"}
          onContinue={() => goToStage("playful")}
        />

        <PlayfulStage
          isVisible={currentStage === "playful"}
          onContinue={() => goToStage("closure")}
        />

        <ClosureStage isVisible={currentStage === "closure"} />
      </div>
    </main>
  );
};

export default Index;