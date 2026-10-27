import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 to `target` once `active` is true. Snaps to the target when motion is reduced.
 * The animation frame is cancelled on unmount or when inputs change.
 */
export function useCountUp(target: number, active: boolean, reduced: boolean, durationMs = 900): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced || durationMs <= 0) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduced, durationMs]);

  return active ? value : 0;
}
