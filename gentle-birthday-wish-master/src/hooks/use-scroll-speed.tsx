import { useEffect, useState, useRef } from "react";

interface ScrollSpeedState {
  speed: number; // pixels per frame (normalized 0-1)
  isScrolling: boolean;
  direction: "up" | "down" | null;
}

export const useScrollSpeed = () => {
  const [state, setState] = useState<ScrollSpeedState>({
    speed: 0,
    isScrolling: false,
    direction: null,
  });
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let lastFrameTime = Date.now();
    let accumulatedDelta = 0;
    let frameCount = 0;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = currentTime - lastScrollTime.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calculate speed (pixels per millisecond, normalized)
      const speed = Math.min(scrollDelta / Math.max(timeDelta, 1), 1);
      
      // Determine direction
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      
      accumulatedDelta += scrollDelta;
      frameCount++;
      
      // Update state with smoothing
      setState({
        speed: Math.min(speed * 10, 1), // Scale and clamp to 0-1
        isScrolling: true,
        direction,
      });

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isScrolling: false,
          speed: 0,
        }));
      }, 150);
    };

    // Throttled scroll handler
    const throttledScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        handleScroll();
      });
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return state;
};

