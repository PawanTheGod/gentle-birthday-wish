import { useEffect, useState } from "react";

export const useStageAnimation = (isVisible: boolean, delay: number = 0) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !isAnimated) {
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setIsAnimated(false);
    }
  }, [isVisible, isAnimated, delay]);

  return isAnimated;
};

