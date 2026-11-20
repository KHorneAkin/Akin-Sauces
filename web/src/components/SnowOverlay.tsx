"use client";

import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  radius: number;
  fall: number; // px per second
  sway: number; // horizontal drift strength
  swaySpeed: number; // radians per second
  phase: number;
  alpha: number;
  crystal: boolean;
  rotation: number;
  spin: number; // radians per second
};

const MIN_FLAKES = 40;
const MAX_FLAKES = 110;

/**
 * Safety net so the snow turns itself off after the holidays even if the
 * HOLIDAY_THEME_ENABLED flag is forgotten: mid-November through Jan 6.
 */
function isHolidaySeason(date: Date) {
  const month = date.getMonth(); // 0 = Jan
  const day = date.getDate();
  return (month === 10 && day >= 15) || month === 11 || (month === 0 && day <= 6);
}

function makeFlake(width: number, height: number, anywhere: boolean): Flake {
  const crystal = Math.random() < 0.18;
  const radius = crystal ? 5 + Math.random() * 5 : 1 + Math.random() * 2.6;
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -radius * 2 - Math.random() * 60,
    radius,
    // Bigger flakes read as closer, so they fall a little faster.
    fall: 28 + radius * 7 + Math.random() * 22,
    sway: 6 + Math.random() * 20,
    swaySpeed: 0.4 + Math.random() * 1,
    phase: Math.random() * Math.PI * 2,
    alpha: crystal ? 0.55 + Math.random() * 0.3 : 0.35 + Math.random() * 0.5,
    crystal,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.8,
  };
}

function drawCrystal(ctx: CanvasRenderingContext2D, flake: Flake) {
  const { radius } = flake;
  ctx.save();
  ctx.translate(flake.x, flake.y);
  ctx.rotate(flake.rotation);
  ctx.strokeStyle = `rgba(255, 255, 255, ${flake.alpha})`;
  ctx.lineWidth = Math.max(1, radius * 0.16);
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius);
    ctx.moveTo(0, radius * 0.55);
    ctx.lineTo(radius * 0.28, radius * 0.82);
    ctx.moveTo(0, radius * 0.55);
    ctx.lineTo(-radius * 0.28, radius * 0.82);
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Seasonal snowfall drawn on a fixed, click-through canvas above the whole
 * site. Purely decorative: it never blocks clicks, respects reduced-motion
 * (shows a still scatter of snow instead), and pauses when the tab is hidden.
 */
export function SnowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (!isHolidaySeason(new Date())) return;

    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frameId = 0;
    let last = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const flake of flakes) {
        if (flake.crystal) {
          drawCrystal(ctx, flake);
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = (dt: number) => {
      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        flake.y += flake.fall * dt;
        flake.phase += flake.swaySpeed * dt;
        flake.x += Math.cos(flake.phase) * flake.sway * dt;
        flake.rotation += flake.spin * dt;
        if (flake.x < -20) flake.x = width + 20;
        if (flake.x > width + 20) flake.x = -20;
        if (flake.y > height + 20) flakes[i] = makeFlake(width, height, false);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(MAX_FLAKES, Math.max(MIN_FLAKES, Math.round(width / 14)));
      while (flakes.length < target) flakes.push(makeFlake(width, height, true));
      if (flakes.length > target) flakes = flakes.slice(0, target);

      if (!animate) draw();
    };

    const frame = (now: number) => {
      // Clamp dt so a backgrounded tab doesn't make the snow jump on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      draw();
      frameId = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (animate) frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full print:hidden"
    />
  );
}
