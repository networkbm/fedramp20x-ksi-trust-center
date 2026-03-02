"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

export default function DataWebFX() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const density = 0.00006;
    const maxLinkDist = 150;
    const maxLinkDist2 = maxLinkDist * maxLinkDist;

    function resize() {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.min(90, Math.floor(w * h * density)));
      if (nodesRef.current.length !== count) {
        const next: Node[] = [];
        for (let i = 0; i < count; i++) {
          const r = 1.1 + Math.random() * 1.4;
          next.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r
          });
        }
        nodesRef.current = next;
      }
    }

    function step() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const nodes = nodesRef.current;

      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0) {
          a.x = 0;
          a.vx *= -1;
        } else if (a.x > w) {
          a.x = w;
          a.vx *= -1;
        }

        if (a.y < 0) {
          a.y = 0;
          a.vy *= -1;
        } else if (a.y > h) {
          a.y = h;
          a.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxLinkDist2) continue;

          const t = 1 - d2 / maxLinkDist2;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(148,163,184,${0.09 * t})`;
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148,163,184,0.18)";
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      raf.current = window.requestAnimationFrame(step);
    }

    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    if (!prefersReduced) {
      raf.current = window.requestAnimationFrame(step);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-[0.32]"
      aria-hidden="true"
    />
  );
}
