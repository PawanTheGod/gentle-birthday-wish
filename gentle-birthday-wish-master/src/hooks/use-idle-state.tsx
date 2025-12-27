import { useEffect, useState, useRef } from "react";

interface IdleState {
  isIdle: boolean;
  idleTime: number; // milliseconds since last interaction
}

export const useIdleState = (idleThreshold: number = 2000) => {
  const [state, setState] = useState<IdleState>({
    isIdle: false,
    idleTime: 0,
  });
  const lastActivityTime = useRef(Date.now());
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateIdleState = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivityTime.current;
      
      setState({
        isIdle: timeSinceActivity >= idleThreshold,
        idleTime: timeSinceActivity,
      });
    };

    const handleActivity = () => {
      lastActivityTime.current = Date.now();
      setState({
        isIdle: false,
        idleTime: 0,
      });
    };

    // Track various user interactions
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
    
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Update idle state every 100ms
    intervalId.current = setInterval(updateIdleState, 100);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [idleThreshold]);

  return state;
};

