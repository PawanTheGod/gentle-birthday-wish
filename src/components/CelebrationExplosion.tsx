import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CelebrationExplosionProps {
  isVisible: boolean;
  onContinue: () => void;
}

const messages = [
  { text: "You're amazing", emoji: "💖" },
  { text: "Today is all yours", emoji: "🎂" },
  { text: "Main character energy", emoji: "✨" },
  { text: "So loved & cherished", emoji: "💕" },
  { text: "Birthday queen vibes", emoji: "👑" },
];

const CelebrationExplosion = ({ isVisible, onContinue }: CelebrationExplosionProps) => {
  const [exploded, setExploded] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleExplosion = () => {
    if (exploded) return;
    setExploded(true);

    // Epic confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffd700", "#ff85a2", "#dda0dd"];

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Multiple confetti bursts
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: randomInRange(0.8, 1.2),
      });
    }, 150);

    setTimeout(() => setShowMessages(true), 500);
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 relative transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
      }`}
    >
      <div className="text-center max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {!exploded ? (
            <motion.div
              key="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, rotate: 180 }}
              className="flex flex-col items-center"
            >
              <motion.h2
                className="font-display text-4xl md:text-6xl text-foreground mb-8"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ready for your surprise? 🎁
              </motion.h2>

              <motion.button
                onClick={handleExplosion}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { duration: 1.5, repeat: Infinity },
                }}
              >
                {/* Gift box */}
                <div className="w-40 h-40 md:w-52 md:h-52 relative">
                  {/* Box body */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-hotpink to-rose shadow-glow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 30px hsl(330 90% 60% / 0.5)",
                        "0 0 60px hsl(330 90% 60% / 0.7)",
                        "0 0 30px hsl(330 90% 60% / 0.5)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  {/* Ribbon vertical */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gold" />
                  
                  {/* Ribbon horizontal */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gold" />
                  
                  {/* Bow */}
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl md:text-6xl"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎀
                  </motion.div>

                  {/* Sparkles around gift */}
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        top: `${Math.sin(i * 60 * Math.PI / 180) * 80 + 50}%`,
                        left: `${Math.cos(i * 60 * Math.PI / 180) * 80 + 50}%`,
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      ✨
                    </motion.span>
                  ))}
                </div>

                <p className="mt-6 font-body text-lg text-foreground/70 group-hover:text-primary transition-colors">
                  Tap to open! 💕
                </p>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <motion.h2
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="font-display text-5xl md:text-7xl text-gradient-pink mb-10"
              >
                Happy Birthday! 🎉
              </motion.h2>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {showMessages && messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      scale: 0, 
                      y: 100,
                      rotate: Math.random() * 40 - 20 
                    }}
                    animate={{ 
                      scale: 1, 
                      y: 0,
                      rotate: 0 
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: i * 0.15,
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [-3, 3, 0],
                      transition: { rotate: { duration: 0.3 } }
                    }}
                    className="glass-pink px-6 py-4 rounded-2xl cursor-pointer"
                  >
                    <p className="font-display text-xl md:text-2xl text-foreground">
                      {msg.text} {msg.emoji}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="mt-10 glossy-btn px-8 py-4 rounded-3xl text-primary-foreground font-display text-xl"
              >
                One more thing... 💫
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CelebrationExplosion;