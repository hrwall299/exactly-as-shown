import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, EFFECTS } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = SITE_URL;
        const paths = [
          "/",
          
          ...CATEGORIES.filter((c) => c.id !== "all").map((c) => `/category/${c.id}`),
          ...EFFECTS.map((e) => `/effects/${e.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : p.startsWith("/category") ? "0.8" : "0.6"}</priority></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
