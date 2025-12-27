import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface SweetEndingProps {
  isVisible: boolean;
}

const SweetEnding = ({ isVisible }: SweetEndingProps) => {
  const [showMain, setShowMain] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Gentle confetti
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.7 },
        colors: ["#ff69b4", "#ffb6c1", "#ffd700"],
        gravity: 0.5,
      });

      const timer1 = setTimeout(() => setShowMain(true), 500);
      const timer2 = setTimeout(() => setShowHeart(true), 2000);
      const timer3 = setTimeout(() => setShowRestart(true), 3500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 relative transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
      }`}
    >
      <div className="text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showMain ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
            Hope today feels as{" "}
            <span className="text-gradient-pink">special</span>
            {" "}as you are
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={showMain ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-foreground/70 font-body"
          >
            Wishing you endless joy, laughter, and love 💕
          </motion.p>
        </motion.div>

        {/* Animated heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={showHeart ? { 
            scale: 1, 
            opacity: 1,
          } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mt-12 inline-block"
        >
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
            animate={{
              scale: [1, 1.1, 1, 1.15, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow behind heart */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, hsl(330 90% 60% / 0.5), transparent 70%)",
              }}
            />
            
            {/* Heart emoji */}
            <div className="relative text-8xl md:text-9xl flex items-center justify-center h-full">
              💖
            </div>

            {/* Orbiting sparkles */}
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.8,
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: `${-40 - i * 10}px 0`,
                }}
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Birthday cake animation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={showHeart ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-5xl md:text-6xl"
        >
          <motion.span
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🎂
          </motion.span>
        </motion.div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={showHeart ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 font-display text-2xl md:text-3xl text-primary"
        >
          Happy Birthday! 🎉
        </motion.p>

        {/* Restart button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={showRestart ? { opacity: 1, y: 0 } : {}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="mt-10 px-6 py-3 rounded-2xl bg-blush/50 border border-primary/20
            text-foreground font-body transition-all duration-300
            hover:bg-blush hover:shadow-glow"
        >
          Celebrate Again 💫
        </motion.button>
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around pb-8 pointer-events-none">
        {["🎀", "🎈", "🌸", "🎈", "🎀"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-3xl md:text-4xl"
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default SweetEnding;