import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BigRevealStageProps {
  isVisible: boolean;
  onContinue: () => void;
}

const BigRevealStage = ({ isVisible, onContinue }: BigRevealStageProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Fire confetti on load
      const fireConfetti = () => {
        const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffd700", "#ff85a2"];
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors,
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
          });
        }, 300);
      };

      const timer1 = setTimeout(() => setShowTitle(true), 300);
      const timer2 = setTimeout(() => {
        setShowSubtitle(true);
        fireConfetti();
      }, 1000);
      const timer3 = setTimeout(() => setShowButton(true), 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  const titleLetters = "It's your birthday".split("");
  const sparkles = ["✨", "💖", "🎀", "⭐", "💕"];

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 relative transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
      }`}
    >
      <div className="text-center max-w-4xl relative z-10">
        {/* Floating sparkles around title */}
        <AnimatePresence>
          {showTitle && sparkles.map((sparkle, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl md:text-4xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1,
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.5 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${10 + i * 20}%`,
                top: `${Math.sin(i) * 30 + 20}%`,
              }}
            >
              {sparkle}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Main title with letter animation */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gradient-pink mb-6 relative">
          <AnimatePresence>
            {showTitle && titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ 
                  y: 100, 
                  opacity: 0, 
                  rotateZ: Math.random() * 30 - 15,
                  scale: 0 
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  rotateZ: 0,
                  scale: 1 
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.05,
                }}
                className="inline-block"
                style={{ 
                  textShadow: "0 0 30px hsl(330 90% 60% / 0.5)",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </AnimatePresence>
          
          {/* Sparkle emoji at end */}
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={showTitle ? { scale: [0, 1.5, 1], rotate: 0 } : {}}
            transition={{ 
              delay: 1,
              type: "spring",
              stiffness: 200 
            }}
            className="inline-block ml-2"
          >
            ✨
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={showSubtitle ? { y: 0, opacity: 1 } : {}}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20 
          }}
          className="text-2xl md:text-3xl text-foreground/80 font-body mb-12"
        >
          Time to celebrate YOU! 🎂💖
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0, rotate: -10 }}
          animate={showButton ? { scale: 1, rotate: 0 } : {}}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -3, 3, 0],
            transition: { rotate: { repeat: Infinity, duration: 0.3 } }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={onContinue}
          className="glossy-btn px-10 py-5 rounded-4xl text-primary-foreground font-display text-2xl md:text-3xl
            animate-glow cursor-pointer relative overflow-hidden group"
        >
          <span className="relative z-10">Let's Party! 🎉</span>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "linear",
              repeatDelay: 1 
            }}
          />
        </motion.button>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-10 text-6xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎀
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 text-5xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        🎂
      </motion.div>
    </section>
  );
};

export default BigRevealStage;