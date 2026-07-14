"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import { resolveStudyConfig, type StudyVariant } from "@/features/three/study-config";

interface ArchitecturalStudyProps {
  className?: string;
  /** "plate" (default) for bordered figures, "hero" for the full-bleed hero framing. */
  variant?: StudyVariant;
}

/**
 * A quiet wireframe maquette — staggered volumes on slender columns,
 * drawn in the ink of the drawing-set language. It rotates slowly on
 * idle, turns further as the section scrolls past (camera-through-space),
 * and drifts subtly with the pointer.
 *
 * Rendering pauses while offscreen; reduced motion renders one static
 * frame at the resting angle.
 */
export function ArchitecturalStudy({ className, variant = "plate" }: ArchitecturalStudyProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const { colors, camera: cameraConfig, motion, structure, renderer: rendererConfig } =
      resolveStudyConfig(variant);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, rendererConfig.maxPixelRatio));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraConfig.fov, 1, 0.1, 100);
    camera.position.set(cameraConfig.position[0], cameraConfig.position[1], cameraConfig.position[2]);
    camera.lookAt(cameraConfig.lookAt[0], cameraConfig.lookAt[1], cameraConfig.lookAt[2]);

    const inkMaterial = new THREE.LineBasicMaterial({
      color: colors.line,
      opacity: colors.lineOpacity,
      transparent: true,
    });
    const gridMaterial = new THREE.LineBasicMaterial({
      color: colors.line,
      opacity: colors.gridOpacity,
      transparent: true,
    });

    const group = new THREE.Group();
    scene.add(group);

    const addEdges = (geometry: THREE.BufferGeometry, position: readonly [number, number, number]) => {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), inkMaterial);
      edges.position.set(...position);
      group.add(edges);
      geometry.dispose();
    };

    for (const [width, height, depth, x, y, z] of structure.volumes) {
      addEdges(new THREE.BoxGeometry(width, height, depth), [x, y, z]);
    }

    for (const [x, y, z] of structure.columns.positions) {
      addEdges(new THREE.BoxGeometry(...structure.columns.size), [x, y - 0.45, z]);
    }

    addEdges(new THREE.BoxGeometry(...structure.plinth.size), structure.plinth.position);

    const { halfExtent, step, y: gridY } = structure.grid;

    for (let index = -halfExtent; index <= halfExtent; index += 1) {
      const along = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(index * step, gridY, -halfExtent * step),
        new THREE.Vector3(index * step, gridY, halfExtent * step),
      ]);
      const across = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-halfExtent * step, gridY, index * step),
        new THREE.Vector3(halfExtent * step, gridY, index * step),
      ]);

      group.add(new THREE.Line(along, gridMaterial), new THREE.Line(across, gridMaterial));
    }

    const resize = () => {
      const { clientWidth, clientHeight } = host;

      if (clientWidth === 0 || clientHeight === 0) {
        return;
      }

      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // --- static frame for reduced motion --------------------------------
    if (prefersReducedMotion) {
      group.rotation.y = motion.restingAngle;
      renderer.render(scene, camera);

      return () => {
        resizeObserver.disconnect();
        scene.traverse((object) => {
          if (object instanceof THREE.Line) {
            object.geometry.dispose();
          }
        });
        inkMaterial.dispose();
        gridMaterial.dispose();
        renderer.dispose();
        host.removeChild(renderer.domElement);
      };
    }

    // --- animated path ----------------------------------------------------
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      );
    };

    window.addEventListener("pointermove", handlePointerMove);

    let scrollProgress = 0;
    const scrollTrigger = ScrollTrigger.create({
      trigger: host,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsed = clock.getElapsedTime();

      pointer.lerp(pointerTarget, motion.pointerEase);

      group.rotation.y =
        motion.restingAngle +
        elapsed * motion.idleRotationSpeed +
        scrollProgress * motion.scrollRotation +
        pointer.x * motion.pointerDrift;
      group.rotation.x = pointer.y * motion.pointerDrift * 0.4;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(renderLoop);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry?.isIntersecting ?? false;

      if (nextVisible && !visible) {
        clock.start();
        frame = requestAnimationFrame(renderLoop);
      }

      if (!nextVisible && visible) {
        cancelAnimationFrame(frame);
      }

      visible = nextVisible;
    });
    visibilityObserver.observe(host);

    frame = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      scrollTrigger.kill();
      scene.traverse((object) => {
        if (object instanceof THREE.Line) {
          object.geometry.dispose();
        }
      });
      inkMaterial.dispose();
      gridMaterial.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [prefersReducedMotion, variant]);

  return (
    <div
      aria-hidden="true"
      className={cn("h-full w-full [&>canvas]:h-full [&>canvas]:w-full", className)}
      ref={hostRef}
    />
  );
}
