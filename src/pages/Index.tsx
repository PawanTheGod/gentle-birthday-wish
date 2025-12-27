import { useState } from "react";
import CursorTrail from "@/components/CursorTrail";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProgressHearts from "@/components/ProgressHearts";
import BigRevealStage from "@/components/BigRevealStage";
import CelebrationExplosion from "@/components/CelebrationExplosion";
import SweetEnding from "@/components/SweetEnding";

const Index = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set([0]));

  const goToStage = (stage: number) => {
    setCurrentStage(stage);
    setVisitedStages((prev) => new Set([...prev, stage]));
  };

  const totalStages = 3;

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(330 90% 95% / 0.8), transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(350 85% 92% / 0.6), transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(280 70% 95% / 0.4), transparent 60%),
            linear-gradient(180deg, hsl(340 30% 98%), hsl(350 50% 96%))
          `,
        }}
      />

      {/* Floating background elements */}
      <AnimatedBackground />

      {/* Cursor trail effect */}
      <CursorTrail />

      {/* Progress hearts navigation */}
      <ProgressHearts
        currentStage={currentStage}
        totalStages={totalStages}
        onStageClick={goToStage}
        visitedStages={visitedStages}
      />

      {/* Stage containers */}
      <div className="relative z-10">
        <BigRevealStage
          isVisible={currentStage === 0}
          onContinue={() => goToStage(1)}
        />

        <CelebrationExplosion
          isVisible={currentStage === 1}
          onContinue={() => goToStage(2)}
        />

        <SweetEnding isVisible={currentStage === 2} />
      </div>
    </main>
  );
};

export default Index;