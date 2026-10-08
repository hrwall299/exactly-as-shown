import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type PointerEvent } from "react";
import { CATEGORIES, EFFECTS, type Category } from "@/lib/catalog";
import { Preview } from "@/components/previews/registry";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EffectCard } from "@/components/EffectCard";
import chair from "@/assets/editorial-chair.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UIVerse — Beautiful UI. Ready to Copy." },
      { name: "description", content: "An interactive library of live UI components, 3D effects, animations and website sections with matching code and AI prompts." },
      { property: "og:title", content: "UIVerse — Beautiful UI. Ready to Copy." },
      { property: "og:description", content: "Preview, interact, customize and copy premium UI components and effects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const byCat = (c: Category) => EFFECTS.filter((e) => e.category === c);

function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="relative h-[460px] overflow-hidden rounded-3xl border border-border bg-surface bg-dots"
      style={{ background: "radial-gradient(260px circle at var(--mx,70%) var(--my,30%), color-mix(in oklab, var(--brand-a) 18%, transparent), transparent 70%)" }}
    >
      <div className="absolute left-[6%] top-[8%] w-56 rounded-2xl border border-border bg-card p-3 shadow-glow transition-transform duration-200 ease-out" style={{ transform: "perspective(800px) rotateX(var(--rx,0)) rotateY(var(--ry,0))" }}>
        <img src={chair} alt="Editorial lounge chair" width={512} height={512} className="h-36 w-full rounded-xl object-cover" />
        <p className="mt-3 font-display text-sm font-semibold">3D Tilt Card</p>
        <p className="text-xs text-muted-foreground">Move your cursor</p>
      </div>
      <div className="absolute right-[6%] top-[10%] rounded-2xl border border-border bg-card px-5 py-4 shadow-glow anim-float">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Text effect</p>
        <div className="mt-1 w-56"><Preview id="text-scramble" text="Ready to copy" /></div>
      </div>
      <div className="absolute bottom-[10%] left-[8%] grid h-20 w-64 place-items-center rounded-2xl border border-border bg-card shadow-glow">
        <Preview id="magnetic-button" />
      </div>
      <div className="absolute bottom-[8%] right-[6%] h-40 w-64 overflow-hidden rounded-2xl border border-border shadow-glow">
        <Preview id="aurora" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-4 shadow-glow">
        <Preview id="orbit-loader" />
      </div>
    </div>
  );
}

function Shelf({ title, kicker, cat, items }: { title: string; kicker: string; cat?: Category; items: typeof EFFECTS }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{kicker}</p>
          <h2 className="mt-1 font-serif text-4xl md:text-5xl">{title}</h2>
        </div>
        {cat && <Link to="/category/$id" params={{ id: cat }} className="shrink-0 text-sm text-muted-foreground hover:text-foreground">View all →</Link>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((e, i) => <EffectCard key={e.slug} e={e} index={i} />)}
      </div>
    </section>
  );
}

function Index() {
  const featured = EFFECTS.filter((e) => e.isNew).concat(EFFECTS).filter((e, i, a) => a.indexOf(e) === i);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-8 pt-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-c" /> {EFFECTS.length} live components · growing weekly
          </p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] md:text-8xl">
            Beautiful UI.<br /><em className="text-brand-a">Ready to Copy.</em>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Interactive components, 3D effects, animations and full website sections. Preview them live, tweak them, and copy the exact code or an AI prompt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/category/$id" params={{ id: "cards" }} className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">Explore Components</Link>
            <Link to="/category/$id" params={{ id: "backgrounds" }} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:border-foreground/30">Browse Effects</Link>
          </div>
        </div>
        <HeroShowcase />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => {
            const n = EFFECTS.filter((e) => e.category === c.id).length;
            return (
              <Link key={c.id} to="/category/$id" params={{ id: c.id }} className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-foreground/30">
                {c.label}<span className="text-xs text-muted-foreground">{n}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Shelf kicker="Editor's picks" title="Featured this week" items={featured} />
      <Shelf kicker="Depth & perspective" title="The 3D collection" cat="3d" items={byCat("3d")} />
      <Shelf kicker="Typography in motion" title="Text effects" cat="text" items={byCat("text")} />
      <Shelf kicker="Touch-worthy" title="Buttons people click" cat="buttons" items={byCat("buttons")} />
      <Shelf kicker="Surfaces" title="Beautiful cards" cat="cards" items={byCat("cards")} />
      <Shelf kicker="Atmosphere" title="Backgrounds" cat="backgrounds" items={byCat("backgrounds")} />
      <Shelf kicker="Building blocks" title="Website sections" cat="sections" items={byCat("sections")} />

      <section id="pro" className="mx-auto max-w-7xl px-4 pt-24">
        <div className="grid gap-8 rounded-3xl bg-primary p-10 text-primary-foreground md:grid-cols-[1.4fr_1fr] md:p-14">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-60">UIVerse Pro</p>
            <h2 className="mt-2 font-serif text-5xl">Advanced 3D, exclusive sections, deeper customization.</h2>
          </div>
          <div className="flex flex-col justify-end gap-3 text-sm opacity-80">
            <p>Everything free stays free — code, prompts and hundreds of components. Pro adds the wild stuff.</p>
            <span className="w-fit rounded-full bg-primary-foreground px-5 py-2.5 font-medium text-primary">Coming soon</span>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
