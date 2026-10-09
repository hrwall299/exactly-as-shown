import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, EFFECTS } from "@/lib/catalog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/favorites",
          ...CATEGORIES.filter((c) => c.id !== "all").map((c) => `/category/${c.id}`),
          ...EFFECTS.map((e) => `/effects/${e.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
