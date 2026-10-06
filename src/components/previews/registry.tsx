import type { ComponentType } from "react";
import * as D from "./three-d";
import * as T from "./text";
import * as B from "./buttons";
import * as BG from "./backgrounds";
import * as C from "./cards";
import * as S from "./sections";

export type PreviewProps = { text?: string | undefined };

export const previews: Record<string, ComponentType<PreviewProps>> = {
  "tilt-card": D.TiltCard,
  "flip-card": D.FlipCard,
  cube: D.Cube,
  "layered-card": D.LayeredCard,
  "perspective-grid": D.PerspectiveGrid,
  "text-3d": D.Text3D,
  "gradient-text": T.GradientText,
  "text-reveal": T.TextReveal,
  "text-scramble": T.TextScramble,
  "glitch-text": T.GlitchText,
  typewriter: T.Typewriter,
  "stroke-text": T.StrokeText,
  "highlight-text": T.HighlightText,
  "magnetic-button": B.MagneticButton,
  "neon-button": B.NeonButton,
  "shimmer-button": B.ShimmerButton,
  "liquid-button": B.LiquidButton,
  "pulse-button": B.PulseButton,
  aurora: BG.Aurora,
  "gradient-flow": BG.GradientMesh,
  particles: () => <BG.Particles />,
  blob: BG.Blob,
  "grid-glow": BG.GridGlow,
  "glass-card": C.GlassCard,
  "spotlight-card": C.SpotlightCard,
  "gradient-border": C.GradientBorderCard,
  "shiny-card": C.ShinyCard,
  "image-hover": C.ImageHover,
  "expandable-card": C.ExpandableCard,
  "pricing-card": C.PricingCard,
  "floating-cards": C.FloatingCards,
  "stat-counter": C.StatCounter,
  marquee: S.Marquee,
  "animated-navbar": S.AnimatedNavbar,
  "scroll-reveal": S.ScrollReveal,
  bento: S.Bento,
  timeline: S.Timeline,
  footer: S.FooterPreview,
  testimonials: S.Testimonials,
  newsletter: S.NewsletterForm,
  "orbit-loader": S.OrbitLoader,
  "dots-loader": S.DotsLoader,
  "cursor-glow": S.CursorGlow,
};

export function Preview({ id, text }: { id: string; text?: string }) {
  const P = previews[id];
  if (!P) return null;
  return <P text={text} />;
}
