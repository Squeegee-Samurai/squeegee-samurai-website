import { useEffect, useRef, useState } from "react";

/**
 * Shared parallax hook – tracks scroll offset for an element.
 * Respects `prefers-reduced-motion` by returning 0 when motion is reduced.
 */
export function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) {
        setOffset(window.scrollY * speed);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return { ref, offset };
}
