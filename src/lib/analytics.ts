// Google Analytics 4 (gtag.js) integration.
// The measurement ID is passed in from the root route loader (read server-side
// from GOOGLE_ANALYTICS_MEASUREMENT_ID) so no secret is hardcoded in the bundle.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initializedId: string | null = null;

export function initAnalytics(measurementId: string | undefined | null) {
  if (typeof window === "undefined") return;
  if (!measurementId) return;
  if (initializedId === measurementId) return; // avoid duplicate tags
  initializedId = measurementId;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- gtag.js requires the Arguments object
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Disable the automatic initial page_view; we send it ourselves via
  // trackPageView so SPA navigations and the first load are tracked uniformly
  // without duplicates.
  window.gtag("config", measurementId, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (!initializedId || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
