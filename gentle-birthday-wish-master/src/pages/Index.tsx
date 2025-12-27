import { useEffect, useRef } from "react";
import ContinuousBackground from "@/components/ContinuousBackground";
import CursorLight from "@/components/CursorLight";
import WelcomeStage from "@/components/WelcomeStage";
import CelebrationStage from "@/components/CelebrationStage";
import AffirmationStage from "@/components/AffirmationStage";
import PlayfulStage from "@/components/PlayfulStage";
import ClosureStage from "@/components/ClosureStage";
import { useScrollSections } from "@/hooks/use-scroll-sections";

const Index = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { activeSection, registerSection } = useScrollSections(5);

  // Register sections
  useEffect(() => {
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        registerSection(index, ref);
      }
    });
  }, [registerSection]);

  const stages = ["welcome", "celebration", "affirmation", "playful", "closure"];

  return (
    <main className="relative bg-background overflow-x-hidden" style={{ scrollSnapType: "y proximity" }}>
      {/* Continuous background - always running */}
      <ContinuousBackground />
      
      {/* Luxury cursor light effect */}
      <CursorLight />

      {/* Progress indicator */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 backdrop-blur-sm bg-background/30 rounded-full px-4 py-2">
        {stages.map((stage, index) => (
          <button
            key={stage}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              activeSection === index
                ? "bg-primary w-6 shadow-glow"
                : "bg-primary/40 hover:bg-primary/60"
            }`}
            aria-label={`Go to ${stage} section`}
          />
        ))}
      </nav>

      {/* All sections visible - scroll-based */}
      <div className="relative z-10">
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="min-h-screen flex items-center justify-center snap-start"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <WelcomeStage sectionIndex={0} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="min-h-screen flex items-center justify-center snap-start"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <CelebrationStage sectionIndex={1} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="min-h-screen flex items-center justify-center snap-start"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <AffirmationStage sectionIndex={2} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="min-h-screen flex items-center justify-center snap-start"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <PlayfulStage sectionIndex={3} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="min-h-screen flex items-center justify-center snap-start"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <ClosureStage sectionIndex={4} />
        </section>
      </div>
    </main>
  );
};

export default Index;
