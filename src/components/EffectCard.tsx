import { Link } from "@tanstack/react-router";
import type { Effect } from "@/lib/catalog";
import { Preview } from "@/components/previews/registry";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

const TONES = ["bg-surface", "bg-secondary", "bg-muted", "bg-card bg-dots"];

export function EffectCard({ e, index = 0, tall = false }: { e: Effect; index?: number; tall?: boolean }) {
  const { has, toggle } = useFavorites();
  const fav = has(e.slug);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow">
      <div className={cn("relative grid place-items-center overflow-hidden", tall ? "h-72" : "h-52", TONES[index % TONES.length])}>
        <Preview id={e.preview} />
        <button
          onClick={() => toggle(e.slug)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${e.name} from saved` : `Save ${e.name}`}
          className={cn(
            "absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-border bg-card/90 text-sm backdrop-blur transition-opacity",
            fav ? "opacity-100" : "opacity-0 focus:opacity-100 group-hover:opacity-100",
          )}
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>
      <Link to="/effects/$slug" params={{ slug: e.slug }} className="block p-4 outline-none after:absolute after:inset-x-0 after:bottom-0 after:h-[88px] focus-visible:bg-muted">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[15px] font-semibold">{e.name}</h3>
          {e.pro && <span className="rounded-full border border-brand-b/40 px-2 py-0.5 text-[10px] font-medium text-brand-b">PRO</span>}
          {e.isNew && <span className="rounded-full bg-brand-c/15 px-2 py-0.5 text-[10px] font-medium text-brand-c">New</span>}
          <span className="ml-auto text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {e.category} · {e.tech.slice(0, 2).join(" · ")} · {e.difficulty}
        </p>
      </Link>
    </article>
  );
}
