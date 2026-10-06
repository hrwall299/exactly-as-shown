import { useEffect, useState } from "react";

type P = { text?: string };

export function GradientText({ text = "Build Something Amazing" }: P) {
  return <div className="text-center font-display text-2xl font-bold text-gradient-animated">{text}</div>;
}

export function TextReveal({ text = "Build Something Amazing" }: P) {
  const [k, setK] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setK((v) => v + 1), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div key={k + text} className="flex flex-wrap justify-center gap-x-2 text-center font-display text-xl font-bold">
      {text.split(" ").map((w, i) => (
        <span key={i} className="anim-fade-up inline-block" style={{ animationDelay: `${i * 0.12}s` }}>
          {w}
        </span>
      ))}
    </div>
  );
}

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEF0123456789";
export function TextScramble({ text = "Build Something Amazing" }: P) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    let frame = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      frame = 0;
      const tick = () => {
        frame++;
        const progress = frame / 2;
        setOut(
          text
            .split("")
            .map((c, i) => (i < progress || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join(""),
        );
        if (progress < text.length) raf = requestAnimationFrame(tick);
        else timer = setTimeout(run, 2500);
      };
      tick();
    };
    run();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [text]);
  return <div className="text-center font-mono text-lg font-semibold text-brand-c">{out}</div>;
}

export function GlitchText({ text = "GLITCH" }: P) {
  return (
    <div className="relative font-display text-3xl font-black">
      <span>{text}</span>
      <span aria-hidden className="anim-glitch absolute inset-0 text-brand-a" style={{ transform: "translate(2px,0)" }}>{text}</span>
      <span aria-hidden className="anim-glitch absolute inset-0 text-brand-c" style={{ animationDelay: "0.3s" }}>{text}</span>
    </div>
  );
}

export function Typewriter({ text = "Build Something Amazing" }: P) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN((v) => (v > text.length + 12 ? 0 : v + 1)), 90);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className="font-mono text-lg">
      {text.slice(0, n)}
      <span className="anim-caret ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-brand-c" />
    </div>
  );
}

export function StrokeText({ text = "OUTLINE" }: P) {
  return (
    <div
      className="group relative font-display text-3xl font-black text-transparent"
      style={{ WebkitTextStroke: "1px var(--brand-c)" }}
    >
      {text}
      <span className="absolute inset-0 text-gradient [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 group-hover:[clip-path:inset(0_0_0_0)]" style={{ WebkitTextStroke: "0" }}>
        {text}
      </span>
    </div>
  );
}

export function HighlightText({ text = "Ship faster" }: P) {
  return (
    <div className="font-display text-2xl font-bold">
      <span className="relative inline-block">
        <span className="absolute inset-x-0 bottom-1 h-3 origin-left anim-fade-up bg-brand opacity-60 [animation-duration:1.2s]" />
        <span className="relative">{text}</span>
      </span>
    </div>
  );
}
