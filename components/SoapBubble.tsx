"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SoapBubble() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 340;
    const H = mount.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    /* ── Main soap bubble ── */
    const sphereGeo = new THREE.SphereGeometry(1.45, 128, 128);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xc4b5fd,        // violet-300
      metalness: 0.05,
      roughness: 0,
      transmission: 0.95,
      thickness: 0.6,
      transparent: true,
      opacity: 0.55,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 400],
      envMapIntensity: 1.2,
    });
    const mainBubble = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(mainBubble);

    /* ── Inner shimmer layer ── */
    const innerGeo = new THREE.SphereGeometry(1.38, 64, 64);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xa78bfa,
      metalness: 0.0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      iridescence: 0.7,
      iridescenceIOR: 1.2,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    /* ── Floating mini bubbles ── */
    const BUBBLE_COUNT = 9;
    type BubbleData = {
      mesh: THREE.Mesh;
      baseRadius: number;
      speed: number;
      phase: number;
      yPhase: number;
      yAmp: number;
    };
    const bubbles: BubbleData[] = [];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const r = 0.07 + Math.random() * 0.14;
      const bg = new THREE.SphereGeometry(r, 24, 24);
      const bm = new THREE.MeshPhysicalMaterial({
        color: 0xe9d5ff,
        transmission: 0.92,
        roughness: 0,
        transparent: true,
        opacity: 0.45 + Math.random() * 0.3,
        iridescence: 0.8,
        iridescenceIOR: 1.25,
        iridescenceThicknessRange: [80, 300],
      });
      const mesh = new THREE.Mesh(bg, bm);
      bubbles.push({
        mesh,
        baseRadius: 1.85 + Math.random() * 0.45,
        speed: 0.18 + Math.random() * 0.14,
        phase: (i / BUBBLE_COUNT) * Math.PI * 2,
        yPhase: Math.random() * Math.PI * 2,
        yAmp: 0.7 + Math.random() * 0.7,
      });
      scene.add(mesh);
    }

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const light1 = new THREE.PointLight(0x7c3aed, 6, 12); // violet
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x06b6d4, 4, 12); // cyan
    light2.position.set(-3, -1, 2);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xf9a8d4, 3, 10); // pink
    light3.position.set(0, -3, -1);
    scene.add(light3);

    const light4 = new THREE.PointLight(0xfde68a, 2, 10); // amber
    light4.position.set(-2, 2, -2);
    scene.add(light4);

    /* ── Mouse/touch tracking — responds to cursor anywhere on page ── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2.8;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2.8;
    };
    const onTouch = (e: TouchEvent) => {
      mouse.tx = (e.touches[0].clientX / window.innerWidth - 0.5) * 2.8;
      mouse.ty = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2.8;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    /* ── Animation loop ── */
    let animId: number;
    const clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smoothly interpolate mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Main bubble: slow auto-rotation + gentle mouse tilt
      mainBubble.rotation.y = t * 0.22 + mouse.x * 0.5;
      mainBubble.rotation.x = Math.sin(t * 0.15) * 0.12 + mouse.y * 0.3;
      mainBubble.position.y = Math.sin(t * 0.4) * 0.06; // gentle float

      // Orbit mini bubbles
      bubbles.forEach((b) => {
        const angle = b.phase + t * b.speed;
        const radius = b.baseRadius + Math.sin(t * 0.6 + b.phase) * 0.12;
        b.mesh.position.x = Math.cos(angle) * radius;
        b.mesh.position.z = Math.sin(angle) * radius * 0.45;
        b.mesh.position.y = Math.sin(t * 0.5 + b.yPhase) * b.yAmp;
        const scale = 1 + Math.sin(t * 1.2 + b.phase) * 0.08;
        b.mesh.scale.setScalar(scale);
      });

      // Slowly orbit coloured lights for live shimmer
      light1.position.x = Math.cos(t * 0.55) * 3.5;
      light1.position.z = Math.sin(t * 0.55) * 3.5;
      light2.position.x = Math.cos(t * 0.38 + 2.1) * 3;
      light2.position.z = Math.sin(t * 0.38 + 2.1) * 3;
      light3.position.y = Math.sin(t * 0.28 + 1) * 3;
      light3.position.x = Math.cos(t * 0.28) * 2;

      renderer.render(scene, camera);
    }
    animate();

    /* ── Resize ── */
    let resizeId: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        const nW = mount.clientWidth;
        const nH = mount.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      }, 120);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      aria-hidden="true"
    //   title="אינטראקטיבי – הזיזו את הנקודה"
    />
  );
}
