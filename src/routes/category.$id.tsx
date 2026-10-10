import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { useMemo, useState } from "react";
import { CATEGORIES, EFFECTS, searchEffects } from "@/lib/catalog";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EffectCard } from "@/components/EffectCard";

const TECH = ["React", "Tailwind", "TypeScript", "HTML/CSS"];

export const Route = createFileRoute("/category/$id")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.id === params.id && c.id !== "all");
    if (!cat) throw notFound();
    return { label: cat.label, id: cat.id, count: EFFECTS.filter((e) => e.category === cat.id).length };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Category not found — UIVerse" }, { name: "robots", content: "noindex" }] };
    const l = loaderData.label;
    return pageHead({
      path: `/category/${loaderData.id}`,
      title: `${l} UI Components — Live Previews & Code | UIVerse`,
      description: `Browse ${loaderData.count} animated ${l.toLowerCase()} components with live previews. Customize and copy React + Tailwind code or a ready-made AI prompt.`,
    });
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center"><Link to="/" className="underline">Category not found — back home</Link></div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const { label } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [tech, setTech] = useState<string | null>(null);
  const list = useMemo(
    () => searchEffects(EFFECTS.filter((e) => e.category === id && (!tech || e.tech.includes(tech))), q),
    [id, q, tech],
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-14">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Category</p>
        <h1 className="mt-2 font-serif text-6xl md:text-7xl">{label}</h1>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}…`} className="w-full max-w-xs rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-foreground/40" />
          {TECH.map((t) => (
            <button key={t} onClick={() => setTech(tech === t ? null : t)} aria-pressed={tech === t} className={`rounded-full border px-3 py-1.5 text-xs ${tech === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
      </section>
      <main className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => <EffectCard key={e.slug} e={e} index={i} />)}
        {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">More {label.toLowerCase()} are being crafted — check back soon.</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
