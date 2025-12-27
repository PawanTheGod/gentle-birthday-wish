import { useTimeEvolution } from "@/hooks/use-time-evolution";
import FloatingElements from "@/components/FloatingElements";

const ContinuousBackground = () => {
  const timeEvolution = useTimeEvolution();

  // Continuous, smooth color shifts - always running
  const colorShift = timeEvolution.colorShift;
  const hue1 = 350 + colorShift * 20; // Rose shifts between 350-370
  const hue2 = 280 + colorShift * 15; // Lavender shifts between 280-295
  const hue3 = 25 + colorShift * 10; // Peach shifts between 25-35

  // Continuous position shifts - always moving
  const bgX1 = 30 + Math.sin(timeEvolution.phase * 0.3) * 10;
  const bgY1 = 20 + Math.cos(timeEvolution.phase * 0.2) * 10;
  const bgX2 = 70 + Math.sin(timeEvolution.phase * 0.4) * 10;
  const bgY2 = 80 + Math.cos(timeEvolution.phase * 0.25) * 10;
  const bgX3 = 50 + Math.sin(timeEvolution.phase * 0.35) * 8;
  const bgY3 = 50 + Math.cos(timeEvolution.phase * 0.3) * 8;

  // Subtle opacity variation
  const opacity = 0.4 + Math.sin(timeEvolution.phase * 0.2) * 0.1;

  return (
    <>
      {/* Continuous gradient background - always animating */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity,
          background: `
            radial-gradient(ellipse at ${bgX1}% ${bgY1}%, hsl(${hue1} 70% 92% / 0.3), transparent 50%), 
            radial-gradient(ellipse at ${bgX2}% ${bgY2}%, hsl(${hue2} 50% 92% / 0.3), transparent 50%),
            radial-gradient(ellipse at ${bgX3}% ${bgY3}%, hsl(${hue3} 60% 92% / 0.2), transparent 50%)
          `,
          transition: "opacity 3s ease-in-out, background 4s ease-in-out",
        }}
      />

      {/* Continuous floating elements - always moving */}
      <FloatingElements />
    </>
  );
};

export default ContinuousBackground;

