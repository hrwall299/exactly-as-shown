import { useRef, type PointerEvent } from "react";

export function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const move = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.35}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  return (
    <div className="grid h-full w-full place-items-center" onPointerMove={move} onPointerLeave={() => ref.current && (ref.current.style.transform = "")}>
      <button ref={ref} className="rounded-full bg-brand px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-200 ease-out">
        Magnetic
      </button>
    </div>
  );
}

export function NeonButton() {
  return (
    <button className="rounded-xl border border-brand-c px-6 py-3 font-display text-sm font-semibold text-brand-c transition-all duration-300 hover:bg-brand-c hover:text-background hover:shadow-[0_0_30px_var(--brand-c)]">
      Neon Glow
    </button>
  );
}

export function ShimmerButton() {
  return (
    <button className="relative overflow-hidden rounded-xl bg-surface-2 px-6 py-3 font-display text-sm font-semibold border-spin">
      <span className="anim-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <span className="relative">Shimmer</span>
    </button>
  );
}

export function LiquidButton() {
  return (
    <button className="group relative overflow-hidden rounded-full border border-brand-b px-6 py-3 font-display text-sm font-semibold">
      <span className="absolute inset-x-[-20%] top-full h-[200%] rounded-[40%] bg-brand transition-all duration-700 ease-out group-hover:top-[-40%] anim-spin" />
      <span className="relative transition-colors group-hover:text-primary-foreground">Liquid Fill</span>
    </button>
  );
}

export function PulseButton() {
  return (
    <button className="relative rounded-full bg-brand-b px-6 py-3 font-display text-sm font-semibold text-primary-foreground">
      <span className="anim-pulse-ring absolute inset-0 rounded-full bg-brand-b" />
      <span className="relative">Pulse</span>
    </button>
  );
}
