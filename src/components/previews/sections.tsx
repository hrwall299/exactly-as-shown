import { useEffect, useRef, useState, type PointerEvent } from "react";

export function Marquee() {
  const items = ["React", "Tailwind", "Motion", "GSAP", "Three.js", "TypeScript"];
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]">
      <div className="anim-marquee flex w-max gap-3">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="rounded-full border border-border bg-surface px-3 py-1 text-xs">{t}</span>
        ))}
      </div>
    </div>
  );
}

export function AnimatedNavbar() {
  const links = ["Home", "Work", "Blog", "Contact"];
  const [active, setActive] = useState(0);
  return (
    <nav className="glass relative flex rounded-full p-1">
      <span className="absolute inset-y-1 rounded-full bg-brand transition-all duration-300" style={{ left: `calc(${active * 25}% + 4px)`, width: "calc(25% - 8px)" }} />
      {links.map((l, i) => (
        <button key={l} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="relative z-10 w-16 py-1.5 text-xs font-medium">
          {l}
        </button>
      ))}
    </nav>
  );
}

export function ScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<number[]>([]);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen((s) => [...new Set([...s, Number((e.target as HTMLElement).dataset['i'])])])),
      { root, threshold: 0.5 },
    );
    root.querySelectorAll("[data-i]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-full w-full overflow-y-auto px-6 py-4">
      <p className="mb-2 text-center text-[10px] text-muted-foreground">scroll ↓</p>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} data-i={i} className={`mb-3 h-10 rounded-lg border border-border bg-surface-2 transition-all duration-700 ${seen.includes(i) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} />
      ))}
    </div>
  );
}

export function Bento() {
  return (
    <div className="grid h-32 w-52 grid-cols-3 grid-rows-2 gap-1.5">
      <div className="col-span-2 rounded-lg bg-brand opacity-80 transition-transform hover:scale-[1.03]" />
      <div className="rounded-lg glass transition-transform hover:scale-[1.05]" />
      <div className="rounded-lg glass transition-transform hover:scale-[1.05]" />
      <div className="col-span-2 rounded-lg border border-border bg-surface-2 transition-transform hover:scale-[1.03]" />
    </div>
  );
}

export function Timeline() {
  return (
    <div className="relative w-48 pl-5">
      <div className="absolute bottom-0 left-1.5 top-0 w-px bg-gradient-to-b from-brand-a to-brand-c" />
      {["Design", "Build", "Ship"].map((t, i) => (
        <div key={t} className="anim-fade-up relative mb-3" style={{ animationDelay: `${i * 0.2}s` }}>
          <span className="absolute -left-[18px] top-1 h-2.5 w-2.5 rounded-full bg-brand-c shadow-glow" />
          <div className="text-xs font-semibold">{t}</div>
          <div className="text-[10px] text-muted-foreground">Step {i + 1}</div>
        </div>
      ))}
    </div>
  );
}

export function FooterPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="relative border-t border-border bg-surface px-4 py-3">
        <div className="absolute inset-x-0 top-0 h-px bg-brand anim-gradient" />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="font-display text-xs font-semibold text-foreground">Brand</span>
          <div className="flex gap-3">{["Docs", "Blog", "GitHub"].map((l) => <span key={l} className="transition-colors hover:text-brand-c">{l}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const quotes = ["“Shipped our landing in a day.”", "“The effects are buttery smooth.”", "“Copy, paste, done.”"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 2500);
    return () => clearInterval(id);
  }, [quotes.length]);
  return (
    <div key={i} className="anim-fade-up w-52 rounded-2xl glass p-4 text-center text-sm">
      {quotes[i]}
      <div className="mt-2 flex justify-center gap-1">{quotes.map((_, j) => <span key={j} className={`h-1 rounded-full transition-all ${j === i ? "w-4 bg-brand-c" : "w-1 bg-muted-foreground"}`} />)}</div>
    </div>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex w-56 rounded-full border border-border bg-surface p-1 focus-within:border-brand-b focus-within:shadow-glow transition-all">
      <input placeholder="you@email.com" className="min-w-0 flex-1 bg-transparent px-3 text-xs outline-none" />
      <button className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground">{done ? "✓" : "Join"}</button>
    </form>
  );
}

export function OrbitLoader() {
  return (
    <div className="relative h-16 w-16">
      <div className="anim-spin absolute inset-0 rounded-full border-2 border-transparent border-t-brand-a border-r-brand-c [animation-duration:calc(1s*var(--fx-speed))]" />
      <div className="anim-spin absolute inset-3 rounded-full border-2 border-transparent border-b-brand-b [animation-direction:reverse] [animation-duration:calc(1.4s*var(--fx-speed))]" />
    </div>
  );
}

export function DotsLoader() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => <span key={i} className="anim-bounce-dot h-3 w-3 rounded-full bg-brand-c" style={{ animationDelay: `${i * 0.15}s` }} />)}
    </div>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} className="relative grid h-full w-full place-items-center bg-dots" style={{ ["--x" as string]: "50%", ["--y" as string]: "50%" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120px circle at var(--x) var(--y), color-mix(in oklab, var(--brand-a) 45%, transparent), transparent 70%)" }} />
      <span className="relative text-xs text-muted-foreground">Move cursor here</span>
    </div>
  );
}
