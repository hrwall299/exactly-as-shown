import { useEffect, useRef, useState, type PointerEvent } from "react";
import orb from "@/assets/hero-orb.jpg";

export function GlassCard() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      <div className="anim-blob absolute h-20 w-20 -translate-x-10 bg-brand-a" />
      <div className="anim-blob absolute h-16 w-16 translate-x-12 translate-y-6 bg-brand-c [animation-delay:-3s]" />
      <div className="glass relative w-40 rounded-2xl p-4">
        <div className="h-2 w-12 rounded bg-foreground/60" />
        <div className="mt-2 h-2 w-20 rounded bg-foreground/30" />
        <div className="mt-4 font-display text-sm font-semibold">Frosted glass</div>
      </div>
    </div>
  );
}

export function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="group relative h-32 w-48 overflow-hidden rounded-2xl border border-border bg-surface p-4"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(180px circle at var(--x) var(--y), color-mix(in oklab, var(--brand-b) 40%, transparent), transparent 70%)" }} />
      <div className="relative font-display text-sm font-semibold">Spotlight</div>
      <div className="relative mt-1 text-xs text-muted-foreground">Move your cursor</div>
    </div>
  );
}

export function GradientBorderCard() {
  return (
    <div className="border-spin grid h-28 w-44 place-items-center rounded-2xl bg-surface font-display text-sm font-semibold">
      Animated Border
    </div>
  );
}

export function ShinyCard() {
  return (
    <div className="group relative h-28 w-44 overflow-hidden rounded-2xl bg-brand p-4 text-primary-foreground">
      <span className="anim-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
      <div className="relative font-display font-semibold">Pro Card</div>
      <div className="relative text-xs opacity-80">Shiny sweep</div>
    </div>
  );
}

export function ImageHover() {
  return (
    <div className="group relative h-32 w-48 overflow-hidden rounded-2xl">
      <img src={orb} alt="" loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3 group-hover:saturate-150" />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="font-display text-sm font-semibold">Zoom + reveal</span>
      </div>
    </div>
  );
}

export function ExpandableCard() {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-48 rounded-2xl border border-border bg-surface p-4 text-left transition-all duration-500" style={{ height: open ? 130 : 64 }}>
      <div className="flex items-center justify-between font-display text-sm font-semibold">
        Expand me <span className={`transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </div>
      <p className={`mt-2 text-xs text-muted-foreground transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>Smooth height transitions with content fade.</p>
    </button>
  );
}

export function PricingCard() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="w-48 rounded-2xl border border-border bg-surface p-4 transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        Pro
        <button onClick={() => setYearly(!yearly)} className={`relative h-4 w-8 rounded-full transition-colors ${yearly ? "bg-brand-b" : "bg-muted"}`}>
          <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-foreground transition-all ${yearly ? "left-4" : "left-0.5"}`} />
        </button>
      </div>
      <div className="mt-2 font-display text-2xl font-bold">${yearly ? 96 : 12}<span className="text-xs font-normal text-muted-foreground">/{yearly ? "yr" : "mo"}</span></div>
      <div className="mt-3 rounded-lg bg-brand py-1.5 text-center text-xs font-semibold text-primary-foreground">Upgrade</div>
    </div>
  );
}

export function FloatingCards() {
  return (
    <div className="relative h-32 w-48">
      {[0, 1, 2].map((i) => (
        <div key={i} className="anim-float glass absolute h-20 w-28 rounded-xl" style={{ left: i * 28, top: i * 14, animationDelay: `${-i * 1.5}s` }} />
      ))}
    </div>
  );
}

export function StatCounter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= 500 ? 0 : v + 10)), 30);
    return () => clearInterval(id);
  }, []);
  return <div className="font-display text-4xl font-bold text-gradient">{n}+</div>;
}
