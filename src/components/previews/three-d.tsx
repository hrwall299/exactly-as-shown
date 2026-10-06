import { useRef, type CSSProperties, type PointerEvent } from "react";
import orb from "@/assets/hero-orb.jpg";

export function useTilt(max = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.02)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  };
  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

export function TiltCard() {
  const tilt = useTilt(18);
  return (
    <div
      {...tilt}
      className="relative h-36 w-28 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-glow transition-transform duration-300 ease-out will-change-transform"
    >
      <img src={orb} alt="" className="h-full w-full object-cover" loading="lazy" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), oklch(1 0 0 / 35%), transparent 50%)" }}
      />
    </div>
  );
}

export function FlipCard() {
  return (
    <div className="group h-32 w-28 [perspective:800px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 grid place-items-center rounded-2xl bg-brand font-display text-sm font-semibold text-primary-foreground [backface-visibility:hidden]">
          Hover me
        </div>
        <div className="absolute inset-0 grid place-items-center rounded-2xl border border-border bg-surface-2 text-xs text-muted-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
          Back side ✦
        </div>
      </div>
    </div>
  );
}

export function Cube() {
  const face = "absolute inset-0 grid place-items-center rounded-lg border border-brand-c/40 bg-brand-a/15 backdrop-blur-sm";
  const s = 64;
  const faces: CSSProperties[] = [
    { transform: `translateZ(${s / 2}px)` },
    { transform: `rotateY(180deg) translateZ(${s / 2}px)` },
    { transform: `rotateY(90deg) translateZ(${s / 2}px)` },
    { transform: `rotateY(-90deg) translateZ(${s / 2}px)` },
    { transform: `rotateX(90deg) translateZ(${s / 2}px)` },
    { transform: `rotateX(-90deg) translateZ(${s / 2}px)` },
  ];
  return (
    <div className="[perspective:600px]">
      <div className="anim-cube relative [transform-style:preserve-3d]" style={{ width: s, height: s }}>
        {faces.map((st, i) => (
          <div key={i} className={face} style={st} />
        ))}
      </div>
    </div>
  );
}

export function LayeredCard() {
  const tilt = useTilt(20);
  return (
    <div {...tilt} className="relative h-32 w-40 rounded-2xl border border-border bg-surface transition-transform duration-300 [transform-style:preserve-3d]">
      <div className="absolute inset-3 rounded-xl bg-brand opacity-40 [transform:translateZ(20px)]" />
      <div className="absolute inset-6 rounded-lg glass [transform:translateZ(40px)]" />
      <div className="absolute inset-0 grid place-items-center font-display text-sm font-semibold [transform:translateZ(60px)]">Depth</div>
    </div>
  );
}

export function PerspectiveGrid() {
  return (
    <div className="relative h-full w-full overflow-hidden [perspective:300px]">
      <div className="absolute inset-x-[-50%] bottom-[-40%] h-[140%] bg-grid [transform:rotateX(60deg)] anim-marquee" style={{ backgroundSize: "28px 28px", width: "200%" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background" />
      <div className="absolute inset-x-0 top-1/3 text-center font-display text-lg font-bold text-gradient">Horizon</div>
    </div>
  );
}

export function Text3D({ text = "DEPTH" }: { text?: string | undefined }) {
  const shadow = Array.from({ length: 8 }, (_, i) => `${i + 1}px ${i + 1}px 0 color-mix(in oklab, var(--brand-a) ${70 - i * 7}%, transparent)`).join(",");
  return (
    <div className="font-display text-3xl font-black tracking-tight transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1" style={{ textShadow: shadow }}>
      {text}
    </div>
  );
}
