import { useEffect, useRef, useState } from 'react';
import { publicPath } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { BustScene } from './bustScene';

type Status = 'loading' | 'ready' | 'fallback';

/**
 * Page background: the polished graphite bust (3D scan rendered with three.js) on the silver ground, behind every panel.
 * It turns slightly toward the pointer and with the scroll position. A static render takes its place when WebGL is
 * unavailable or the model fails to load. The scene is paused while the tab is hidden.
 */
export function BustBackdrop() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BustScene | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    const background = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#e2e3e6';

    import('./bustScene')
      .then((module) => {
        if (cancelled) return;
        if (!module.hasWebGL()) {
          setStatus('fallback');
          return;
        }
        sceneRef.current = module.createBustScene(host, {
          modelUrl: publicPath('models/bust.glb'),
          background,
          reducedMotion: reduced,
          onReady: () => {
            if (!cancelled) setStatus('ready');
          },
          onError: () => {
            if (!cancelled) setStatus('fallback');
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
    const sync = () => sceneRef.current?.setActive(document.visibilityState === 'visible');
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [status]);

  const fallbackStyle = status === 'fallback' ? { backgroundImage: `url(${publicPath('images/bust-backdrop.png')})` } : undefined;

  return <div className="backdrop" ref={hostRef} data-status={status} style={fallbackStyle} aria-hidden="true" />;
}
