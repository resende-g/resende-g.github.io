import { useEffect, useState, type RefObject } from 'react';

/**
 * True once the element has entered the viewport (sticky by default, so reveal animations run once),
 * or continuously while visible when `once` is false (used to pause off-screen animations).
 * Without IntersectionObserver support the element is treated as visible.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, options: { once?: boolean; threshold?: number } = {}): boolean {
  const { once = true, threshold = 0.25 } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, threshold]);

  return inView;
}
