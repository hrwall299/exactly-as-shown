import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="overflow-hidden border-b border-border py-6" aria-hidden>
        <div className="anim-marquee flex w-max gap-12 whitespace-nowrap font-serif text-5xl italic text-foreground/80 md:text-7xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-12">
              <span>Beautiful UI.</span><span className="text-brand-a">Ready to copy.</span>
              <span>Interact.</span><span className="text-brand-b">Customize.</span>
              <span>Ship.</span><span className="text-brand-c">Repeat.</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">UIVerse</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A living library of interactive components, animations and sections — previewed live, copied in one click.
          </p>
          <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" type="email" required placeholder="you@studio.com" className="min-w-0 flex-1 rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-foreground/40" />
            <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Join</button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">New drops every week. No spam.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Library</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <li key={c.id}><Link to="/category/$id" params={{ id: c.id }} className="hover:text-brand-a">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">UIVerse</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/favorites" className="hover:text-brand-a">Saved components</Link></li>
            <li><a href="#pro" className="hover:text-brand-a">Pro membership</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-a">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between px-4 pb-8 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} UIVerse</span>
        <span>Respects reduced motion</span>
      </div>
    </footer>
  );
}
