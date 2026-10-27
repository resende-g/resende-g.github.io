/**
 * Three.js scene for the glass bust that fills the page background. Loaded on demand (dynamic import) so
 * three.js stays out of the initial bundle. Everything created here is released by `dispose()`.
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
  /** Page background color; the canvas clears to it so the glass has it to refract. */
  background: string;
  /** No idle sway, no pointer or scroll response; a single frame is rendered after load and on resize. */
  reducedMotion: boolean;
  onReady: () => void;
  onError: () => void;
}

export interface BustScene {
  /** Start or stop the frame loop (tab visibility). */
  setActive: (active: boolean) => void;
  dispose: () => void;
}

const MAX_PIXEL_RATIO = 1.5;
const MODEL_HEIGHT = 1.6;
/** The scan faces -Z in the export; the camera looks down -Z, so the bust is turned to face it. */
const MODEL_YAW = Math.PI;
const POINTER_YAW = 0.22;
const POINTER_PITCH = 0.08;
/** Extra turn and drift accumulated over the full page scroll. */
const SCROLL_YAW = 0.55;
const SCROLL_DRIFT = 0.45;

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
    gradient.addColorStop(0, 'rgba(60, 72, 96, 0.42)');
    gradient.addColorStop(0.5, 'rgba(60, 72, 96, 0.16)');
    gradient.addColorStop(1, 'rgba(60, 72, 96, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createBustScene(host: HTMLElement, options: BustSceneOptions): BustScene {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  renderer.setClearColor(new Color(options.background), 1);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.transmissionResolutionScale = 0.5;
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.background = new Color(options.background);
  const camera = new PerspectiveCamera(24, 1, 0.1, 20);
  camera.position.set(0, 0, 4.6);

  const pmrem = new PMREMGenerator(renderer);
  const environment: Texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 1.2);
  key.position.set(-2.4, 3, 2.2);
  const rim = new DirectionalLight(new Color('#c9d6ff'), 2.4);
  rim.position.set(2.6, 1.2, -2.4);
  scene.add(key, rim);

  const shadowTexture = makeShadowTexture();
  const shadow = new Mesh(new CircleGeometry(1.15, 48), new MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
  shadow.position.set(0.05, -0.15, -1.1);

  const material = new MeshPhysicalMaterial({
    color: new Color('#e2e7f0'),
    metalness: 0,
    roughness: 0.14,
    transmission: 0.96,
    thickness: 0.9,
    ior: 1.5,
    attenuationColor: new Color('#aeb9cc'),
    attenuationDistance: 1.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    specularIntensity: 0.9,
    envMapIntensity: 0.9,
  });

  /** Positioned by `layout()`; carries the shadow and the turning pivot. */
  const anchor = new Group();
  const pivot = new Group();
  anchor.add(shadow, pivot);
  scene.add(anchor);

  let disposed = false;
  let frame = 0;
  /** Tab visible and motion allowed. */
  let active = false;
  /** A frame is scheduled; the loop stops by itself once the bust has settled. */
  let running = false;
  let lastTime = 0;
  let loaded = false;
  const target = { yaw: 0, pitch: 0 };
  const current = { yaw: 0, pitch: 0 };
  let scrollFraction = 0;

  const render = () => {
    if (disposed) return;
    renderer.render(scene, camera);
  };

  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollFraction = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };

  /** Places the bust to the right on wide viewports and smaller, centered, on narrow ones. */
  const layout = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    const wide = camera.aspect >= 1;
    const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    anchor.scale.setScalar(wide ? 1 : 0.56);
    anchor.position.x = wide ? visibleHeight * camera.aspect * 0.26 : visibleHeight * camera.aspect * 0.1;
    anchor.position.y = wide ? 0 : visibleHeight * 0.1;
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
      const model = new Group();
      model.rotation.y = MODEL_YAW;
      model.add(gltf.scene);
      pivot.add(model);
      loaded = true;
      options.onReady();
      render();
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
    const driftTarget = -scrollFraction * SCROLL_DRIFT;
    const delta = Math.abs(yawTarget - current.yaw) + Math.abs(pitchTarget - current.pitch) + Math.abs(driftTarget - pivot.position.y);
    if (delta < 0.0005) {
      running = false;
      return;
    }
    current.yaw += (yawTarget - current.yaw) * k;
    current.pitch += (pitchTarget - current.pitch) * k;
    pivot.rotation.set(current.pitch, current.yaw, 0);
    pivot.position.y += (driftTarget - pivot.position.y) * k;
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
