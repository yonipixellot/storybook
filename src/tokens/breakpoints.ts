/**
 * Pixellot DS v2 — Breakpoint constants
 *
 * CSS custom properties can't be used inside @media queries, so
 * these JS constants mirror the --bp-* tokens in tokens.css.
 *
 * Usage in component CSS:
 *   @media (min-width: 768px) { ... }   ← tablet
 *   @media (min-width: 1024px) { ... }  ← desktop
 *   @media (min-width: 1440px) { ... }  ← wide
 *
 * Usage in stories (for viewport locking):
 *   import { BP } from '@/tokens/breakpoints'
 */

export const BP = {
  /** 0–767px — mobile (default, no min-width needed) */
  mobile:  0,
  /** ≥768px — tablet portrait */
  tablet:  768,
  /** ≥1024px — desktop / landscape tablet */
  desktop: 1024,
  /** ≥1440px — large desktop */
  wide:    1440,
} as const

export type Breakpoint = keyof typeof BP
