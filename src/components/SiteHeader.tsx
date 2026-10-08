import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EFFECTS, CATEGORIES } from "@/lib/catalog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const NAV = [
  { label: "Components", id: "cards" },
  { label: "Animations", id: "animations" },
  { label: "3D", id: "3d" },
  { label: "Effects", id: "cursor" },
  { label: "Sections", id: "sections" },
  { label: "Backgrounds", id: "backgrounds" },
  { label: "Text", id: "text" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-xs text-primary-foreground">U</span>
          UIVerse
        </Link>
        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.id}
              to="/category/$id"
              params={{ id: n.id }}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30"
            aria-label="Search components"
          >
            <span className="hidden sm:inline">Search…</span>
            <span className="sm:hidden">⌕</span>
            <kbd className="hidden rounded border border-border px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
          </button>
          <Link to="/favorites" className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground md:inline">
            Saved
          </Link>
          <a href="#pro" className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline">
            Get Pro
          </a>
          <button onClick={() => setMenu((m) => !m)} className="rounded-full border border-border px-3 py-1.5 text-sm lg:hidden" aria-expanded={menu} aria-label="Menu">
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="grid grid-cols-2 gap-1 border-t border-border px-4 py-4 lg:hidden" aria-label="Mobile">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
            <Link key={c.id} to="/category/$id" params={{ id: c.id }} onClick={() => setMenu(false)} className="rounded-xl px-3 py-2 text-sm hover:bg-muted">
              {c.label}
            </Link>
          ))}
          <Link to="/favorites" onClick={() => setMenu(false)} className="rounded-xl px-3 py-2 text-sm hover:bg-muted">Saved</Link>
        </nav>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search 500+ components, effects and animations..." />
        <CommandList>
          <CommandEmpty>Nothing found. Try “glass card” or “cursor”.</CommandEmpty>
          <CommandGroup heading="Categories">
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <CommandItem key={c.id} value={`category ${c.label}`} onSelect={() => { setOpen(false); navigate({ to: "/category/$id", params: { id: c.id } }); }}>
                {c.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {EFFECTS.map((e) => (
              <CommandItem key={e.slug} value={`${e.name} ${e.tags.join(" ")} ${e.category} ${e.difficulty}`} onSelect={() => { setOpen(false); navigate({ to: "/effects/$slug", params: { slug: e.slug } }); }}>
                <span>{e.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{e.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
