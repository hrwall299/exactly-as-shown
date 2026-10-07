import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, EFFECTS, searchEffects, type Category } from "@/lib/catalog";
import { Preview } from "@/components/previews/registry";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webarqn — Animated UI Effects Library" },
      { name: "description", content: "Browse, preview and copy premium animated UI effects: 3D cards, text effects, buttons, backgrounds and more." },
      { property: "og:title", content: "Webarqn — Animated UI Effects Library" },
      { property: "og:description", content: "Live previews and copy-ready code for modern web effects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const list = useMemo(
    () => searchEffects(cat === "all" ? EFFECTS : EFFECTS.filter((e) => e.category === cat), q),
    [q, cat],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          Effects that make sites <span className="text-gradient-animated">feel alive</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {EFFECTS.length} live, copy-ready UI effects. Preview, tweak and paste into your project.
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search effects — try “3d card” or “glow”"
          className="mx-auto mt-8 block w-full max-w-lg rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <Link
            key={e.slug}
            to="/effects/$slug"
            params={{ slug: e.slug }}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/60"
          >
            <div className="grid h-48 place-items-center overflow-hidden bg-surface">
              <Preview id={e.preview} />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold">{e.name}</h2>
                {e.isNew && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">NEW</span>}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{e.difficulty}</p>
            </div>
          </Link>
        ))}
        {list.length === 0 && <p className="col-span-full text-center text-muted-foreground">No effects found.</p>}
      </main>
    </div>
  );
}
