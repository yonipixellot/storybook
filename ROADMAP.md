# Pixellot DS v2 — Storybook Roadmap

Last updated: 2026-04-06
Current git tag: `v1.0-mobile-complete` (63 components, pixel-perfect audit, dark mode ✓, interactive states ✓)

---

## ✅ Phase 0 — Mobile-First Foundation (COMPLETE)

- [x] 63 components transferred from DS bundle → Storybook
- [x] Mode A pixel-perfect audit — 20 component fixes vs live DS
- [x] Dark mode pass — all 9 dark-mode components verified
- [x] Interactive states audit — AppInput, AppSelect, VideoTypeChips
- [x] Git tag `v1.0-mobile-complete` pushed as local backup

---

## 🔲 Phase 1 — Desktop Foundation

### 1.1 Storybook Viewport Config
- [ ] Add 3 canonical viewport presets to `.storybook/preview.ts`:
  - Mobile: 390 × 844 (iPhone 14)
  - Tablet: 768 × 1024 (iPad)
  - Desktop: 1440 × 900 (standard)
- [ ] Set mobile as default viewport

### 1.2 Breakpoint Tokens
- [ ] Add breakpoint tokens to `src/tokens/tokens.css`:
  ```css
  --bp-tablet: 768px;
  --bp-desktop: 1024px;
  --bp-wide: 1440px;
  ```
- [ ] Document the 3-tier responsive strategy in tokens file

### 1.3 Figma Desktop Scope (Figma MCP)
- [ ] Point Figma MCP at the 80 desktop frames
- [ ] Identify which components actually change shape at desktop
  - Expected list: AppHeader, nav/sidebar, page grids, card layouts
  - Expected unchanged: buttons, chips, inputs, badges, icons (atoms)
- [ ] Output: a prioritized list of ~10–15 components needing `@media` work

### 1.4 Responsive Component Updates
- [ ] Add `@media (min-width: var(--bp-desktop))` overrides to identified components
- [ ] Each component: verify mobile unchanged, desktop matches Figma
- [ ] Commit per-component or in small batches

---

## 🔲 Phase 2 — Full App Preview in Storybook

### 2.1 Vue Router Setup
- [ ] Install `vue-router` in storybook-repo if not already present
- [ ] Create `src/router/index.ts` — define all app routes
- [ ] Create `src/App.vue` — root component with `<RouterView>`

### 2.2 App Preview Stories
- [ ] Create `src/stories/AppPreview.stories.ts`
  - Story: `App / Mobile Preview` — viewport locked to 390px
  - Story: `App / Desktop Preview` — viewport locked to 1440px
- [ ] Wraps real page components, real router, realistic mock data
- [ ] Navigation works inside the preview (click between pages)

### 2.3 Per-Page Stories (mobile + desktop)
- [ ] AuthPage
- [ ] HomePage
- [ ] GameDetailPage
- [ ] PlayerPage
- [ ] PlayerSelectPage
- [ ] TeamPage (exists, needs desktop variant)
- [ ] VideoPlayerPage

---

## 🔲 Phase 3 — Page Components Transfer (was Step 4)

For each page listed above, verify it exists in Storybook with:
- [ ] Mobile story ✓
- [ ] Desktop story ✓ (after Phase 1 breakpoints are done)
- [ ] Dark mode story ✓
- [ ] Realistic mock data ✓

---

## 🔲 Phase 4 — Final Visual Review (was Step 5)

- [ ] Full Storybook scroll-through on mobile viewport
- [ ] Full Storybook scroll-through on desktop viewport
- [ ] Dark mode pass on desktop viewport
- [ ] Final pixel diffs vs DS for any remaining glitches
- [ ] Tag `v2.0-responsive-complete`

---

## Notes & Decisions

- **Breakpoint strategy**: mobile-first `@media (min-width)` overrides only where layout genuinely changes. Atoms stay untouched.
- **Source of truth for desktop**: Figma frames (Yoni has ~80 desktop screens). Use Figma MCP to extract, never guess.
- **App Preview approach**: Vue Router mounted inside a Storybook story. Same components, real navigation, viewport-switchable.
- **Token rule**: Never hardcode px values — always use token or derive from token.
