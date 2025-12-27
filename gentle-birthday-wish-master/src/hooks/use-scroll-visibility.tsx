import { useEffect, useState, useRef } from "react";

interface UseScrollVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollVisibility = (options: UseScrollVisibilityOptions = {}) => {
  const { threshold = 0.3, rootMargin = "0px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
        setIsVisible(visible);
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasBeenVisible]);

  return { isVisible, hasBeenVisible, elementRef };
};

