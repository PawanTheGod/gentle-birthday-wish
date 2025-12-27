import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const AnimatedBackground = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const emojis = ["💖", "✨", "💕", "🎀", "⭐", "💗", "🌸", "💫"];
    const newItems: FloatingItem[] = [];

    for (let i = 0; i < 30; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10,
        size: Math.random() * 20 + 14,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(330 90% 60% / 0.4), transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(350 85% 70% / 0.4), transparent 70%)",
          bottom: "-150px",
          left: "-150px",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 80% / 0.4), transparent 70%)",
          top: "40%",
          left: "30%",
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating emojis */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            fontSize: item.size,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;