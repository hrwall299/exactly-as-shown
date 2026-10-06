import { useEffect, useRef } from "react";

export function Aurora() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="anim-aurora absolute -inset-1/4 opacity-70 blur-3xl" style={{ background: "conic-gradient(from 90deg at 40% 50%, var(--brand-a), var(--brand-b), var(--brand-c), var(--brand-a))" }} />
      <div className="absolute inset-0 grid place-items-center font-display text-lg font-semibold">Aurora</div>
    </div>
  );
}

export function GradientMesh() {
  return (
    <div className="anim-gradient grid h-full w-full place-items-center font-display font-semibold text-primary-foreground" style={{ backgroundImage: "linear-gradient(120deg, var(--brand-a), var(--brand-b), var(--brand-c), var(--brand-a))" }}>
      Gradient Flow
    </div>
  );
}

export function Particles({ count = 40 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = (c.width = c.offsetWidth * 2);
    let h = (c.height = c.offsetHeight * 2);
    const color = getComputedStyle(c).color;
    const pts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8 }));
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver((es) => (visible = !!es[0]?.isIntersecting));
    io.observe(c);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      w = c.width; h = c.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const p of pts) {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) { const a = pts[i]!, b = pts[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.globalAlpha = 1 - d / 120;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
    };
    draw();
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [count]);
  return <canvas ref={ref} className="h-full w-full text-brand-c" />;
}

export function Blob() {
  return <div className="anim-blob h-24 w-24 bg-brand shadow-glow" />;
}

export function GridGlow() {
  return (
    <div className="relative h-full w-full bg-grid">
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-b/40 blur-3xl anim-float" />
    </div>
  );
}
