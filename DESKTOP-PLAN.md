# Desktop Responsiveness Plan — SD Spartans DS

> **Status:** Planning (awaiting Yoni approval before any code changes)
> **Figma source:** Done tab — `node-id=225-10902`
> **Important note:** Figma is alpha. Storybook is the source of truth for component details. This plan maps layout *intent*, not pixel specs.

---

## 1. What the Figma desktop scan revealed

The Done tab contains ~80 desktop (1440px) screens covering every major flow. After screenshotting 6 representative screens, 4 core layout patterns emerge at desktop:

### Pattern A — Standard page (Header + Content + Footer)
> Screens: Main, Event, Athlete Profile, My Account, Leagues, etc.

| Zone | Mobile | Desktop |
|------|--------|---------|
| Header | Logo + Org name + (Search / Bell / Hamburger icons) | Logo + **horizontal league nav tabs** + Search bar + Bell + **Avatar button** |
| Content | Full-width, 1-column | Max-width container (~1200px), centered |
| Cards/grids | 1-column stacked list | 3–4 column grid |
| Bottom nav | `BottomTabBar` (5 tabs) | **Hidden** — navigation is in the header |
| Footer | None | Full-width footer with links + social icons |

### Pattern B — Menu / User dropdown
> Screen: Menu (821:24673)

| Mobile | Desktop |
|--------|---------|
| `SideMenu` slides in full-screen | Dropdown panel anchored to avatar button (top-right) |
| Shows Following + nav links | Same content, different container |

### Pattern C — Auth screens (Sign In / Sign Up)
> Screens: Sign In (2103:29417), Sign Up

| Mobile | Desktop |
|--------|---------|
| Full-screen form, no header | **Split-screen**: left = brand panel (logo + tagline), right = form |
| Uses app header | No header |

### Pattern D — My Account settings
> Screen: Your account (2999:70274)

| Mobile | Desktop |
|--------|---------|
| Single-column, tab-based navigation | **Two-panel**: left sidebar nav + right form content |

---

## 2. Component-by-component breakdown

### 🔴 HIGH — Significant layout change

#### `AppHeader`
- **Current state:** Mobile-only. Logo + Org name + icon row (Search/Bell/Menu).
- **Desktop Figma intent:** Logo + horizontal nav tabs (league names) + inline search bar + Bell + Avatar.
- **Gap:** No nav tabs prop. Menu icon → Avatar button. Search icon → Search bar.
- **Decisions needed (see Section 4):** Q1, Q2

#### `BottomTabBar`
- **Current state:** Full-width 5-tab bottom bar. Always visible.
- **Desktop Figma intent:** Completely absent. Navigation moves to the header.
- **Resolution:** Simple `display: none` at `min-width: 1024px`. Low risk.
- **No decision needed.** Safe to implement.

#### `SideMenu`
- **Current state:** Full-screen overlay with backdrop + slide-in panel.
- **Desktop Figma intent:** Compact dropdown anchored to top-right avatar button.
- **Gap:** Current component is built for full-screen overlay only. No dropdown mode.
- **Decisions needed:** Q3

### 🟡 MEDIUM — Layout/wrapper changes (component itself is fine)

#### `Footer`
- **Current state:** Component exists in Storybook. Need to verify desktop styling.
- **Desktop Figma intent:** Full-width bar, "About us / FAQ / Privacy" left, social icons right, copyright + Pixellot branding below.
- **Resolution:** Likely just needs desktop max-width + horizontal layout verification.
- **Action:** Visual audit (compare Footer story vs Figma desktop screenshot).

#### `AuthPage`
- **Current state:** Component exists. Assumes mobile full-screen layout.
- **Desktop Figma intent:** Split-screen. Left panel = brand imagery + org info. Right panel = form.
- **Gap:** Split-screen is a completely different layout — not just wider, structurally different.
- **Decisions needed:** Q4

#### `VideoTypeChips`
- **Current state:** Horizontal scroll container.
- **Desktop Figma intent:** All tabs visible, no scroll.
- **Resolution:** At `min-width: 1024px` → `overflow: visible; flex-wrap: wrap`.
- **No decision needed.** Safe to implement.

### 🟢 LOW — Page-level grid, component unchanged

These components don't change themselves — only the page wrapper grid changes:

| Component | Mobile | Desktop | Change |
|-----------|--------|---------|--------|
| `LiveGameCard` | 1-col list | 4-col grid | Page-level CSS |
| `GameResultCard` | 1-col list | 3-col grid | Page-level CSS |
| `HighlightCard` | horizontal scroll | multi-col grid | Page-level CSS |
| `HomeFollowingStrip` | horizontal scroll | still horizontal | Minor max-width cap |
| `ScoreCard` | full-width | centered, max-width | Page-level CSS |
| `VideoPlayerPage` | full-width player | full-width player (same!) | No change needed |

---

## 3. What does NOT change at desktop

These components are identical between mobile and desktop:
- `AppButton`, `AppInput`, `AppSelect`, `AppBadge`, `AppTabs`
- `AppDivider`, `Toast`, `LoadingSpinner`, `SkeletonBlock/Card`
- `ScoreCard` (same component, just page container changes)
- `PAvatar`, `PBellIcon`, `PTeamLogo`, `PlayerNumberBadge`
- `VideoThumbnail`, `VideoActionBar`
- `GameLeaders`, `PlayerStats`, `StatsGrid`, `TeamStatsBar`

---

## 4. Decisions needed before writing any code

These are the 4 open questions. Nothing gets implemented until these are answered.

---

### Q1 — How should AppHeader handle desktop?

**The problem:** Desktop header is structurally different from mobile. It adds:
- Horizontal league nav tabs (e.g. NBL1 / WNBL / Senior Domestic)
- An inline search bar (not just an icon)
- An avatar button instead of hamburger

**Option A — Single responsive component** *(recommended)*
One `AppHeader` component that internally renders differently at `≥1024px`. Adds `navItems` prop (array of tab labels), `avatarUrl` prop. At mobile, nav tabs are hidden; hamburger shown. At desktop, hamburger hidden; nav tabs + avatar shown.

**Option B — Two separate components**
Keep `AppHeader` for mobile. Add new `AppHeaderDesktop` component. Use page-level logic to choose which to render.

> 💬 **Your call:** A is less code and what most DS teams do. B is cleaner if the two are truly independent. Which do you prefer?

---

### Q2 — What are the league nav tabs in the desktop header?

The Figma shows "NBL1 / WNBL / Senior Domestic / QSL / Junior Domestic / The Elite Summer League" as nav tabs. These are clearly **app-level data**, not DS constants.

**Option A** — `AppHeader` takes a `navItems: string[]` prop. The app passes the tabs in.
**Option B** — Nav tabs are outside AppHeader entirely (separate `AppNavTabs` component the page places below the header).

> 💬 **Your call:** Which makes more sense architecturally?

---

### Q3 — SideMenu desktop behavior

The Figma shows the menu opens as a **dropdown panel anchored to the avatar button** on desktop (not full-screen overlay).

**Option A — Add `mode` prop to SideMenu** *(recommended)*
`mode: 'overlay' | 'dropdown'`. Dropdown mode: no backdrop, panel is `position: absolute` top-right, narrower width, no animation.

**Option B — Create separate `UserMenuDropdown` component**
SideMenu stays mobile-only overlay. A new lightweight `UserMenuDropdown` is used on desktop.

> 💬 **Your call:** A keeps things in one component but adds complexity. B is cleaner but adds a new file. What's your preference?

---

### Q4 — AuthPage split-screen

The Figma desktop Sign In / Sign Up shows a split-screen: brand panel left (40%) + form right (60%). The brand panel has the team logo, "Welcome to SOUTHERN DISTRICTS SPARTANS", and "#DARKSIDEFAMILY".

**The gap question:** Is this split-screen layout something the AuthPage component should handle (via responsive CSS), or is it a separate page-level concern that wraps the AuthPage form?

**Option A** — `AuthPage` component handles the split internally. At `≥1024px` it shows the brand panel.
**Option B** — The brand panel is a separate `BrandHero` variant, and the page layout handles the split externally.

> 💬 **Note:** `BrandHero` component already exists in Storybook. This might already be partially solved.

---

## 5. Proposed implementation order (post-decisions)

Once the 4 decisions above are made, the recommended order is:

1. **BottomTabBar** — `display:none` at desktop (safe, no decisions needed, ~5 min)
2. **VideoTypeChips** — remove scroll at desktop (~10 min)
3. **Footer** — audit + fix desktop layout (~15 min)
4. **AppHeader** — implement desktop responsive variant (depends on Q1/Q2, ~2–3 hrs)
5. **SideMenu** — add dropdown mode (depends on Q3, ~1–2 hrs)
6. **AuthPage** — split-screen desktop (depends on Q4, ~1–2 hrs)
7. **Page-level grids** — responsive grid CSS on HomePage, GameDetailPage, etc. (~2–3 hrs)

---

## 6. Figma → Storybook gap log

These are things visible in Figma that differ from what we know Storybook currently has — flagged to avoid "auto-fixing" to an outdated design.

| Area | Figma (alpha) shows | Storybook has | Recommendation |
|------|--------------------|----|---|
| Header search | Inline search bar on desktop | Icon button only | Match Storybook behavior, not Figma |
| Avatar in header | Round avatar photo | Hamburger icon | Use Storybook's PAvatar component |
| League tabs styling | Blue underline on active | Figma is placeholder text | Extract real style from DS live site |
| Menu dropdown width | ~280px panel | N/A (overlay only) | Design from DS tokens, not Figma px |
| Auth brand panel BG | Light gray (#F5F5F5) | N/A | Verify token → `--color-gray-50` or `--color-surface` |
| Content max-width | ~1200px constraint | No constraint | Add `max-width: 1200px; margin: 0 auto` to page wrappers |

---

*Last updated: 2026-04-06 | Awaiting decisions on Q1–Q4 before implementation begins.*
