/**
 * Three.js scene for the glass bust. Loaded on demand (dynamic import) so three.js stays out of the
 * initial bundle. Everything created here is released by `dispose()`.
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
  /** No idle sway and no pointer tracking; a single frame is rendered after load and on resize. */
  reducedMotion: boolean;
  onReady: () => void;
}

export interface BustScene {
  /** Start or stop the frame loop (used for viewport and tab visibility). */
  setActive: (active: boolean) => void;
  dispose: () => void;
}

const MAX_PIXEL_RATIO = 2;
const MODEL_HEIGHT = 1.55;
/** The scan faces -Z in the export; the camera looks down -Z, so the bust is turned to face it. */
const MODEL_YAW = Math.PI;
const YAW_RANGE = 0.42;
const PITCH_RANGE = 0.18;

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function makeBackdropTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(10, 14, 26, 0.92)');
    gradient.addColorStop(0.45, 'rgba(10, 14, 26, 0.5)');
    gradient.addColorStop(0.85, 'rgba(10, 14, 26, 0)');
    gradient.addColorStop(1, 'rgba(10, 14, 26, 0)');
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
  renderer.toneMappingExposure = 1.05;
  renderer.transmissionResolutionScale = 0.5;
  renderer.domElement.className = 'bust__canvas';
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 20);
  camera.position.set(0, 0.05, 4.2);

  // Image-based lighting gives the glass its reflections and refractions; no external HDR is loaded.
  const pmrem = new PMREMGenerator(renderer);
  const environment: Texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 1.1);
  key.position.set(-2.2, 2.6, 2.4);
  const rim = new DirectionalLight(new Color('#9db8ff'), 2.6);
  rim.position.set(2.4, 1.4, -2.6);
  const fill = new DirectionalLight(0xbfd0ff, 0.35);
  fill.position.set(2, -1, 2.5);
  scene.add(key, rim, fill);

  // Soft dark disc behind the bust: it is what the glass refracts (the canvas itself is transparent), and it
  // reads as a faint shadow around the figure on the page.
  const backdropTexture = makeBackdropTexture();
  const backdrop = new Mesh(
    new CircleGeometry(1.05, 48),
    new MeshBasicMaterial({ map: backdropTexture, transparent: true, depthWrite: false }),
  );
  backdrop.position.set(0, -0.1, -1.2);
  scene.add(backdrop);

  const material = new MeshPhysicalMaterial({
    color: new Color('#cfd9f4'),
    metalness: 0,
    roughness: 0.16,
    transmission: 0.95,
    thickness: 0.9,
    ior: 1.5,
    attenuationColor: new Color('#7f9fe8'),
    attenuationDistance: 1.1,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    specularIntensity: 0.9,
    envMapIntensity: 0.75,
  });

  const pivot = new Group();
  scene.add(pivot);

  let disposed = false;
  let frame = 0;
  let active = false;
  let lastTime = 0;
  let needsRender = true;
  const target = { yaw: 0, pitch: 0 };
  const current = { yaw: 0, pitch: 0 };

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
      // Center the model and scale it to a known height so framing does not depend on the export.
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
      needsRender = true;
      options.onReady();
      if (options.reducedMotion || !active) render();
    },
    undefined,
    (error) => {
      if (!disposed) console.error('Bust model failed to load', error);
    },
  );

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    needsRender = true;
    if (!active) render();
  };

  const render = () => {
    if (disposed) return;
    renderer.render(scene, camera);
    needsRender = false;
  };

  const onPointerMove = (event: PointerEvent) => {
    const nx = (event.clientX / window.innerWidth) * 2 - 1;
    const ny = (event.clientY / window.innerHeight) * 2 - 1;
    target.yaw = nx * YAW_RANGE;
    target.pitch = ny * PITCH_RANGE;
    needsRender = true;
  };

  const loop = (time: number) => {
    if (!active || disposed) return;
    const dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
    lastTime = time;
    // Frame-rate independent smoothing toward the pointer target plus a slow idle sway.
    const k = 1 - Math.exp(-dt * 5);
    const sway = Math.sin(time * 0.00045) * 0.07;
    current.yaw += (target.yaw + sway - current.yaw) * k;
    current.pitch += (target.pitch - current.pitch) * k;
    pivot.rotation.set(current.pitch, current.yaw, 0);
    render();
    frame = requestAnimationFrame(loop);
  };

  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  observer?.observe(host);
  if (!observer) window.addEventListener('resize', resize);
  resize();

  if (!options.reducedMotion && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  return {
    setActive(next) {
      if (options.reducedMotion || disposed) return;
      if (next && !active) {
        active = true;
        lastTime = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!next && active) {
        active = false;
        cancelAnimationFrame(frame);
      }
    },
    dispose() {
      disposed = true;
      active = false;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      scene.traverse((object) => {
        if (object instanceof Mesh) object.geometry.dispose();
      });
      material.dispose();
      backdrop.geometry.dispose();
      (backdrop.material as MeshBasicMaterial).dispose();
      backdropTexture.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      void needsRender;
    },
  };
}
