import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "heart" | "star" | "sparkle" | "circle";
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const types: FloatingElement["type"][] = ["heart", "star", "sparkle", "circle"];
      const newElements: FloatingElement[] = [];
      
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 8,
          delay: Math.random() * 5,
          duration: Math.random() * 4 + 6,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const renderElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-30 transition-opacity duration-1000 hover:opacity-60";
    
    switch (element.type) {
      case "heart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${baseClasses} text-primary`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `drift ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "star":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${baseClasses} text-accent`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `drift ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "sparkle":
        return (
          <div
            className={`${baseClasses} rounded-full bg-secondary`}
            style={{
              width: element.size / 2,
              height: element.size / 2,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `drift ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              boxShadow: `0 0 ${element.size}px hsl(var(--secondary))`,
            }}
          />
        );
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full border-2 border-rose`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `drift ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div key={element.id}>{renderElement(element)}</div>
      ))}
    </div>
  );
};

export default FloatingElements;