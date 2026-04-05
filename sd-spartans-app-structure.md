# S.D Spartans — App Structure & Feature Map

> **Generated:** March 24, 2026
> **Source:** Figma prototype at `clover-export-33345841.figma.site`
> **Purpose:** Reference for feature flag management system
> **Tech Stack:** Vue / Angular, localStorage persistence

---

## Screens Overview

| # | Screen | Entry Point |
|---|--------|-------------|
| 1 | Login / Auth | App launch |
| 2 | Team Selection (Onboarding) | After login |
| 3 | Player Selection (Onboarding) | After team selection |
| 4 | Notifications Permission | After onboarding |
| 5 | **Home Screen** | Main app |
| 6 | **Game Detail Page** | Click on a game card |
| 7 | **Video Player Page** | Click on Full Game / highlight |
| 8 | **Player Page** | Click on player round button or thumbnail |
| 9 | **Team Page** | Click on team name / round button |
| 10 | Hamburger Menu (Sidebar) | Hamburger icon |
| 11 | Subscription / Paywall Modal | Click on locked player highlight |

---

## Screen-by-Screen Breakdown

### 1. Home Screen

```
┌─────────────────────────────────────┐
│  [Logo]  S.D Spartans   🔍  🔔  ☰  │  ← Global Nav
├─────────────────────────────────────┤
│  (●)(●)                             │  ← Team/Player Round Buttons
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  Every move. Every Play.    │    │  ← Hero Banner
│  │  Your Highlights await.     │    │
│  │       [Watch Now]           │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Live                    See all >  │  ← Live Games Section
│  ┌──────────┐ ┌──────────┐         │
│  │ 🔴 Live   │ │ 🔴 Live   │         │    (horizontal scroll cards)
│  │ Spartans 12│ │ Spartans  │         │
│  │ Thunder  6 │ │ Thunder   │         │
│  └──────────┘ └──────────┘         │
├─────────────────────────────────────┤
│  Upcoming                See all >  │  ← Upcoming Games Section
│  ┌─────────────────────────────┐    │
│  │ 25 NOV  Peterhead           │    │    (vertical list cards)
│  │         Queens Park         │    │
│  ├─────────────────────────────┤    │
│  │ 25 NOV  Peterhead           │    │
│  │         Queens Park         │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Recent Games            See all >  │  ← Recent Games Section
│  ┌─────────────────────────────┐    │
│  │ 20 NOV  S.D Spartans  121  │    │    (vertical list cards)
│  │         Logan Thunder   89  │    │    with "BG Highlights" badge
│  ├─────────────────────────────┤    │
│  │ 13 NOV  S.D Spartans  112  │    │
│  │         Ipswich Force   88  │    │
│  ├─────────────────────────────┤    │
│  │  7 NOV  S.D Spartans  104  │    │
│  │         Queens Park R.  79  │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Footer: About us | FAQ | Privacy   │  ← Footer
│  [FB] [X] [IG] [YT] [TT] [✉]      │
│  © 2025 S.D Spartans                │
│  Powered by Pixellot                │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `team_player_buttons` | Team / Player Round Buttons | Circular shortcut avatars at top, link to Team/Player pages |
| `hero_banner` | Hero Banner | "Every move. Every Play." + Watch Now CTA |
| `live_games_home` | Live Games | Horizontally scrolling live game score cards |
| `upcoming_games` | Upcoming Games | Vertical list of upcoming fixtures + "See all" |
| `recent_games_home` | Recent Games | Vertical list of past games with scores + highlight badge + "See all" |

---

### 2. Game Detail Page

Accessed by clicking any game card from Home / Team Page.

```
┌─────────────────────────────────────┐
│  ← Back                   🔍 🔔 ☰  │
├─────────────────────────────────────┤
│  ⚡ S.D Spartans  121  Final  89  Thunder │  ← Game Score Header
│     (5-4)          3/14/25    (5-6)      │
├─────────────────────────────────────┤
│  [Full Game] [Game Highlights] [Player Highlights] │  ← Tab Navigation
├─────────────────────────────────────┤
│                                     │
│  Full Game                          │  ← Full Game Slot
│  ┌─────────────────────────────┐    │
│  │  ▶ Video Player (01:43:18)  │    │
│  └─────────────────────────────┘    │
│                                     │
│  Game Highlights                    │  ← Game Highlights Slot
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐      │    (horizontal scroll)
│  │Game│ │Game│ │Best│ │Top │      │
│  │Recap│ │HL  │ │Plays│ │Mom.│      │
│  │20:00│ │06:39│ │10:45│ │12:22│      │
│  └────┘ └────┘ └────┘ └────┘      │
│                                     │
│  Player Highlights                  │  ← Player Highlights Slot
│  Type: [Advanced ▼]                 │    ← Type Filter dropdown
│  ──── Spartans ──── | ── Thunder ── │    ← Team Tabs
│                                     │
│  Followed Players                   │  ← Followed Players subsection
│  ┌────┐ ┌────┐                      │
│  │ ▶  │ │ ▶  │                      │
│  │#4  │ │#25 │                      │
│  └────┘ └────┘                      │
│                                     │
│  Other Players                      │  ← Other Players subsection
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ ▶  │ │ ▶  │ │ ▶  │  ...         │
│  └────┘ └────┘ └────┘              │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `full_game_tab` | Full Game Tab | Tab navigation item |
| `game_highlights_tab` | Game Highlights Tab | Tab navigation item |
| `player_highlights_tab` | Player Highlights Tab | Tab navigation item |
| `full_game_slot` | Full Game Video | Video player with full match |
| `game_highlights_slot` | Game Highlights | Horizontal scroll of clips: Recap, Highlight, Best Plays, Top Moments |
| `player_highlights_slot` | Player Highlights Section | Entire player HL area |
| `player_highlights_type_filter` | Type Filter | Advanced / Basic / Standard dropdown |
| `player_highlights_team_tabs` | Team Tabs | Spartans / Thunder toggle |
| `player_highlights_followed` | Followed Players | HL cards for players user follows |
| `player_highlights_others` | Other Players | HL cards for remaining players |

---

### 3. Video Player Page

Accessed by clicking Full Game or a highlight clip.

```
┌─────────────────────────────────────┐
│  ← Back                   🔍 🔔 ☰  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │       ▶ Video Player        │    │  ← Video Player
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Full Game            ✂  ⬇  ↑  🔖  │  ← Video Title + Action Buttons
│  01:55:30                           │
│                                     │
│  ┌─────────────────────────────┐    │  ← Game Score Card
│  │ ⚡ Spartans 121  Final  89 Thunder │
│  │    (5-4)                (5-6)    │
│  ├─────────────────────────────┤    │
│  │ Team  Q1   Q2   Q3   Q4  Final  │  ← Box Score Table
│  │ SPA   12   23   16   18   121   │
│  │ THU   24   16   15   13    89   │
│  └─────────────────────────────┘    │
│                                     │
│  Player Highlights                  │  ← Player Highlights (same as Game Page)
│  Type: [Advanced ▼]                 │
│  ...                                │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `video_clip_action` | Clip Button (✂️) | Create a clip from video |
| `video_download_action` | Download Button (⬇️) | Download video |
| `video_share_action` | Share Button (↑) | Share video link |
| `video_save_action` | Save / Bookmark (🔖) | Save video to Saved Videos |
| `box_score` | Box Score Table | Q1/Q2/Q3/Q4/Final score breakdown per team |

---

### 4. Player Page

Accessed via round player button on Home or from player highlight thumbnails.

```
┌─────────────────────────────────────┐
│  ← Back                   🔍 🔔 [↑]│  ← Share Button (top right)
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  [Photo]  #1 | FORWARD      │    │  ← Player Header
│  │           JAMES CARTER      │    │
│  │           ⚡ S.D Spartans → │    │    (links to Team Page)
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  ┌────────┬────────┬────────┐      │  ← Player Stats Summary
│  │Minutes │ Games  │Tourna- │      │    (career totals)
│  │Played  │ Played │ments   │      │
│  │  937   │   47   │   13   │      │
│  ├────────┼────────┼────────┤      │
│  │Points  │Assists │Rebounds│      │
│  │ Made   │ Made   │ Made   │      │
│  │   71   │   15   │   12   │      │
│  └────────┴────────┴────────┘      │
├─────────────────────────────────────┤
│  My Highlights              See all │  ← My Highlights Grid
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ ▶  │ │ ▶  │ │ ▶  │              │    (3-column grid)
│  └────┘ └────┘ └────┘              │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ ▶  │ │ ▶  │ │ ▶  │              │
│  └────┘ └────┘ └────┘              │
├─────────────────────────────────────┤
│  Season Stats               See all │  ← Season Stats
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐      │
│  │MPG │ │PPG │ │APG │ │RPG │      │
│  │19.3│ │13.7│ │ 2.5│ │ 2.4│      │
│  └────┘ └────┘ └────┘ └────┘      │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `player_share_button` | Share Button | Top-right share icon on Player Page |
| `player_stats_summary` | Player Stats Summary | 6-cell grid: Minutes, Games, Tournaments, Points, Assists, Rebounds |
| `player_my_highlights` | My Highlights Grid | Grid of player's highlight videos + "See all" |
| `player_season_stats` | Season Stats | Averages row: MPG, PPG, APG, RPG + "See all" |

---

### 5. Team Page

Accessed via team name link or round team button.

```
┌─────────────────────────────────────┐
│  ← Back                   🔍 🔔 ☰  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  [Logo]  TEAM SPARTANS      │    │  ← Team Header
│  │          2 Live | 0 Upcoming│    │
│  │          | 77 Total         │    │
│  │     [ Following ]           │    │    ← Follow/Unfollow button
│  │     [X] [FB] [IG] [🌐]      │    │    ← Team Social Links
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Live                    See all >  │  ← Live Games (team)
│  (same card layout as Home)         │
├─────────────────────────────────────┤
│  Recent Games            See all >  │  ← Recent Games (team)
│  (same card layout as Home)         │
├─────────────────────────────────────┤
│  Player Highlights                  │  ← Player Highlights (same structure)
│  Type: [Advanced ▼]                 │
│  Followed Players: ...              │
│  Other Players: ...                 │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `team_follow_button` | Follow / Unfollow Button | Toggle team follow status |
| `team_social_links` | Social Links | X (Twitter), Facebook, Instagram, Website |
| `live_games_team` | Live Games (Team) | Team-specific live games |
| `recent_games_team` | Recent Games (Team) | Team-specific past games |

*Note: Player Highlights on Team Page reuse the same feature flags as Game Page.*

---

### 6. Hamburger Menu (Sidebar)

```
┌─────────────────────────────────────┐
│  [BR] Bruce Romano              [✕] │  ← User Profile
├─────────────────────────────────────┤
│  Premier League              ▼      │  ← Leagues Section
│  Championship                ▼      │    (expandable dropdowns)
│  League One                  ▼      │
│  League Two                  ▼      │
├─────────────────────────────────────┤
│  Following                          │  ← Following Section
│                                     │
│  Teams                              │
│  (●) S.D Spartans  (●) S.D Spartans │    ← Following Teams
│      Men               Women        │
│                    (+) Add...        │
│                                     │
│  Players                            │
│  [4] S.D Spartans  [11] S.D Spartans│    ← Following Players
│      Man #4             Man #11     │
│                    (+) Add...        │
├─────────────────────────────────────┤
│  Language              English >    │  ← Language Switcher
│  My Account                         │  ← My Account
│  Saved Videos                       │  ← Saved Videos
│  My Highlights                      │  ← My Highlights
├─────────────────────────────────────┤
│  Log Out                            │  ← Log Out (red)
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `menu_leagues` | Leagues Section | Premier League / Championship / League One / League Two |
| `menu_following_teams` | Following — Teams | List of followed teams + "Add" |
| `menu_following_players` | Following — Players | List of followed players + "Add" |
| `menu_language` | Language Switcher | Currently "English" with arrow |
| `menu_my_account` | My Account | Account settings link |
| `menu_saved_videos` | Saved Videos | Saved/bookmarked videos page |
| `menu_my_highlights` | My Highlights | User's personal highlights collection |

---

### 7. Subscription / Paywall Modal

Triggered when clicking on a locked player highlight (non-subscribed user).

```
┌─────────────────────────────────────┐
│              Watch highlights    [✕] │
│            of your favorite players │
│                                     │
│  Enjoy your favorite player's       │
│  moments and share them with        │
│  family and friends!                │
│                                     │
│  SUBSCRIPTIONS                      │
│  ┌─────────────────────────────┐    │
│  │ Single Download             │    │
│  │ Download a single highlight │    │
│  │ $5.00            [Buy Now]  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🟡 Most Popular             │    │
│  │ Season Pass                 │    │
│  │ Watch every player highlight│    │
│  │ $35.00           [Buy Now]  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 2 Season Bundle             │    │
│  │ Watch every player highlight│    │
│  │ throughout 2 seasons        │    │
│  │ $60.00           [Buy Now]  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Sections / Features:**

| Key | Feature | Description |
|-----|---------|-------------|
| `subscription_paywall` | Paywall Modal | Entire subscription modal |
| `subscription_single_download` | Single Download ($5) | One-time highlight download |
| `subscription_season_pass` | Season Pass ($35) | Full season access |
| `subscription_2_season_bundle` | 2 Season Bundle ($60) | Two-season access |

---

## Global / Cross-Screen Elements

| Key | Feature | Location | Description |
|-----|---------|----------|-------------|
| `global_search` | Search Icon (🔍) | All screens — Nav bar | Search functionality |
| `global_notifications` | Notifications Bell (🔔) | All screens — Nav bar | Push/in-app notifications with badge |
| `global_footer` | Footer | Home, Team, Video pages | About us, FAQ, Privacy + social links |
| `powered_by_pixellot` | "Powered by Pixellot" | Footer | Branding in footer |

---

## Complete `features.config.js`

```js
export const FEATURES = {

  // ─── Home Screen ──────────────────────────────────────────
  team_player_buttons:          { label: 'Team / Player Round Buttons',         group: 'Home Screen',       defaultEnabled: true },
  hero_banner:                  { label: 'Hero Banner — Watch Now CTA',         group: 'Home Screen',       defaultEnabled: true },
  live_games_home:              { label: 'Live Games',                          group: 'Home Screen',       defaultEnabled: true },
  upcoming_games:               { label: 'Upcoming Games',                      group: 'Home Screen',       defaultEnabled: true },
  recent_games_home:            { label: 'Recent Games',                        group: 'Home Screen',       defaultEnabled: true },

  // ─── Game Page — Tabs ─────────────────────────────────────
  full_game_tab:                { label: 'Full Game Tab',                       group: 'Game Page — Tabs',  defaultEnabled: true },
  game_highlights_tab:          { label: 'Game Highlights Tab',                 group: 'Game Page — Tabs',  defaultEnabled: true },
  player_highlights_tab:        { label: 'Player Highlights Tab',               group: 'Game Page — Tabs',  defaultEnabled: true },

  // ─── Video Player ─────────────────────────────────────────
  video_clip_action:            { label: 'Clip Button (✂️)',                     group: 'Video Player',      defaultEnabled: true },
  video_download_action:        { label: 'Download Button (⬇️)',                group: 'Video Player',      defaultEnabled: true },
  video_share_action:           { label: 'Share Button (↑)',                    group: 'Video Player',      defaultEnabled: true },
  video_save_action:            { label: 'Save / Bookmark (🔖)',                group: 'Video Player',      defaultEnabled: true },
  box_score:                    { label: 'Box Score (Q1–Q4 table)',             group: 'Video Player',      defaultEnabled: true },

  // ─── Player Highlights (shared) ───────────────────────────
  player_highlights_type_filter:{ label: 'Type Filter (Advanced/Basic/Standard)', group: 'Player Highlights', defaultEnabled: true },
  player_highlights_team_tabs:  { label: 'Team Tabs (Spartans / Thunder)',      group: 'Player Highlights', defaultEnabled: true },
  player_highlights_followed:   { label: 'Followed Players',                    group: 'Player Highlights', defaultEnabled: true },
  player_highlights_others:     { label: 'Other Players',                       group: 'Player Highlights', defaultEnabled: true },

  // ─── Player Page ──────────────────────────────────────────
  player_share_button:          { label: 'Player Share Button',                 group: 'Player Page',       defaultEnabled: true },
  player_stats_summary:         { label: 'Career Stats (6 cells)',              group: 'Player Page',       defaultEnabled: true },
  player_my_highlights:         { label: 'My Highlights Grid',                  group: 'Player Page',       defaultEnabled: true },
  player_season_stats:          { label: 'Season Stats (MPG/PPG/APG/RPG)',      group: 'Player Page',       defaultEnabled: true },

  // ─── Team Page ────────────────────────────────────────────
  team_follow_button:           { label: 'Follow / Unfollow Button',            group: 'Team Page',         defaultEnabled: true },
  team_social_links:            { label: 'Social Links (X/FB/IG/Web)',          group: 'Team Page',         defaultEnabled: true },
  live_games_team:              { label: 'Live Games (Team)',                    group: 'Team Page',         defaultEnabled: true },
  recent_games_team:            { label: 'Recent Games (Team)',                 group: 'Team Page',         defaultEnabled: true },

  // ─── Menu / Sidebar ───────────────────────────────────────
  menu_leagues:                 { label: 'Leagues Section',                     group: 'Menu',              defaultEnabled: true },
  menu_following_teams:         { label: 'Following — Teams',                   group: 'Menu',              defaultEnabled: true },
  menu_following_players:       { label: 'Following — Players',                 group: 'Menu',              defaultEnabled: true },
  menu_language:                { label: 'Language Switcher',                    group: 'Menu',              defaultEnabled: true },
  menu_my_account:              { label: 'My Account',                          group: 'Menu',              defaultEnabled: true },
  menu_saved_videos:            { label: 'Saved Videos',                        group: 'Menu',              defaultEnabled: true },
  menu_my_highlights:           { label: 'My Highlights',                       group: 'Menu',              defaultEnabled: true },

  // ─── Monetization ─────────────────────────────────────────
  subscription_paywall:         { label: 'Subscription Paywall Modal',          group: 'Monetization',      defaultEnabled: true },
  subscription_single_download: { label: 'Single Download ($5)',                group: 'Monetization',      defaultEnabled: true },
  subscription_season_pass:     { label: 'Season Pass ($35)',                   group: 'Monetization',      defaultEnabled: true },
  subscription_2_season_bundle: { label: '2 Season Bundle ($60)',               group: 'Monetization',      defaultEnabled: true },

  // ─── Global ───────────────────────────────────────────────
  global_search:                { label: 'Search',                              group: 'Global',            defaultEnabled: true },
  global_notifications:         { label: 'Notifications Bell',                  group: 'Global',            defaultEnabled: true },
  global_footer:                { label: 'Footer',                              group: 'Global',            defaultEnabled: true },
  powered_by_pixellot:          { label: 'Powered by Pixellot',                 group: 'Global',            defaultEnabled: true },
}
```

---

## Notes for Development

- **Shared sections**: Player Highlights appears on Game Page, Video Player Page, AND Team Page — same feature flags control it everywhere
- **Nested toggles**: Turning off `player_highlights_tab` should hide the entire Player Highlights area. Turning off `player_highlights_followed` only hides the "Followed Players" subsection
- **Subscription tiers** can be individually toggled to test different pricing configurations
- **Video action buttons** (clip/download/share/save) can be individually toggled per content type if needed
- **Menu items** that are hidden should also hide their corresponding pages/routes
