export type Category =
  | "3d" | "cards" | "buttons" | "navbars" | "footers" | "animations" | "backgrounds"
  | "text" | "scroll" | "sections" | "forms" | "loaders" | "cursor" | "image";

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "3d", label: "3D" },
  { id: "cards", label: "Cards" },
  { id: "buttons", label: "Buttons" },
  { id: "navbars", label: "Navbars" },
  { id: "footers", label: "Footers" },
  { id: "animations", label: "Animations" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "text", label: "Text Effects" },
  { id: "scroll", label: "Scroll Effects" },
  { id: "sections", label: "Sections" },
  { id: "forms", label: "Forms" },
  { id: "loaders", label: "Loaders" },
  { id: "cursor", label: "Cursor Effects" },
  { id: "image", label: "Image Effects" },
];

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Effect = {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  tech: string[];
  preview: string;
  difficulty: Difficulty;
  pro?: boolean;
  isNew?: boolean;
  editableText?: string;
  code: string; // uses {{TEXT}}, {{HUE}}, {{SPEED}} placeholders
};

const css = ["React", "Tailwind"];

export const EFFECTS: Effect[] = [
  {
    slug: "3d-tilt-card", name: "3D Tilt Card", category: "3d", preview: "tilt-card", difficulty: "Intermediate", isNew: true,
    description: "Perspective card that tilts toward the cursor with a moving glare.",
    tags: ["3d", "hover", "card", "tilt"], tech: [...css, "TypeScript"],
    code: `import { useRef } from "react";

export function TiltCard({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current!.style.transform =
      \`perspective(900px) rotateX(\${-y * 18}deg) rotateY(\${x * 18}deg)\`;
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => (ref.current!.style.transform = "")}
      className="rounded-2xl overflow-hidden transition-transform duration-300 ease-out"
      style={{ boxShadow: "0 20px 60px -20px oklch(0.66 0.24 {{HUE}})" }}
    >
      <img src={src} className="w-full h-full object-cover" />
    </div>
  );
}`,
  },
  {
    slug: "3d-flip-card", name: "3D Flip Card", category: "3d", preview: "flip-card", difficulty: "Beginner",
    description: "Two-sided card that flips on hover or tap using CSS 3D transforms.",
    tags: ["3d", "hover", "card", "flip"], tech: css,
    code: `<div className="group h-64 w-48 [perspective:800px]">
  <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.66_0.24_{{HUE}})] to-cyan-400 [backface-visibility:hidden]">Front</div>
    <div className="absolute inset-0 rounded-2xl bg-zinc-900 [backface-visibility:hidden] [transform:rotateY(180deg)]">Back</div>
  </div>
</div>`,
  },
  {
    slug: "3d-cube", name: "3D Cube", category: "3d", preview: "cube", difficulty: "Intermediate",
    description: "Glass cube rotating endlessly with pure CSS preserve-3d.",
    tags: ["3d", "animation", "cube"], tech: ["HTML/CSS", "Tailwind"],
    code: `.scene { perspective: 600px; }
.cube { width: 64px; height: 64px; position: relative; transform-style: preserve-3d;
  animation: spin calc(10s * {{SPEED}}) linear infinite; }
.face { position: absolute; inset: 0; border: 1px solid oklch(0.82 0.14 205 / .4);
  background: oklch(0.66 0.24 {{HUE}} / .15); }
.face:nth-child(1) { transform: translateZ(32px); }
.face:nth-child(2) { transform: rotateY(180deg) translateZ(32px); }
.face:nth-child(3) { transform: rotateY(90deg) translateZ(32px); }
.face:nth-child(4) { transform: rotateY(-90deg) translateZ(32px); }
.face:nth-child(5) { transform: rotateX(90deg) translateZ(32px); }
.face:nth-child(6) { transform: rotateX(-90deg) translateZ(32px); }
@keyframes spin { from { transform: rotateX(-20deg) rotateY(0) } to { transform: rotateX(-20deg) rotateY(360deg) } }`,
  },
  {
    slug: "layered-depth-card", name: "Layered Depth Card", category: "3d", preview: "layered-card", difficulty: "Advanced", pro: true,
    description: "Stacked layers separated on the Z axis for a parallax depth tilt.",
    tags: ["3d", "hover", "card", "parallax"], tech: [...css, "TypeScript"],
    code: `// Parent uses the TiltCard hook; children use translateZ for depth
<div className="[transform-style:preserve-3d]">
  <div className="[transform:translateZ(20px)]" />
  <div className="[transform:translateZ(40px)] backdrop-blur" />
  <h3 className="[transform:translateZ(60px)]">Depth</h3>
</div>`,
  },
  {
    slug: "perspective-grid", name: "Perspective Grid", category: "backgrounds", preview: "perspective-grid", difficulty: "Intermediate",
    description: "Retro-futuristic receding grid that scrolls into the horizon.",
    tags: ["3d", "background", "grid"], tech: ["HTML/CSS", "Tailwind"],
    code: `.grid-floor { perspective: 300px; overflow: hidden; }
.grid-floor::before { content: ""; position: absolute; inset: -50% -50% -40%;
  background-image: linear-gradient(#fff1 1px, transparent 1px), linear-gradient(90deg, #fff1 1px, transparent 1px);
  background-size: 28px 28px; transform: rotateX(60deg);
  animation: move calc(18s * {{SPEED}}) linear infinite; }
@keyframes move { to { background-position: 0 280px; } }`,
  },
  {
    slug: "3d-text", name: "3D Text", category: "text", preview: "text-3d", difficulty: "Beginner", editableText: "DEPTH",
    description: "Extruded type built from stacked text-shadows.",
    tags: ["3d", "text", "typography"], tech: ["HTML/CSS"],
    code: `<h1 class="text-3d">{{TEXT}}</h1>
<style>
.text-3d { font: 900 4rem system-ui;
  text-shadow: 1px 1px 0 oklch(0.66 0.24 {{HUE}}), 2px 2px 0 oklch(0.6 0.24 {{HUE}}),
    3px 3px 0 oklch(0.55 0.24 {{HUE}}), 4px 4px 0 oklch(0.5 0.24 {{HUE}}); }
</style>`,
  },
  {
    slug: "animated-gradient-text", name: "Animated Gradient Text", category: "text", preview: "gradient-text", difficulty: "Beginner", editableText: "Build Something Amazing",
    description: "Headline with a looping multi-color gradient fill.",
    tags: ["text", "gradient", "typography"], tech: css,
    code: `<h1 className="bg-[linear-gradient(90deg,oklch(0.66_0.24_{{HUE}}),#3b82f6,#22d3ee,oklch(0.66_0.24_{{HUE}}))] bg-[length:300%_auto] bg-clip-text text-transparent animate-[gradient_6s_linear_infinite]">
  {{TEXT}}
</h1>
/* @keyframes gradient { to { background-position: 300% center } } */`,
  },
  {
    slug: "text-reveal", name: "Text Reveal", category: "text", preview: "text-reveal", difficulty: "Beginner", editableText: "Build Something Amazing",
    description: "Words rise in sequence with a blur-to-sharp stagger.",
    tags: ["text", "animation", "entrance", "reveal"], tech: [...css, "Motion"],
    code: `import { motion } from "motion/react";

export function TextReveal({ text = "{{TEXT}}" }) {
  return (
    <h2 className="flex flex-wrap gap-x-3">
      {text.split(" ").map((w, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.12 * {{SPEED}}, duration: 0.8 }}>
          {w}
        </motion.span>
      ))}
    </h2>
  );
}`,
  },
  {
    slug: "text-scramble", name: "Text Scramble", category: "text", preview: "text-scramble", difficulty: "Intermediate", isNew: true, editableText: "Build Something Amazing",
    description: "Hacker-style decode that resolves characters left to right.",
    tags: ["text", "animation", "scramble"], tech: [...css, "TypeScript"],
    code: `const CHARS = "!<>-_\\\\/[]{}=+*^?#0123456789";
export function useScramble(text = "{{TEXT}}") {
  const [out, setOut] = useState(text);
  useEffect(() => {
    let frame = 0, raf = 0;
    const tick = () => {
      frame++;
      setOut(text.split("").map((c, i) => i < frame / 2 || c === " " ? c
        : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      if (frame / 2 < text.length) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return out;
}`,
  },
  {
    slug: "glitch-text", name: "Glitch Text", category: "text", preview: "glitch-text", difficulty: "Intermediate", editableText: "GLITCH",
    description: "RGB-split glitch with clipped, jittering layers.",
    tags: ["text", "animation", "glitch"], tech: ["HTML/CSS"],
    code: `<h1 class="glitch" data-text="{{TEXT}}">{{TEXT}}</h1>
<style>
.glitch { position: relative; }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0;
  animation: glitch calc(2.2s * {{SPEED}}) steps(1) infinite; }
.glitch::before { color: oklch(0.66 0.24 {{HUE}}); transform: translate(2px,0); }
.glitch::after { color: #22d3ee; animation-delay: .3s; }
@keyframes glitch { 20% { clip-path: inset(10% 0 60% 0) } 40% { clip-path: inset(50% 0 20% 0) } 60% { clip-path: inset(30% 0 40% 0) } }
</style>`,
  },
  {
    slug: "typewriter-text", name: "Typewriter Text", category: "text", preview: "typewriter", difficulty: "Beginner", editableText: "Build Something Amazing",
    description: "Classic typing animation with a blinking caret.",
    tags: ["text", "animation", "typing"], tech: [...css, "TypeScript"],
    code: `export function Typewriter({ text = "{{TEXT}}" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN(v => v > text.length ? 0 : v + 1), 90 * {{SPEED}});
    return () => clearInterval(id);
  }, [text]);
  return <span className="font-mono">{text.slice(0, n)}<span className="animate-pulse">|</span></span>;
}`,
  },
  {
    slug: "stroke-fill-text", name: "Stroke Fill Text", category: "text", preview: "stroke-text", difficulty: "Beginner", editableText: "OUTLINE",
    description: "Outlined type that fills with gradient on hover.",
    tags: ["text", "hover", "stroke"], tech: css,
    code: `<h1 className="group relative text-transparent [-webkit-text-stroke:1px_#22d3ee]">
  {{TEXT}}
  <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.66_0.24_{{HUE}})] to-cyan-400 bg-clip-text [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 group-hover:[clip-path:inset(0)]">{{TEXT}}</span>
</h1>`,
  },
  {
    slug: "highlight-text", name: "Highlight Text", category: "text", preview: "highlight-text", difficulty: "Beginner", editableText: "Ship faster",
    description: "Marker-style gradient highlight that sweeps under words.",
    tags: ["text", "animation", "highlight"], tech: css,
    code: `<span className="relative">
  <span className="absolute inset-x-0 bottom-1 h-3 bg-gradient-to-r from-[oklch(0.66_0.24_{{HUE}})] to-cyan-400 opacity-60 origin-left animate-[grow_1.2s_ease_both]" />
  <span className="relative">{{TEXT}}</span>
</span>`,
  },
  {
    slug: "magnetic-button", name: "Magnetic Button", category: "buttons", preview: "magnetic-button", difficulty: "Intermediate",
    description: "Button that's pulled toward the cursor with a springy release.",
    tags: ["button", "hover", "magnetic", "cursor"], tech: [...css, "TypeScript"],
    code: `export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.transform = \`translate(\${(e.clientX - r.left - r.width/2) * .35}px, \${(e.clientY - r.top - r.height/2) * .35}px)\`;
      }}
      onPointerLeave={() => (ref.current!.style.transform = "")}
      className="rounded-full px-6 py-3 bg-[oklch(0.66_0.24_{{HUE}})] text-white transition-transform duration-200">
      {children}
    </button>
  );
}`,
  },
  {
    slug: "neon-button", name: "Neon Button", category: "buttons", preview: "neon-button", difficulty: "Beginner",
    description: "Outlined button that ignites with a neon glow on hover.",
    tags: ["button", "hover", "glow", "neon"], tech: css,
    code: `<button className="rounded-xl border border-cyan-400 px-6 py-3 text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_theme(colors.cyan.400)]">
  Neon Glow
</button>`,
  },
  {
    slug: "shimmer-button", name: "Shimmer Button", category: "buttons", preview: "shimmer-button", difficulty: "Beginner", isNew: true,
    description: "Spinning conic border with a light sweep across the surface.",
    tags: ["button", "shimmer", "border", "gradient"], tech: ["HTML/CSS", "Tailwind"],
    code: `@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.shimmer-btn { position: relative; overflow: hidden; border-radius: 12px; }
.shimmer-btn::before { content: ""; position: absolute; inset: -1px; padding: 1px; border-radius: inherit;
  background: conic-gradient(from var(--angle), transparent 60%, oklch(0.66 0.24 {{HUE}}), #22d3ee, transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  animation: spin calc(4s * {{SPEED}}) linear infinite; }
@keyframes spin { to { --angle: 360deg } }`,
  },
  {
    slug: "liquid-button", name: "Liquid Button", category: "buttons", preview: "liquid-button", difficulty: "Intermediate",
    description: "Wavy liquid fill rises inside the button on hover.",
    tags: ["button", "hover", "liquid"], tech: css,
    code: `<button className="group relative overflow-hidden rounded-full border px-6 py-3">
  <span className="absolute inset-x-[-20%] top-full h-[200%] rounded-[40%] bg-gradient-to-r from-[oklch(0.66_0.24_{{HUE}})] to-blue-500 transition-all duration-700 group-hover:top-[-40%] animate-spin [animation-duration:8s]" />
  <span className="relative">Liquid Fill</span>
</button>`,
  },
  {
    slug: "pulse-button", name: "Pulse Button", category: "buttons", preview: "pulse-button", difficulty: "Beginner",
    description: "Call-to-action with an expanding radar pulse ring.",
    tags: ["button", "animation", "pulse"], tech: css,
    code: `<button className="relative rounded-full bg-blue-500 px-6 py-3 text-white">
  <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping" />
  <span className="relative">Pulse</span>
</button>`,
  },
  {
    slug: "aurora-background", name: "Aurora Background", category: "backgrounds", preview: "aurora", difficulty: "Beginner",
    description: "Slow-drifting conic aurora blurred into a soft glow.",
    tags: ["background", "gradient", "aurora", "glow"], tech: ["HTML/CSS", "Tailwind"],
    code: `<div class="aurora"><div></div></div>
<style>
.aurora { position: relative; overflow: hidden; background: #0b0b14; }
.aurora div { position: absolute; inset: -25%; filter: blur(64px); opacity: .7;
  background: conic-gradient(from 90deg at 40% 50%, oklch(0.66 0.24 {{HUE}}), #3b82f6, #22d3ee, oklch(0.66 0.24 {{HUE}}));
  animation: drift calc(14s * {{SPEED}}) ease-in-out infinite alternate; }
@keyframes drift { to { transform: translate(10%, 8%) rotate(25deg); } }
</style>`,
  },
  {
    slug: "gradient-background", name: "Gradient Flow", category: "backgrounds", preview: "gradient-flow", difficulty: "Beginner",
    description: "Animated gradient that flows across the surface.",
    tags: ["background", "gradient", "animation"], tech: ["HTML/CSS"],
    code: `.flow { background: linear-gradient(120deg, oklch(0.66 0.24 {{HUE}}), #3b82f6, #22d3ee, oklch(0.66 0.24 {{HUE}}));
  background-size: 200% 200%; animation: flow calc(5s * {{SPEED}}) ease infinite; }
@keyframes flow { 50% { background-position: 100% 50%; } }`,
  },
  {
    slug: "particle-background", name: "Particle Network", category: "backgrounds", preview: "particles", difficulty: "Advanced", pro: true,
    description: "Canvas particle constellation that pauses when off-screen.",
    tags: ["background", "particles", "canvas"], tech: [...css, "Canvas", "TypeScript"],
    code: `// Lightweight canvas particles with IntersectionObserver pause
useEffect(() => {
  const ctx = canvas.getContext("2d")!;
  const pts = Array.from({ length: 40 }, () => ({ x: Math.random()*w, y: Math.random()*h,
    vx: (Math.random()-.5)*.8/{{SPEED}}, vy: (Math.random()-.5)*.8/{{SPEED}} }));
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    pts.forEach(p => { p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill(); });
    // connect nearby points with lines...
    raf = requestAnimationFrame(draw);
  };
  draw();
}, []);`,
  },
  {
    slug: "morphing-blob", name: "Morphing Blob", category: "animations", preview: "blob", difficulty: "Beginner",
    description: "Organic shape morphing via animated border-radius.",
    tags: ["animation", "blob", "morph", "background"], tech: ["HTML/CSS"],
    code: `.blob { width: 200px; aspect-ratio: 1; background: linear-gradient(110deg, oklch(0.66 0.24 {{HUE}}), #22d3ee);
  animation: morph calc(10s * {{SPEED}}) ease-in-out infinite; }
@keyframes morph {
  0%,100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
  50% { border-radius: 70% 30% 46% 54% / 30% 39% 61% 70%; transform: rotate(180deg); } }`,
  },
  {
    slug: "glow-grid", name: "Glow Grid", category: "backgrounds", preview: "grid-glow", difficulty: "Beginner",
    description: "Subtle line grid with a floating ambient light.",
    tags: ["background", "grid", "glow"], tech: ["HTML/CSS"],
    code: `.grid-bg { background-image: linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px);
  background-size: 48px 48px; }
.grid-bg::after { content: ""; position: absolute; width: 8rem; height: 8rem; border-radius: 50%;
  background: oklch(0.64 0.21 {{HUE}} / .4); filter: blur(48px); }`,
  },
  {
    slug: "glassmorphism-card", name: "Glassmorphism Card", category: "cards", preview: "glass-card", difficulty: "Beginner",
    description: "Frosted glass panel over animated color blobs.",
    tags: ["card", "glass", "blur"], tech: css,
    code: `<div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl backdrop-saturate-150">
  <h3>Frosted glass</h3>
</div>`,
  },
  {
    slug: "spotlight-card", name: "Spotlight Card", category: "cards", preview: "spotlight-card", difficulty: "Intermediate",
    description: "Radial light follows the cursor across the card surface.",
    tags: ["card", "hover", "spotlight", "cursor"], tech: [...css, "TypeScript"],
    code: `export function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", \`\${e.clientX - r.left}px\`);
        ref.current!.style.setProperty("--y", \`\${e.clientY - r.top}px\`);
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{ background: "radial-gradient(180px circle at var(--x) var(--y), oklch(0.64 0.21 {{HUE}} / .4), transparent 70%)" }} />
      <h3 className="relative">Spotlight</h3>
    </div>
  );
}`,
  },
  {
    slug: "gradient-border-card", name: "Gradient Border", category: "cards", preview: "gradient-border", difficulty: "Intermediate",
    description: "Card with a rotating conic-gradient border beam.",
    tags: ["card", "border", "gradient", "glow"], tech: ["HTML/CSS"],
    code: `/* See Shimmer Button — same @property --angle conic border technique */
.beam-card::before { background: conic-gradient(from var(--angle), transparent 60%, oklch(0.66 0.24 {{HUE}}), #22d3ee, transparent); }`,
  },
  {
    slug: "shiny-card", name: "Shiny Card", category: "cards", preview: "shiny-card", difficulty: "Beginner",
    description: "Gradient card with a looping glossy shine sweep.",
    tags: ["card", "shine", "shimmer"], tech: css,
    code: `<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.66_0.24_{{HUE}})] to-blue-500 p-6">
  <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.6s_linear_infinite]" />
  Pro Card
</div>`,
  },
  {
    slug: "image-hover-effect", name: "Image Hover Zoom", category: "image", preview: "image-hover", difficulty: "Beginner",
    description: "Image zooms and rotates while a caption fades in.",
    tags: ["image", "hover", "zoom"], tech: css,
    code: `<figure className="group relative overflow-hidden rounded-2xl">
  <img src="/photo.jpg" className="transition duration-700 group-hover:scale-125 group-hover:rotate-3" />
  <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 p-4 opacity-0 transition group-hover:opacity-100">Caption</figcaption>
</figure>`,
  },
  {
    slug: "expandable-card", name: "Expandable Card", category: "cards", preview: "expandable-card", difficulty: "Beginner",
    description: "Accordion-style card with smooth height and content fade.",
    tags: ["card", "interaction", "expand"], tech: [...css, "TypeScript"],
    code: `const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)} style={{ height: open ? 130 : 64 }} className="transition-all duration-500 overflow-hidden rounded-2xl p-4">
  <span>Expand me</span>
  <p className={open ? "opacity-100" : "opacity-0"}>Hidden content</p>
</button>`,
  },
  {
    slug: "interactive-pricing-card", name: "Interactive Pricing Card", category: "sections", preview: "pricing-card", difficulty: "Intermediate", pro: true,
    description: "Pricing card with monthly/yearly toggle and lift on hover.",
    tags: ["pricing", "card", "toggle"], tech: [...css, "TypeScript"],
    code: `const [yearly, setYearly] = useState(false);
<div className="rounded-2xl border p-6 transition hover:-translate-y-1">
  <Switch checked={yearly} onCheckedChange={setYearly} />
  <p className="text-4xl font-bold">\${yearly ? 96 : 12}<span>/{yearly ? "yr" : "mo"}</span></p>
</div>`,
  },
  {
    slug: "floating-cards", name: "Floating Cards", category: "animations", preview: "floating-cards", difficulty: "Beginner",
    description: "Stacked glass cards bobbing with offset timing.",
    tags: ["card", "float", "animation"], tech: css,
    code: `{[0,1,2].map(i => (
  <div key={i} className="absolute h-20 w-28 rounded-xl bg-white/5 backdrop-blur animate-[float_6s_ease-in-out_infinite]"
    style={{ left: i * 28, top: i * 14, animationDelay: \`\${-i * 1.5}s\` }} />
))}`,
  },
  {
    slug: "count-up-stat", name: "Count-up Stat", category: "animations", preview: "stat-counter", difficulty: "Beginner",
    description: "Number that counts up when it enters the viewport.",
    tags: ["animation", "counter", "stats"], tech: [...css, "TypeScript"],
    code: `function useCountUp(target: number, ms = 1600 * {{SPEED}}) {
  const [n, setN] = useState(0);
  useEffect(() => { const t0 = performance.now(); let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / ms); setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [target]);
  return n;
}`,
  },
  {
    slug: "infinite-marquee", name: "Infinite Marquee", category: "scroll", preview: "marquee", difficulty: "Beginner",
    description: "Seamless looping logo/tag strip with faded edges.",
    tags: ["marquee", "scroll", "animation", "logos"], tech: css,
    code: `<div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]">
  <div className="flex w-max gap-3 animate-[marquee_18s_linear_infinite]">
    {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
  </div>
</div>
/* @keyframes marquee { to { transform: translateX(-50%) } } */`,
  },
  {
    slug: "animated-navbar", name: "Animated Navbar", category: "navbars", preview: "animated-navbar", difficulty: "Intermediate",
    description: "Glass pill navbar with a sliding active indicator.",
    tags: ["navbar", "navigation", "glass", "hover"], tech: [...css, "TypeScript"],
    code: `const [active, setActive] = useState(0);
<nav className="relative flex rounded-full bg-white/5 p-1 backdrop-blur">
  <span className="absolute inset-y-1 rounded-full bg-[oklch(0.66_0.24_{{HUE}})] transition-all duration-300"
    style={{ left: \`calc(\${active * 25}% + 4px)\`, width: "calc(25% - 8px)" }} />
  {links.map((l, i) => <button key={l} onMouseEnter={() => setActive(i)} className="relative w-20 py-2">{l}</button>)}
</nav>`,
  },
  {
    slug: "scroll-reveal", name: "Scroll Reveal", category: "scroll", preview: "scroll-reveal", difficulty: "Beginner",
    description: "Elements fade and slide in as they enter the viewport.",
    tags: ["scroll", "reveal", "animation", "entrance"], tech: [...css, "TypeScript"],
    code: `useEffect(() => {
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .5 });
  document.querySelectorAll("[data-reveal]").forEach(n => io.observe(n));
  return () => io.disconnect();
}, []);
/* [data-reveal]{opacity:0;transform:translateY(24px);transition:.7s} [data-reveal].in{opacity:1;transform:none} */`,
  },
  {
    slug: "bento-grid", name: "Bento Grid", category: "sections", preview: "bento", difficulty: "Beginner",
    description: "Asymmetric feature grid with hover scaling tiles.",
    tags: ["section", "grid", "bento", "layout"], tech: css,
    code: `<div className="grid grid-cols-3 grid-rows-2 gap-3">
  <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[oklch(0.66_0.24_{{HUE}})] to-blue-500" />
  <div className="rounded-2xl bg-white/5" />
  <div className="rounded-2xl bg-white/5" />
  <div className="col-span-2 rounded-2xl bg-white/5" />
</div>`,
  },
  {
    slug: "animated-timeline", name: "Animated Timeline", category: "sections", preview: "timeline", difficulty: "Beginner",
    description: "Vertical timeline with gradient rail and staggered steps.",
    tags: ["section", "timeline", "animation"], tech: css,
    code: `<ol className="relative pl-6 before:absolute before:left-2 before:inset-y-0 before:w-px before:bg-gradient-to-b before:from-[oklch(0.66_0.24_{{HUE}})] before:to-cyan-400">
  <li>Design</li><li>Build</li><li>Ship</li>
</ol>`,
  },
  {
    slug: "animated-footer", name: "Animated Footer", category: "footers", preview: "footer", difficulty: "Beginner",
    description: "Minimal footer with flowing gradient top border.",
    tags: ["footer", "gradient", "section"], tech: css,
    code: `<footer className="relative border-t border-white/10 px-6 py-8">
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[oklch(0.66_0.24_{{HUE}})] via-blue-500 to-cyan-400" />
  ...links
</footer>`,
  },
  {
    slug: "testimonial-carousel", name: "Testimonial Carousel", category: "sections", preview: "testimonials", difficulty: "Intermediate",
    description: "Auto-rotating quotes with animated progress dots.",
    tags: ["section", "carousel", "testimonials"], tech: [...css, "TypeScript"],
    code: `const [i, setI] = useState(0);
useEffect(() => { const id = setInterval(() => setI(v => (v + 1) % quotes.length), 2500 * {{SPEED}}); return () => clearInterval(id); }, []);
<blockquote key={i} className="animate-in fade-in slide-in-from-bottom-4">{quotes[i]}</blockquote>`,
  },
  {
    slug: "newsletter-input", name: "Glow Newsletter Input", category: "forms", preview: "newsletter", difficulty: "Beginner",
    description: "Pill email input that glows on focus with inline submit.",
    tags: ["form", "input", "newsletter", "glow"], tech: css,
    code: `<form className="flex rounded-full border border-white/10 p-1 transition focus-within:border-blue-500 focus-within:shadow-[0_0_30px_-8px_oklch(0.66_0.24_{{HUE}})]">
  <input placeholder="you@email.com" className="flex-1 bg-transparent px-3 outline-none" />
  <button className="rounded-full bg-[oklch(0.66_0.24_{{HUE}})] px-4 py-2">Join</button>
</form>`,
  },
  {
    slug: "orbit-loader", name: "Orbit Loader", category: "loaders", preview: "orbit-loader", difficulty: "Beginner",
    description: "Counter-rotating dual ring spinner.",
    tags: ["loader", "spinner", "animation"], tech: css,
    code: `<div className="relative h-16 w-16">
  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[oklch(0.66_0.24_{{HUE}})] border-r-cyan-400" />
  <div className="absolute inset-3 animate-spin rounded-full border-2 border-transparent border-b-blue-500 [animation-direction:reverse]" />
</div>`,
  },
  {
    slug: "bouncing-dots", name: "Bouncing Dots", category: "loaders", preview: "dots-loader", difficulty: "Beginner",
    description: "Three staggered dots bouncing in sequence.",
    tags: ["loader", "dots", "animation"], tech: css,
    code: `<div className="flex gap-2">
  {[0,1,2].map(i => <span key={i} className="h-3 w-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: \`\${i*0.15}s\` }} />)}
</div>`,
  },
  {
    slug: "cursor-glow", name: "Cursor Glow", category: "cursor", preview: "cursor-glow", difficulty: "Beginner", isNew: true,
    description: "Soft radial light that trails the pointer over a dot field.",
    tags: ["cursor", "glow", "hover", "background"], tech: [...css, "TypeScript"],
    code: `<div onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", \`\${e.clientX - r.left}px\`);
    e.currentTarget.style.setProperty("--y", \`\${e.clientY - r.top}px\`); }}
  style={{ background: "radial-gradient(120px circle at var(--x) var(--y), oklch(0.66 0.24 {{HUE}} / .45), transparent 70%)" }} />`,
  },
];

export function getEffect(slug: string) {
  return EFFECTS.find((e) => e.slug === slug);
}

export function searchEffects(list: Effect[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  const words = s.split(/\s+/);
  return list.filter((e) => {
    const hay = [e.name, e.description, e.category, ...e.tags, ...e.tech].join(" ").toLowerCase();
    return words.every((w) => hay.includes(w.replace(/s$/, "")));
  });
}

export function renderCode(e: Effect, opts: { text?: string | undefined; hue?: number; speed?: number } = {}) {
  return e.code
    .replaceAll("{{TEXT}}", opts.text ?? e.editableText ?? "")
    .replaceAll("{{HUE}}", String(opts.hue ?? 290))
    .replaceAll("{{SPEED}}", String(opts.speed ?? 1));
}

export function buildPrompt(e: Effect, opts: { text?: string | undefined; hue?: number; speed?: number } = {}) {
  return `Create a reusable, responsive ${e.name} component using ${e.tech.join(", ")}.

Effect: ${e.description}

Requirements:
- Dark premium aesthetic with a primary accent of oklch(0.66 0.24 ${opts.hue ?? 290}) and cyan secondary glow.
- Animation speed multiplier: ${opts.speed ?? 1}x; use smooth easing and GPU-friendly transforms (transform/opacity only).${
    e.editableText ? `\n- Demo text: "${opts.text ?? e.editableText}" passed as a prop.` : ""
  }
- Fully responsive; provide a touch-friendly fallback for hover interactions.
- Respect prefers-reduced-motion by disabling or simplifying motion.
- Accessible: keyboard focus styles, semantic elements, sufficient contrast.
- Expose props for colors, speed and content. Clean, production-ready TypeScript, no unnecessary dependencies.`;
}
