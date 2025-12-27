import { useEffect, useState, useRef } from "react";

interface SectionState {
  activeSection: number;
  isLocked: boolean;
  scrollProgress: number; // 0-1 for current section
}

export const useScrollSections = (sectionCount: number) => {
  const [state, setState] = useState<SectionState>({
    activeSection: 0,
    isLocked: false,
    scrollProgress: 0,
  });
  const sectionsRef = useRef<HTMLElement[]>([]);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollCenter = scrollY + windowHeight / 2;

      // Find which section is in view
      let activeIndex = 0;
      let minDistance = Infinity;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + scrollY + rect.height / 2;
          const distance = Math.abs(scrollCenter - sectionCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        }
      });

      // Calculate scroll progress within current section
      const activeSection = sectionsRef.current[activeIndex];
      let scrollProgress = 0;

      if (activeSection) {
        const rect = activeSection.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        const viewportTop = scrollY;
        const viewportBottom = scrollY + windowHeight;

        // Progress is how much of the section is visible
        const visibleTop = Math.max(viewportTop, sectionTop);
        const visibleBottom = Math.min(viewportBottom, sectionTop + sectionHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        scrollProgress = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;
      }

      setState((prev) => {
        let newLocked = prev.isLocked;
        
        // Lock section when it becomes active and user is scrolling
        if (prev.activeSection !== activeIndex && isScrollingRef.current) {
          // Lock for a brief moment to let content settle
          newLocked = true;
          
          if (lockTimeoutRef.current) {
            clearTimeout(lockTimeoutRef.current);
          }
          
          lockTimeoutRef.current = setTimeout(() => {
            setState((p) => ({ ...p, isLocked: false }));
          }, 800); // Lock duration
        }

        return {
          activeSection: activeIndex,
          isLocked: newLocked,
          scrollProgress,
        };
      });
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      isScrollingRef.current = true;
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);

      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [sectionCount]);

  const registerSection = (index: number, element: HTMLElement | null) => {
    if (element) {
      sectionsRef.current[index] = element;
    }
  };

  return {
    ...state,
    registerSection,
  };
};

