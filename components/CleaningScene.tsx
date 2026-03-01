"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  cleanlinessScore: number; // 0–4
  serviceSelected: string;  // "" or service slug
  submitted: boolean;
}

export default function CleaningScene({ cleanlinessScore, serviceSelected, submitted }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Keep latest props accessible inside the animation loop without re-running the effect
  const stateRef = useRef({ cleanlinessScore, serviceSelected, submitted });
  useEffect(() => {
    stateRef.current = { cleanlinessScore, serviceSelected, submitted };
  }, [cleanlinessScore, serviceSelected, submitted]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const bgDirty = new THREE.Color(0x110d1c);
    const bgClean = new THREE.Color(0xede8f8);
    scene.background = bgDirty.clone();
    scene.fog = new THREE.FogExp2(0x110d1c, 0.035);

    // ── Camera ────────────────────────────────────────────────────────────
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 120);
    camera.position.set(0, 7.5, 11);
    camera.lookAt(0, 0.5, 0);

    // Camera lerp targets
    const camTarget = new THREE.Vector3(0, 7.5, 11);
    let orbitAngle = 0;

    // ── Lights ────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffeedd, 0.22);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff0d0, 0.35);
    sun.position.set(6, 12, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    scene.add(sun);

    const violetFill = new THREE.PointLight(0x9d4edd, 0.6, 22);
    violetFill.position.set(-5, 4, 2);
    scene.add(violetFill);

    // ── Room colors ──────────────────────────────────────────────────────
    const dirtyFloor = new THREE.Color(0x2e2318);
    const cleanFloor = new THREE.Color(0xddd3be);
    const dirtyWall  = new THREE.Color(0x1e1628);
    const cleanWall  = new THREE.Color(0xf4effc);

    // ── Room materials ───────────────────────────────────────────────────
    const floorMat = new THREE.MeshStandardMaterial({
      color: dirtyFloor.clone(),
      roughness: 0.96,
      metalness: 0.02,
    });
    const wallMat = new THREE.MeshStandardMaterial({
      color: dirtyWall.clone(),
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.FrontSide,
    });
    const ceilMat = new THREE.MeshStandardMaterial({
      color: dirtyWall.clone(),
      roughness: 0.95,
      metalness: 0,
      side: THREE.BackSide,
    });

    // ── Room geometry ────────────────────────────────────────────────────
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 18, 4, 4), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    function wall(w: number, h: number, x: number, y: number, z: number, ry: number) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
      m.position.set(x, y, z);
      m.rotation.y = ry;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    wall(18, 8, 0,  4, -9, 0);               // back
    wall(18, 8, -9, 4,  0, Math.PI / 2);     // left
    wall(18, 8,  9, 4,  0, -Math.PI / 2);    // right

    // Ceiling
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), ceilMat);
    ceil.position.set(0, 8, 0);
    ceil.rotation.x = -Math.PI / 2;
    scene.add(ceil);

    // Low-poly furniture silhouettes (desk + boxes)
    function box(w: number, h: number, d: number, x: number, y: number, z: number, color: number) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 })
      );
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    box(3.2, 0.15, 1.4,  0,    0.75, -5.5, 0x3d3028); // desk top
    box(0.12, 1.5,  0.12, -1.45, 0.38, -5.0, 0x2e2318); // desk leg L
    box(0.12, 1.5,  0.12,  1.45, 0.38, -5.0, 0x2e2318); // desk leg R
    box(0.12, 1.5,  0.12, -1.45, 0.38, -6.0, 0x2e2318);
    box(0.12, 1.5,  0.12,  1.45, 0.38, -6.0, 0x2e2318);
    box(1.0, 0.8, 0.7, -3.5, 0.4, -5.5, 0x2a1f14); // box
    box(0.7, 0.55, 0.55, -3.5, 0.96, -5.5, 0x231a11);

    // ── Dust particles (InstancedMesh for performance) ──────────────────
    const DUST = 600;
    const dustMat = new THREE.MeshStandardMaterial({
      color: 0x9a8265,
      transparent: true,
      opacity: 0.5,
      roughness: 1,
      metalness: 0,
    });
    const dustMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.045, 4, 3),
      dustMat,
      DUST
    );
    scene.add(dustMesh);

    const dPos = new Float32Array(DUST * 3);
    const dVel = new Float32Array(DUST * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < DUST; i++) {
      dPos[i * 3]     = (Math.random() - 0.5) * 14;
      dPos[i * 3 + 1] = Math.random() * 5;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      dVel[i * 3]     = (Math.random() - 0.5) * 0.003;
      dVel[i * 3 + 1] = 0.004 + Math.random() * 0.005;
      dVel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      dummy.position.set(dPos[i * 3], dPos[i * 3 + 1], dPos[i * 3 + 2]);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      dustMesh.setMatrixAt(i, dummy.matrix);
    }
    dustMesh.instanceMatrix.needsUpdate = true;

    // ── Cleaning tools ────────────────────────────────────────────────────
    function makeBroom(): THREE.Group {
      const g = new THREE.Group();
      const handleM = new THREE.MeshStandardMaterial({ color: 0x7a5c1e, roughness: 0.7 });
      const headM   = new THREE.MeshStandardMaterial({ color: 0xd4a520, roughness: 0.65 });
      const bristleM = new THREE.MeshStandardMaterial({ color: 0xb8860b, roughness: 0.8 });
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.6, 7), handleM);
      g.add(handle);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.11, 0.20), headM);
      head.position.y = -1.35;
      g.add(head);
      for (let b = 0; b < 7; b++) {
        const bristle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.008, 0.25, 4), bristleM);
        bristle.position.set(-0.3 + b * 0.1, -1.56, 0);
        g.add(bristle);
      }
      return g;
    }

    function makeSprayBottle(): THREE.Group {
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color: 0x3cb8b2, roughness: 0.25, metalness: 0.5 });
      const labelM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.72, 10), mat));
      const nozzle = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.09, 0.09), mat);
      nozzle.position.set(0.06, 0.34, 0);
      g.add(nozzle);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
      cap.position.y = 0.42;
      g.add(cap);
      const label = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.28), labelM);
      label.position.set(0.155, 0, 0);
      label.rotation.y = Math.PI / 2;
      g.add(label);
      return g;
    }

    function makeSponge(): THREE.Group {
      const g = new THREE.Group();
      const yellowM = new THREE.MeshStandardMaterial({ color: 0xffcc2a, roughness: 0.82 });
      const greenM  = new THREE.MeshStandardMaterial({ color: 0x3cb043, roughness: 0.75 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.38), yellowM));
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.07, 0.38), greenM);
      pad.position.y = -0.105;
      g.add(pad);
      return g;
    }

    const broom = makeBroom();
    broom.position.set(-2.2, 3.0, -3);
    broom.rotation.z = 0.22;
    broom.visible = false;
    scene.add(broom);

    const spray = makeSprayBottle();
    spray.position.set(0, 2.8, -3.5);
    spray.visible = false;
    scene.add(spray);

    const sponge = makeSponge();
    sponge.position.set(2.2, 2.8, -3);
    sponge.visible = false;
    scene.add(sponge);

    // ── Sparkle burst (submit animation) ─────────────────────────────────
    const SPARK = 300;
    const sparkMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffaa00,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sparkMesh = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.08, 0),
      sparkMat,
      SPARK
    );
    scene.add(sparkMesh);

    const sPos = new Float32Array(SPARK * 3);
    const sVel = new Float32Array(SPARK * 3);
    let sparkActive = false;
    let sparkTimer = 0;

    for (let i = 0; i < SPARK; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const spd   = 0.05 + Math.random() * 0.09;
      sVel[i * 3]     = Math.sin(phi) * Math.cos(theta) * spd;
      sVel[i * 3 + 1] = Math.abs(Math.sin(phi) * Math.sin(theta) * spd) + 0.02;
      sVel[i * 3 + 2] = Math.cos(phi) * spd;
      dummy.position.set(0, -50, 0);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      sparkMesh.setMatrixAt(i, dummy.matrix);
    }
    sparkMesh.instanceMatrix.needsUpdate = true;

    // ── Ambient pulsing light ─────────────────────────────────────────────
    const pulseLight = new THREE.PointLight(0x7c3aed, 0, 15);
    pulseLight.position.set(0, 3, 0);
    scene.add(pulseLight);

    // ── Resize handler ───────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Persistent lerp value outside loop ───────────────────────────────
    let currentClean = 0;
    let prevScore = 0;
    let t = 0;

    // ── Animate ──────────────────────────────────────────────────────────
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.016;

      const { cleanlinessScore: score, serviceSelected: svc, submitted: done } = stateRef.current;
      const targetClean = done ? 1 : score / 4;
      currentClean += (targetClean - currentClean) * 0.022;
      const cl = currentClean; // shorthand

      // ── Pulse light when score increases ──────────────────────────────
      if (score > prevScore) {
        pulseLight.intensity = 1.8;
        prevScore = score;
      }
      pulseLight.intensity *= 0.94;

      // ── Scene lighting ────────────────────────────────────────────────
      ambient.intensity = 0.22 + cl * 1.1;
      sun.intensity     = 0.35 + cl * 1.5;
      violetFill.intensity = Math.max(0.05, 0.6 - cl * 0.55);

      // ── Background + fog ──────────────────────────────────────────────
      (scene.background as THREE.Color).lerpColors(bgDirty, bgClean, cl * 0.65);
      (scene.fog as THREE.FogExp2).color.lerpColors(bgDirty, bgClean, cl * 0.65);

      // ── Room surfaces ─────────────────────────────────────────────────
      floorMat.color.lerpColors(dirtyFloor, cleanFloor, cl);
      floorMat.roughness  = 0.96 - cl * 0.84;
      floorMat.metalness  = 0.02 + cl * 0.06;
      wallMat.color.lerpColors(dirtyWall, cleanWall, cl);
      wallMat.roughness   = 0.92 - cl * 0.80;
      ceilMat.color.lerpColors(dirtyWall, cleanWall, cl);

      // ── Dust particles ────────────────────────────────────────────────
      const visibleDust = Math.max(0, Math.round(DUST * (1 - cl)));
      dustMat.opacity = 0.5 * (1 - cl * 0.92);

      for (let i = 0; i < DUST; i++) {
        if (i >= visibleDust) {
          dummy.position.set(0, -100, 0);
          dummy.scale.setScalar(0);
        } else {
          dPos[i * 3]     += dVel[i * 3];
          dPos[i * 3 + 1] += dVel[i * 3 + 1];
          dPos[i * 3 + 2] += dVel[i * 3 + 2];
          if (dPos[i * 3 + 1] > 6) {
            dPos[i * 3]     = (Math.random() - 0.5) * 14;
            dPos[i * 3 + 1] = 0.1;
            dPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
          }
          dummy.position.set(dPos[i * 3], dPos[i * 3 + 1], dPos[i * 3 + 2]);
          dummy.scale.setScalar(1);
        }
        dummy.updateMatrix();
        dustMesh.setMatrixAt(i, dummy.matrix);
      }
      dustMesh.instanceMatrix.needsUpdate = true;

      // ── Cleaning tools ────────────────────────────────────────────────
      const toolsVisible = svc !== "" || score >= 2;
      broom.visible = toolsVisible;
      spray.visible = toolsVisible;
      sponge.visible = toolsVisible;

      if (toolsVisible) {
        const wave = (offset: number) => Math.sin(t * 1.1 + offset) * 0.18;
        broom.position.y = 3.0 + wave(0);
        broom.rotation.y += 0.009;
        spray.position.y = 2.8 + wave(1.4);
        spray.rotation.y += 0.011;
        sponge.position.y = 2.8 + wave(2.7);
        sponge.rotation.y += 0.007;
      }

      // ── Camera orbit ──────────────────────────────────────────────────
      if (done) {
        camTarget.set(0, 11, 17);
      } else {
        orbitAngle += 0.0015;
        camTarget.set(
          Math.sin(orbitAngle) * 1.8,
          7.5,
          11 + Math.cos(orbitAngle) * 1.8
        );
      }
      camera.position.lerp(camTarget, 0.028);
      camera.lookAt(0, 1, 0);

      // ── Sparkle burst ─────────────────────────────────────────────────
      if (done && !sparkActive) {
        sparkActive = true;
        sparkTimer = 0;
        for (let i = 0; i < SPARK; i++) {
          sPos[i * 3] = 0;
          sPos[i * 3 + 1] = 1.5;
          sPos[i * 3 + 2] = 0;
        }
      }
      if (sparkActive) {
        sparkTimer += 0.016;
        sparkMat.opacity = Math.max(0, 1 - sparkTimer / 2.2);
        for (let i = 0; i < SPARK; i++) {
          sPos[i * 3]     += sVel[i * 3];
          sPos[i * 3 + 1] += sVel[i * 3 + 1];
          sPos[i * 3 + 2] += sVel[i * 3 + 2];
          sVel[i * 3 + 1] -= 0.0012; // gravity
          dummy.position.set(sPos[i * 3], sPos[i * 3 + 1], sPos[i * 3 + 2]);
          const s = Math.max(0, 1 - sparkTimer / 2.4);
          dummy.scale.setScalar(s);
          dummy.updateMatrix();
          sparkMesh.setMatrixAt(i, dummy.matrix);
        }
        sparkMesh.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      aria-hidden="true"
    />
  );
}
