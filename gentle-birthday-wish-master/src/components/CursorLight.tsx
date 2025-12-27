import { useEffect, useState } from "react";

const CursorLight = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      setIsActive(true);
      
      // Smooth, delayed follow for elegant movement
      rafId = requestAnimationFrame(() => {
        setPosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: isActive ? 0.4 : 0.2,
        transition: "opacity 2s ease-in-out",
      }}
    >
      {/* Soft spotlight effect following cursor */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: "600px",
          height: "600px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(350 60% 90% / 0.15), transparent 70%)`,
          transition: "left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CursorLight;

