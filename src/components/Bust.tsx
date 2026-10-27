import { useEffect, useRef, useState } from 'react';
import { publicPath } from '../config/site';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useI18n } from '../i18n';
import type { BustScene } from './bustScene';

type Status = 'loading' | 'ready' | 'fallback';

/**
 * Glass bust of the site owner (3D scan rendered with three.js). The static render is shown first and
 * stays as the fallback when WebGL is unavailable or the model fails to load; the live canvas fades in
 * over it once ready. The scene only animates while on screen and in a visible tab.
 */
export function Bust() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BustScene | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const visible = useInView(hostRef, { once: false, threshold: 0.05 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cancelled = false;

    import('./bustScene')
      .then((module) => {
        if (cancelled) return;
        if (!module.hasWebGL()) {
          setStatus('fallback');
          return;
        }
        sceneRef.current = module.createBustScene(stage, {
          modelUrl: publicPath('models/bust.glb'),
          reducedMotion: reduced,
          onReady: () => {
            if (!cancelled) setStatus('ready');
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus('fallback');
      });

    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const sync = () => sceneRef.current?.setActive(visible && document.visibilityState === 'visible');
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [visible, status]);

  return (
    <div className="bust" ref={hostRef} data-status={status}>
      <img
        className="bust__static"
        src={publicPath('images/bust-static.png')}
        alt={t.hero.bustAlt}
        width={600}
        height={690}
        decoding="async"
        fetchPriority="high"
      />
      <div className="bust__stage" ref={stageRef} aria-hidden="true" />
    </div>
  );
}
