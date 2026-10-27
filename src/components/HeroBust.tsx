import { useEffect, useRef, useState } from 'react';
import bustFallbackUrl from '../assets/bust-fallback.webp';
import bustModelUrl from '../assets/bust.glb?url';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { BustScene } from './bustScene';

type Status = 'loading' | 'ready' | 'fallback';

/**
 * The polished graphite bust (3D scan rendered with three.js) beside the identity card in the hero. Its size and
 * place come from the `.hero__bust` slot in CSS; the scene only fits the bust inside it, on a transparent canvas.
 * It turns slightly toward the pointer and as the hero scrolls away, and renders only while the slot is on screen
 * and the tab is visible. A static render takes its place when WebGL is unavailable or the model fails to load.
 * Both files are imported through Vite so their URLs carry a content hash: a new scan is never served from a
 * browser or CDN cache of the previous one.
 */
export function HeroBust() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BustScene | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const onScreen = useInView(hostRef, { once: false, threshold: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    import('./bustScene')
      .then((module) => {
        if (cancelled) return;
        if (!module.hasWebGL()) {
          setStatus('fallback');
          return;
        }
        sceneRef.current = module.createBustScene(host, {
          modelUrl: bustModelUrl,
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
    const sync = () => sceneRef.current?.setActive(onScreen && document.visibilityState === 'visible');
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [status, onScreen]);

  const fallbackStyle = status === 'fallback' ? { backgroundImage: `url(${bustFallbackUrl})` } : undefined;

  return <div className="hero__bust" ref={hostRef} data-status={status} style={fallbackStyle} aria-hidden="true" />;
}
