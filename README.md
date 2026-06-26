# SOIC Digital Cinema Campus

A high-fidelity, production-grade prototype for **SOIC — the #1 cinema school in the Middle East**, rebuilt from a brochure website into a full **digital cinema campus**.

> Vision: replace WhatsApp + Discord + Slack + Zoom + Google Classroom with **one cinematic platform** where the entire filmmaking journey — learn, create, collaborate, get hired — happens in one room.

Design language: **"SOIC Noir"** — built on SOIC's **real brand**: deep **navy** theatre (`#1B254B`/`#07115C`), **amber** key light (`#FFC107`), logo **red** for live/urgent, and **Bebas Neue** display type (SOIC's signature) paired with IBM Plex Sans / IBM Plex Sans Arabic. Film grain, letterbox motifs, cinematic motion. Fully bilingual **AR/EN (RTL-aware, Tajawal for Arabic display)**, dark + light themes, responsive, accessible.

**Real assets:** the logo, program posters, faculty portraits, campaign banners (Sign Language Cinema, Teen Studio, Children's Cinema, VFX workshops), and partner logos (Canon, Sony, ARRI, Haki) are SOIC's own, pulled from soicedu.com into `assets/img/`. Brand colors and the Bebas Neue typeface were sampled directly from the live site.

## Run it

```bash
node server.js          # serves on http://localhost:8922
node server.js 3000     # custom port
```
Or via the preview launcher: server name **`soic`** in `.claude/launch.json`.

## Screens (built & verified)

| File | What it is | Inspiration |
|---|---|---|
| `index.html` | Public marketing **Home** — cinematic pitch, programs, live product preview, faculty, showcase, conversion CTA | MasterClass · Apple · Netflix |
| `app.html` | **Student dashboard** — continue-learning, live-today, progress, deadlines, community feed, AI study buddy | Netflix + Notion + Linear |
| `lesson.html` | **Lesson player** — video, transcript, resources, notes, Q&A, AI summary, curriculum spine | Coursera · MasterClass |
| `community.html` | **Community** — spaces, channels, voice rooms, threads, reactions, presence, members | Discord + Slack |

All four interlink. Try: **⌘K** command palette · theme toggle (☀/☾) · language toggle (ع/EN) · mobile bottom-tab nav.

## Architecture

```
soic-campus/
├── index.html · app.html · lesson.html · community.html
├── server.js                  # zero-dependency static server
├── assets/
│   ├── css/
│   │   ├── tokens.css         # design tokens — single source of truth (color, type, space, motion; dark+light)
│   │   ├── base.css           # reset, typography, atmosphere (grain, letterbox), animations, a11y
│   │   ├── components.css     # buttons, cards, badges, inputs, avatars, progress, states, brand
│   │   ├── site.css           # public marketing site
│   │   ├── app.css            # campus app shell (sidebar, topbar, rail, dashboard, lesson)
│   │   └── community.css      # community (spaces/channels/chat/members)
│   └── js/
│       ├── i18n.js            # AR/EN dictionary + RTL toggle
│       └── main.js            # theme, scroll reveals, nav, counters, command palette, tabs
└── docs/
    └── 00-PRODUCT-STRATEGY.md # audit, IA/sitemap, RBAC matrix, user flows, design system, roadmap
```

## Read this first
**[docs/00-PRODUCT-STRATEGY.md](docs/00-PRODUCT-STRATEGY.md)** — the research and product thinking behind every screen: current-site audit, competitive teardown, information architecture, the 9-role RBAC model, user flows, the design system, and the phased build roadmap.

## Roadmap (next vertical slices)
Live Classroom (Zoom replacement) · Messaging (WhatsApp layer) · Portfolio + public film profile · Career Center · Admissions/Applicant flow · Instructor / Admin / Super-Admin consoles. Each role's dashboard, sidebar, KPIs and permissions are specified in the strategy doc.

---
*Prototype. Imagery is placeholder (filmic-overlaid). Faculty names reflect the real SOIC roster from soicedu.com.*
