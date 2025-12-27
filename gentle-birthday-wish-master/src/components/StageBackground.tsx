import { useTimeEvolution } from "@/hooks/use-time-evolution";
import { useIdleState } from "@/hooks/use-idle-state";

interface StageBackgroundProps {
  isVisible: boolean;
  hueOffset?: number; // Additional hue offset for this stage
}

const StageBackground = ({ isVisible, hueOffset = 0 }: StageBackgroundProps) => {
  const timeEvolution = useTimeEvolution();
  const idleState = useIdleState(2000);

  if (!isVisible) return null;

  // Very slow, subtle color shifts
  const colorShift = timeEvolution.colorShift;
  const hue1 = 350 + colorShift * 15 + hueOffset; // Rose with slow shift
  const hue2 = 280 + colorShift * 10 + hueOffset; // Lavender with slow shift
  
  // Very slow position shifts
  const bgX1 = 30 + Math.sin(timeEvolution.phase * 0.1) * 8;
  const bgY1 = 20 + Math.cos(timeEvolution.phase * 0.08) * 8;
  const bgX2 = 70 + Math.sin(timeEvolution.phase * 0.12) * 8;
  const bgY2 = 80 + Math.cos(timeEvolution.phase * 0.1) * 8;

  // Subtle opacity variation
  const opacity = idleState.isIdle 
    ? 0.25 + Math.sin(timeEvolution.phase * 0.2) * 0.05 
    : 0.3;

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        background: `radial-gradient(ellipse at ${bgX1}% ${bgY1}%, hsl(${hue1} 60% 94% / 0.25), transparent 60%), 
                     radial-gradient(ellipse at ${bgX2}% ${bgY2}%, hsl(${hue2} 45% 94% / 0.25), transparent 60%)`,
        transition: "opacity 3s ease-in-out, background 4s ease-in-out",
      }}
    />
  );
};

export default StageBackground;

