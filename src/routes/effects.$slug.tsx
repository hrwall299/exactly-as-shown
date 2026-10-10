import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { buildPrompt, CATEGORIES, getEffect, renderCode } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";
import { Preview } from "@/components/previews/registry";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/effects/$slug")({
  loader: ({ params }) => {
    const effect = getEffect(params.slug);
    if (!effect) throw notFound();
    return { slug: effect.slug };
  },
  head: ({ loaderData }) => {
    const e = loaderData ? getEffect(loaderData.slug) : undefined;
    if (!e) return { meta: [{ title: "Component not found — UIVerse" }, { name: "robots", content: "noindex" }] };
    const cat = CATEGORIES.find((c) => c.id === e.category)?.label ?? "UI";
    const base = `${e.description.replace(/\.?\s*$/, ".")} Live preview, copy-paste React + Tailwind code and an AI prompt.`;
    return pageHead({
      path: `/effects/${e.slug}`,
      title: `${e.name} — ${cat} Component | UIVerse`,
      description: base.length > 160 ? base.slice(0, 157).trimEnd() + "…" : base,
      type: "article",
    });
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <Link to="/" className="text-primary">Effect not found — back to library</Link>
    </div>
  ),
  component: EffectPage,
});

function EffectPage() {
  const { slug } = Route.useLoaderData();
  const e = getEffect(slug)!;
  const [text, setText] = useState(e.editableText ?? "");
  const [hue, setHue] = useState(290);
  const [tab, setTab] = useState<"code" | "prompt">("code");
  const [copied, setCopied] = useState(false);
  const opts = { text: text || undefined, hue };
  const content = tab === "code" ? renderCode(e, opts) : buildPrompt(e, opts);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← All effects</Link>
        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">{e.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{e.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[e.difficulty, ...e.tech].map((t) => (
            <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div
              className="grid h-96 place-items-center overflow-hidden rounded-2xl border border-border bg-surface"
              style={{ ["--hue-a" as string]: hue }}
            >
              <Preview id={e.preview} text={text || undefined} />
            </div>
            <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2">
              {e.editableText !== undefined && (
                <label className="text-sm">
                  <span className="text-muted-foreground">Text</span>
                  <input value={text} onChange={(ev) => setText(ev.target.value)} className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary" />
                </label>
              )}
              <label className="text-sm">
                <span className="text-muted-foreground">Accent hue: {hue}</span>
                <input type="range" min={0} max={360} value={hue} onChange={(ev) => setHue(+ev.target.value)} className="mt-3 w-full accent-primary" />
              </label>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-2">
              <div className="flex gap-1">
                {(["code", "prompt"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-sm capitalize ${tab === t ? "bg-surface-2 text-foreground" : "text-muted-foreground"}`}>
                    {t === "prompt" ? "AI Prompt" : "Code"}
                  </button>
                ))}
              </div>
              <button onClick={copy} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-muted-foreground">{content}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
