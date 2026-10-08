import { createFileRoute, Link } from "@tanstack/react-router";
import { EFFECTS } from "@/lib/catalog";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EffectCard } from "@/components/EffectCard";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Saved components — UIVerse" }, { name: "description", content: "Your saved UIVerse components." }, { property: "og:title", content: "Saved components — UIVerse" }, { property: "og:description", content: "Your saved UIVerse components." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Favs,
});

function Favs() {
  const { favs } = useFavorites();
  const list = EFFECTS.filter((e) => favs.includes(e.slug));
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-14">
        <h1 className="font-serif text-6xl">Saved</h1>
        <p className="mt-2 text-muted-foreground">Components you've hearted, stored on this device.</p>
      </section>
      <main className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => <EffectCard key={e.slug} e={e} index={i} />)}
        {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">Nothing saved yet. <Link to="/" className="underline">Explore the library</Link>.</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
