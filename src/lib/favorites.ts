import { useCallback, useEffect, useState } from "react";

const KEY = "uiverse:favorites";
const EVT = "uiverse:favorites-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    setFavs(read());
    const sync = () => setFavs(read());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const toggle = useCallback((slug: string) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { favs, toggle, has: (s: string) => favs.includes(s) };
}
