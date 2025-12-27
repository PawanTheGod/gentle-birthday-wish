import { useEffect, useState } from "react";

interface TimeEvolutionState {
  time: number; // seconds since mount
  colorShift: number; // 0-1 for color evolution
  phase: number; // 0-2π for cyclical animations
}

export const useTimeEvolution = () => {
  const [state, setState] = useState<TimeEvolutionState>({
    time: 0,
    colorShift: 0,
    phase: 0,
  });

  useEffect(() => {
    const startTime = Date.now();
    
    const updateEvolution = () => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds
      
      setState({
        time: elapsed,
        colorShift: (Math.sin(elapsed / 30) + 1) / 2, // Slow color shift over ~2 minutes
        phase: (elapsed * 0.1) % (Math.PI * 2), // Continuous phase for cyclical animations
      });
    };

    const intervalId = setInterval(updateEvolution, 100); // Update 10 times per second

    return () => clearInterval(intervalId);
  }, []);

  return state;
};

