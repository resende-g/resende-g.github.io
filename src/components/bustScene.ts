/**
 * Three.js scene for the polished graphite bust shown in the hero. Loaded on demand (dynamic import) so three.js
 * stays out of the initial bundle. The canvas is transparent and fills the host element; the host's size and
 * position come from CSS, so the scene only fits the bust inside it. Everything created here is released by
 * `dispose()`.
 */
import {
  ACESFilmicToneMapping,
  Box3,
  CanvasTexture,
  CircleGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  Vector3,
  WebGLRenderer,
  type Texture,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface BustSceneOptions {
  modelUrl: string;
  /** No pointer or scroll response; a single frame is rendered after load and on resize. */
  reducedMotion: boolean;
  onReady: () => void;
  onError: () => void;
}

export interface BustScene {
  /** Start or stop the frame loop (host on screen and tab visible). */
  setActive: (active: boolean) => void;
  dispose: () => void;
}

const MAX_PIXEL_RATIO = 1.5;
const MODEL_HEIGHT = 1.6;
/** The current scan already faces the camera (+Z) after the exporter's X rotation; no extra turn is needed. */
const MODEL_YAW = 0;
const POINTER_YAW = 0.22;
const POINTER_PITCH = 0.08;
/** Extra turn accumulated while the hero scrolls out of view. */
const SCROLL_YAW = 0.35;
/** Share of the host's height and width the bust may fill; the bottom of the host is faded out by CSS. */
const FILL_HEIGHT = 0.94;
const FILL_WIDTH = 0.84;
/** How far below the host's bottom edge the base of the scan sits, as a share of the host's height. */
const BASE_DROP = 0.01;

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function makeShadowTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(60, 63, 70, 0.3)');
    gradient.addColorStop(0.5, 'rgba(60, 63, 70, 0.1)');
    gradient.addColorStop(1, 'rgba(60, 63, 70, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createBustScene(host: HTMLElement, options: BustSceneOptions): BustScene {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(24, 1, 0.1, 20);
  camera.position.set(0, 0, 4.6);

  const pmrem = new PMREMGenerator(renderer);
  const environment: Texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(-2.4, 3, 2.2);
  const rim = new DirectionalLight(0xffffff, 2.6);
  rim.position.set(2.6, 1.4, -2.4);
  const fill = new DirectionalLight(new Color('#d6d8dc'), 0.8);
  fill.position.set(2, -1.5, 2.5);
  scene.add(key, rim, fill);

  // Soft shadow behind the figure so its edge separates from the silver ground.
  const shadowTexture = makeShadowTexture();
  const shadow = new Mesh(new CircleGeometry(1.25, 48), new MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
  shadow.position.set(0, -0.1, -1.1);

  // Polished graphite (the dark gray of a laptop logo on a silver lid): fully metallic, mirror-like, with a clear coat.
  const material = new MeshPhysicalMaterial({
    color: new Color('#2a2c30'),
    metalness: 1,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.3,
  });

  /** Positioned by `layout()`; carries the shadow and the turning pivot. */
  const anchor = new Group();
  const pivot = new Group();
  anchor.add(shadow, pivot);
  scene.add(anchor);

  let disposed = false;
  let frame = 0;
  /** Host on screen, tab visible and motion allowed. */
  let active = false;
  /** A frame is scheduled; the loop stops by itself once the bust has settled. */
  let running = false;
  let lastTime = 0;
  let loaded = false;
  /** Width of the normalized model (its height is MODEL_HEIGHT); refined once the scan has loaded. */
  let modelWidth = 1.2;
  const target = { yaw: 0, pitch: 0 };
  const current = { yaw: 0, pitch: 0 };
  let scrollFraction = 0;

  const render = () => {
    if (disposed) return;
    renderer.render(scene, camera);
  };

  /** 0 while the host is at or below the top of the viewport, 1 once it has scrolled completely out above it. */
  const readScroll = () => {
    const rect = host.getBoundingClientRect();
    scrollFraction = rect.height > 0 ? Math.min(1, Math.max(0, -rect.top / rect.height)) : 0;
  };

  /** Fits the bust inside the host: as large as the host allows, bottom-aligned so the flat cut of the scan always
   *  falls in the host's fully faded base (any spare height becomes headroom). */
  const layout = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const visibleWidth = visibleHeight * camera.aspect;
    const scale = Math.min((FILL_HEIGHT * visibleHeight) / MODEL_HEIGHT, (FILL_WIDTH * visibleWidth) / modelWidth);
    anchor.scale.setScalar(scale);
    anchor.position.x = 0;
    anchor.position.y = (MODEL_HEIGHT * scale - visibleHeight) / 2 - BASE_DROP * visibleHeight;
    render();
  };

  const loader = new GLTFLoader();
  loader.load(
    options.modelUrl,
    (gltf) => {
      if (disposed) {
        gltf.scene.traverse((object) => {
          if (object instanceof Mesh) object.geometry.dispose();
        });
        return;
      }
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.computeVertexNormals();
          object.material = material;
        }
      });
      const box = new Box3().setFromObject(gltf.scene);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      const scale = MODEL_HEIGHT / (size.y || 1);
      gltf.scene.position.sub(center).multiplyScalar(scale);
      gltf.scene.scale.setScalar(scale);
      modelWidth = size.x * scale || modelWidth;
      const model = new Group();
      model.rotation.y = MODEL_YAW;
      model.add(gltf.scene);
      pivot.add(model);
      loaded = true;
      options.onReady();
      layout();
      requestFrame();
    },
    undefined,
    () => {
      if (!disposed) options.onError();
    },
  );

  /** Starts the loop if it is idle; called whenever an input (pointer, scroll) may have moved a target. */
  const requestFrame = () => {
    if (!active || running || disposed || !loaded) return;
    running = true;
    lastTime = performance.now();
    frame = requestAnimationFrame(loop);
  };

  const onPointerMove = (event: PointerEvent) => {
    target.yaw = ((event.clientX / window.innerWidth) * 2 - 1) * POINTER_YAW;
    target.pitch = ((event.clientY / window.innerHeight) * 2 - 1) * POINTER_PITCH;
    requestFrame();
  };

  const onScroll = () => requestFrame();

  const loop = (time: number) => {
    if (!active || disposed) {
      running = false;
      return;
    }
    const dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
    lastTime = time;
    readScroll();
    // Frame-rate independent smoothing toward the pointer and scroll targets. Nothing moves on its own:
    // once the bust has settled the loop stops until the next input.
    const k = 1 - Math.exp(-dt * 4);
    const yawTarget = target.yaw + scrollFraction * SCROLL_YAW;
    const pitchTarget = target.pitch + scrollFraction * 0.06;
    const delta = Math.abs(yawTarget - current.yaw) + Math.abs(pitchTarget - current.pitch);
    if (delta < 0.0005) {
      running = false;
      return;
    }
    current.yaw += (yawTarget - current.yaw) * k;
    current.pitch += (pitchTarget - current.pitch) * k;
    pivot.rotation.set(current.pitch, current.yaw, 0);
    render();
    frame = requestAnimationFrame(loop);
  };

  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(layout) : null;
  observer?.observe(host);
  if (!observer) window.addEventListener('resize', layout);
  layout();

  const interactive = !options.reducedMotion;
  if (interactive) {
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  return {
    setActive(next) {
      if (!interactive || disposed) return;
      if (next && !active) {
        active = true;
        requestFrame();
      } else if (!next && active) {
        active = false;
        running = false;
        cancelAnimationFrame(frame);
      }
    },
    dispose() {
      disposed = true;
      active = false;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', layout);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      scene.traverse((object) => {
        if (object instanceof Mesh) object.geometry.dispose();
      });
      material.dispose();
      (shadow.material as MeshBasicMaterial).dispose();
      shadowTexture.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
