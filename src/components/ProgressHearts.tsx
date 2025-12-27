import { motion } from "framer-motion";

interface ProgressHeartsProps {
  currentStage: number;
  totalStages: number;
  onStageClick: (stage: number) => void;
  visitedStages: Set<number>;
}

const ProgressHearts = ({ 
  currentStage, 
  totalStages, 
  onStageClick, 
  visitedStages 
}: ProgressHeartsProps) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
      {Array.from({ length: totalStages }, (_, i) => (
        <motion.button
          key={i}
          onClick={() => visitedStages.has(i) && onStageClick(i)}
          disabled={!visitedStages.has(i)}
          whileHover={visitedStages.has(i) ? { scale: 1.3 } : {}}
          whileTap={visitedStages.has(i) ? { scale: 0.9 } : {}}
          animate={currentStage === i ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            scale: { duration: 1, repeat: currentStage === i ? Infinity : 0 },
          }}
          className={`text-2xl transition-all duration-300 ${
            currentStage === i
              ? "drop-shadow-[0_0_10px_hsl(330,90%,60%)]"
              : visitedStages.has(i)
              ? "opacity-60 hover:opacity-100"
              : "opacity-30 cursor-not-allowed grayscale"
          }`}
          aria-label={`Go to stage ${i + 1}`}
        >
          {currentStage === i ? "💖" : visitedStages.has(i) ? "💗" : "🤍"}
        </motion.button>
      ))}
    </nav>
  );
};

export default ProgressHearts;