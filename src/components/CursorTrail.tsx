import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  type: "heart" | "star" | "sparkle";
}

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const types: Particle["type"][] = ["heart", "star", "sparkle"];
      
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        type: types[Math.floor(Math.random() * types.length)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const renderParticle = (type: Particle["type"]) => {
    switch (type) {
      case "heart":
        return "💖";
      case "star":
        return "✨";
      case "sparkle":
        return "💫";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x - 10, 
              y: particle.y - 10, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              y: particle.y - 50, 
              scale: 0, 
              opacity: 0,
              rotate: Math.random() > 0.5 ? 180 : -180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-lg"
          >
            {renderParticle(particle.type)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;