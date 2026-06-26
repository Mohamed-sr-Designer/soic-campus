# SOIC Digital Campus — Product Strategy & Architecture

> **One line:** Turn SOIC from a brochure website that *sells* film diplomas into a **digital cinema campus** where the entire student journey — learn, create, collaborate, get hired — happens in one cinematic, premium product.

**Prepared by:** Product / UX / Design-System / Frontend team
**Status:** Foundation (research → strategy → IA → design system). Implementation follows.
**Brand:** SOIC — School of Cinema, the #1 cinema school in the Middle East.

---

## 1. Current-State Audit (grounded in soicedu.com)

I analysed the live site rather than assuming. Findings:

| Area | What exists today | Verdict |
|---|---|---|
| **Positioning** | "The leading film education platform in the Middle East." Hero: *"Turn your passion into cinema — Learn. Create. Inspire."* | Strong brand promise, **zero product to back it up.** |
| **Offering** | Five 6-month diplomas: Filmmaking, Cinematography, Editing, VFX, Script Writing. Plus SOIC Radio & Podcast. | Clear, ownable curriculum. Good raw material. |
| **Catalogue** | The "Courses" page shows **one placeholder** — *"New Course," 1h 10m, no syllabus, no price.* | The LMS is non-functional. Learning happens off-platform. |
| **Learning system** | Login + "My Account" (WordPress/WooCommerce pattern). No video player, no progress, no modules. | **No real campus.** Greenfield. |
| **Community / Live** | Primary CTA is a **WhatsApp link**. No in-platform community, messaging, or live classroom. | The product the brief asks for **does not exist yet.** |
| **Faculty** | Real, credentialed: Dr. Mohamed Asser, Dr. Maged El-Basha, Dr. Yehia Fahmy, Dr. Adel Al-Aasar, Dr. Ayman Salama, Dr. Haitham Karam, Dr. Sherif Abdel Fattah. | Genuine authority — under-leveraged. |
| **Language** | English-only surface; audience is MENA (Cairo HQ: 1 Fahmy St., Abdeen). | **Must be bilingual AR/EN, RTL-first.** |
| **Conversion** | Phone/WhatsApp/email only. No structured admissions, no pricing, no application funnel. | Leaking every lead that wants to self-serve. |

### The core insight
SOIC is currently a **landing page wearing the word "platform."** The teaching, the community, the live sessions, the feedback, the portfolio reviews — the things that *actually create filmmakers* — are scattered across WhatsApp, Zoom, Google Drive, and Facebook groups. Every one of those tools is generic, leaks attention, and makes SOIC feel like a course vendor instead of a **campus**.

**The opportunity is not a prettier website. It is to absorb that scattered journey into one owned, cinematic product** — which is precisely the brief's vision.

---

## 2. UX Problems → Product Principles

| # | Problem today | Principle for the redesign |
|---|---|---|
| 1 | No home base; the student lives in WhatsApp | **One campus.** Everything routes back to SOIC. The platform is the room. |
| 2 | Marketing ≠ product; the promise isn't delivered | **Show the campus, don't describe it.** Public site previews the real product. |
| 3 | Generic LMS feel (when it works at all) | **Cinematic, not corporate.** It should feel like Netflix met Notion in a dark room. |
| 4 | No structure to learning, community, or live | **Spine of structure.** Program → Course → Module → Lesson; Space → Channel → Thread. |
| 5 | One-size UI for everyone | **Role-shaped surfaces.** 9 roles, each with its own dashboard, nav, KPIs, permissions. |
| 6 | English-only, LTR | **Arabic-first, fully bilingual, RTL-correct.** |
| 7 | Effort is invisible; nothing compounds | **Every action builds the portfolio.** Work done = career capital. |
| 8 | No feedback loops | **Engagement is designed:** streaks, attendance, critiques, presence, recognition. |

---

## 3. Competitive Teardown — what we borrow (and from whom)

*Inspiration, never imitation. We take the underlying UX principle, not the skin.*

- **MasterClass** → cinematic, full-bleed video-first storytelling; aspirational instructor presence. *We use this for the lesson player & program pages.*
- **Netflix** → the "lean back" catalogue: rows, hero billboards, "continue watching," smart recommendations. *Student dashboard & course library.*
- **Notion** → flexible docs, notes, structured-but-soft IA, calm density. *Lesson notes, project workspaces, the "second brain" of the student.*
- **Linear** → speed, keyboard-first, restraint, immaculate dark UI, command palette (⌘K). *The whole app's interaction model & admin tools.*
- **Discord** → Spaces → Channels, voice rooms, presence, casual real-time culture. *Community backbone.*
- **Slack** → threads, professional channels, search, workspace structure. *Course/department/team channels & moderation.*
- **WhatsApp** → frictionless 1:1 + group DMs, voice notes, read receipts, typing. *Messaging layer.*
- **Coursera / Udemy Business / LinkedIn Learning** → curriculum spine, progress, certificates, skills graph, career outcomes. *Learning structure & Career Center.*
- **Domestika** → creative-community + project showcase woven into courses. *Showcase & portfolio.*
- **Apple** → reductive clarity, typographic confidence, premium restraint, motion that explains. *Design-system tone & marketing.*
- **Zoom (to replace)** → reliable live primitives (HD, chat, hand, polls, breakouts, record). *Live Classroom — but native and branded.*

**The synthesis (the SOIC formula):**
> **Netflix's pull + Notion's depth + Discord's belonging + Linear's craft + MasterClass's cinema — rendered in an Arabic-first, dark, film-grade design language.**

---

## 4. Vision, Goals & Success Metrics

**Vision:** *The campus where the Middle East's filmmakers are made — end to end, in one room.*

The brief's primary goals, made measurable:

| Goal | North-star metric | How the design drives it |
|---|---|---|
| Engagement | Weekly Active Students (WAS) | Home that pulls you in daily; community presence; streaks |
| Course completion | % cohort completing a program | Clear next-lesson, progress, accountability, peer pressure (cohorts) |
| Live attendance | Avg. live attendance rate | One-tap join, calendar, reminders, replays, attendance reputation |
| Community participation | Messages & posts / active student | Spaces that matter (cohort, course, clubs, crews), low-friction posting |
| Portfolio quality | Avg. portfolio score / public profiles shipped | Every assignment auto-builds the portfolio; critique loops |
| Retention | Cohort retention by month | Belonging + outcomes + a place that feels like *theirs* |
| Premium feel | NPS / brand-perception | Cinematic design system, motion, polish, zero "LMS smell" |

---

## 5. The 9 Roles (RBAC model)

Each role gets a **unique dashboard, sidebar, navigation, widgets, KPIs, permissions, and flow.** Never expose what doesn't belong to the role.

| Role | Primary job-to-be-done | Home surface centres on |
|---|---|---|
| **Guest** | Decide whether to apply | Public marketing site; previews, proof, pricing, apply |
| **Applicant** | Get admitted | Application tracker, tasks, document upload, interview scheduling, status |
| **Student** | Learn, create, belong, get hired | Continue learning, live today, community, deadlines, portfolio |
| **Instructor** | Teach & critique at scale | Cohorts, grading queue, live console, content, student progress |
| **Admissions Officer** | Convert applicants | Pipeline (Kanban), applicant reviews, interviews, decisions, yield |
| **Content Manager** | Build & maintain curriculum | Course builder, media library, publishing, versioning, QA |
| **Community Moderator** | Keep community healthy & alive | Reports queue, member management, channel health, announcements |
| **Admin** | Run the institution | Org metrics, users, programs, finance overview, settings |
| **Super Admin** | Own the system | Everything + RBAC config, feature flags, audit log, integrations |

### RBAC permission matrix (capability × role)

`✓ full · ◐ scoped (own cohort/space) · — none`

| Capability | Guest | Applicant | Student | Instructor | Admissions | Content Mgr | Moderator | Admin | Super Admin |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| View public site | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit application | ✓ | ✓ | — | — | — | — | — | — | ✓ |
| Consume lessons | — | preview | ✓ | ✓ | — | ✓ | — | ✓ | ✓ |
| Submit assignments | — | — | ✓ | — | — | — | — | — | ✓ |
| Grade / critique | — | — | — | ◐ | — | — | — | ✓ | ✓ |
| Host live class | — | — | — | ◐ | — | — | — | ✓ | ✓ |
| Join live class | — | — | ✓ | ✓ | — | — | ◐ | ✓ | ✓ |
| Post in community | — | — | ✓ | ✓ | — | — | ✓ | ✓ | ✓ |
| Moderate community | — | — | — | ◐ | — | — | ✓ | ✓ | ✓ |
| DM / messaging | — | ◐ | ✓ | ✓ | ◐ | ◐ | ✓ | ✓ | ✓ |
| Build courses | — | — | — | ◐ | — | ✓ | — | ✓ | ✓ |
| Review applicants | — | — | — | — | ✓ | — | — | ◐ | ✓ |
| View org analytics | — | — | — | ◐ | ◐ | ◐ | ◐ | ✓ | ✓ |
| Manage users/roles | — | — | — | — | — | — | — | ◐ | ✓ |
| Configure RBAC / flags | — | — | — | — | — | — | — | — | ✓ |
| Audit log / integrations | — | — | — | — | — | — | — | ◐ | ✓ |

---

## 6. Information Architecture & Sitemap

Two clearly separated surfaces sharing one design system: **`soicedu.com` (public)** and **`campus.soicedu.com` (app)**.

### A. Public marketing site (conversion-optimised)
```
/                     Home — cinematic pitch + product preview
/programs             All 5 diplomas (catalogue)
/programs/:slug       Program detail (curriculum, faculty, outcomes, apply)
/admissions           How to apply, requirements, timeline, scholarships
/pricing              Plans, payment options, financing
/faculty              Instructors (the doctors) + guest masters
/faculty/:slug        Instructor profile
/community            What campus life is like (preview of the real thing)
/events               Masterclasses, screenings, premieres, open days
/showcase             Student & alumni films (the proof)
/showcase/:slug       Film detail / case study
/careers              Career Center for the public (outcomes, hiring partners)
/blog  /blog/:slug    SEO + thought leadership + SOIC Radio/Podcast hub
/about                Story, mission, accreditation, campus
/contact              Form + WhatsApp + map (Cairo)
/faq                  Objection handling
/login  /register     Auth → routes to role-specific app
```

### B. Campus app (role-aware shell)
```
/app                          Role-routed dashboard (9 variants)
/app/learn                    My Courses (Netflix-style library)
/app/learn/:course            Course home (overview/curriculum/discussion/reviews)
/app/learn/:course/:lesson    Lesson player (the core learning surface)
/app/live                     Live: today / upcoming / replays
/app/live/:session            Live Classroom (the Zoom replacement)
/app/assignments              Assignments & projects (kanban + list)
/app/portfolio                Auto-built portfolio + public profile editor
/app/certificates             Earned certificates
/app/calendar                 Unified calendar (live, deadlines, events)
/app/community                Spaces → Channels → Threads (Slack/Discord)
/app/messages                 DMs, groups, voice notes (WhatsApp layer)
/app/careers                  Jobs, internships, studios, applications
/app/showcase                 Internal showcase / submit film
/app/search                   Global ⌘K search (content, people, messages)
/app/notifications  /bookmarks  /downloads  /profile  /settings

# Role-specific (mounted only when permitted)
/app/teach/*        Instructor: cohorts, grading, live console, content
/app/admissions/*   Admissions: pipeline, reviews, interviews, decisions
/app/studio/*       Content Mgr: course builder, media library, publishing
/app/moderate/*     Moderator: reports, members, channel health
/app/admin/*        Admin: org metrics, users, programs, finance, settings
/app/system/*       Super Admin: RBAC, flags, audit, integrations
```

### Global navigation model
- **Public:** top nav + mega-menu for Programs; persistent "Apply" CTA; language switch (ع / EN).
- **App:** left **role sidebar** (primary nav, role-scoped) + top bar (global search ⌘K, live indicator, notifications, presence/avatar) + right **context rail** (contextual: notes in a lesson, members in a channel, deadlines on the dashboard). Mobile collapses sidebar → bottom tab bar (Home · Learn · Live · Community · Messages).

---

## 7. Key User Flows (happy paths)

1. **Guest → Applicant → Student**
   Home → Program detail → "Apply" → multi-step application (profile, portfolio/showreel, statement, choose program) → status tracker → admissions review → interview (scheduled in-app) → offer → pay/enrol → **welcome to campus** (onboarding: pick avatar, join cohort space, first lesson queued).

2. **Daily student loop (the retention engine)**
   Open app → Dashboard: *"Continue: Lesson 4 — Lighting for Mood"* + *"Live in 2h: Color Grading w/ Dr. Asser"* + cohort channel unread → finish lesson → auto-prompt to submit exercise → posts to portfolio + cohort channel → peers react → streak +1.

3. **Live class (replacing Zoom)**
   Calendar/dashboard "Join" → pre-lobby (camera/mic check) → stage (instructor HD + screen/whiteboard) → chat + raise-hand + polls → breakout rooms for crew exercises → attendance auto-logged → ends → **replay + AI notes** posted to the course automatically.

4. **Assignment → critique → portfolio**
   Lesson exercise → upload film/edit/still → instructor grading queue → rubric + timestamped video critique → student revises → graded → auto-added to portfolio with the critique as provenance.

5. **Community belonging**
   Join → cohort Space auto-joined → course channels + clubs (Directors' Club, Sound Guild) + production crews → post a rough cut → threaded feedback → form a crew → crew gets a private channel + voice room + shared project.

6. **Admissions officer**
   Pipeline (Kanban: New → Reviewing → Interview → Decision) → open applicant → portfolio + statement + fit score → schedule interview → record decision → automated comms → yield analytics.

---

## 8. Feature Architecture (the systems the brief demands)

- **Learning:** Program → Course → Module → Lesson. Lesson surface = video + transcript + resources/downloads + notes (Notion-style) + bookmarks + Q&A/comments + **AI summary** + progress + next-lesson. Course = overview, instructor, curriculum, projects, discussion, reviews, certificate.
- **Community (Slack+Discord):** Spaces (Cohort, Course, Department, Club, Crew) → text/voice Channels → Threads. Announcements, pins, reactions, mentions, presence, typing, read receipts, media/file share, search, moderation, roles/badges.
- **Messaging (WhatsApp):** 1:1 + groups, voice notes, attachments (image/video/gif), reactions, replies, forward, typing, read receipts, push, search.
- **Live (Zoom replacement):** HD streaming, chat, raise-hand, attendance, polls, whiteboard, shared files, breakout rooms, recording, replay, session notes, announcements.
- **Portfolio:** auto-aggregates projects by discipline (Film, Photography, Editing, Motion, Color, VFX) + certificates + resume + skills + **public URL** (`soic.film/@name`).
- **Career Center:** jobs, internships, studios/agencies/production houses, applications, saved jobs, career events; matched to portfolio + skills.
- **AI (only what improves learning):** lesson summary, AI tutor (course-grounded Q&A), quiz generator, assignment pre-review, script assistant, storyboard assistant, portfolio feedback, career suggestions. *Each scoped, cited, instructor-overridable — assistive, never authoritative.*

---

## 9. Design System — "SOIC Noir" (cinematic, Arabic-first, dark)

The whole product reads like a film: dark rooms, light that matters, deliberate motion.

### Foundations / design tokens
```
/* Color — film-grade dark, warm gold key light */
--bg-900:#0A0A0B   /* theatre black            */
--bg-800:#101013   /* primary surface          */
--bg-700:#16161B   /* raised cards             */
--bg-600:#1E1E26   /* hover / inputs           */
--line:  #2A2A33   /* hairline borders         */
--ink-0: #F6F5F2   /* primary text (warm white)*/
--ink-1: #B8B6AE   /* secondary text           */
--ink-2: #74726B   /* muted / captions         */

--gold-500:#C9A24B /* brand key light — primary action  */
--gold-400:#E2C170 /* gold highlight / focus            */
--amber-glow:#F0B23C
--accent-film:#E5484D /* live / record / urgent           */
--accent-cool:#5B8DEF /* links / info                     */
--success:#3DD68C  --warning:#E6A23C  --danger:#E5484D

/* Light theme tokens mirror these (paper white, ink black, same gold) */

/* Type — display serif for cinema soul, clean sans for UI, Arabic-first */
--font-display: "Cairo","Tajawal", Georgia, serif;  /* EN can use a cinematic serif e.g. Fraunces/PP Editorial */
--font-ui:      "IBM Plex Sans Arabic","Inter", system-ui;  /* Arabic + Latin parity */
--font-mono:    "IBM Plex Mono", monospace;          /* timecodes, data */

/* Scale (1.250 major-third), 8pt spacing grid, 12-col fluid layout */
--radius: 4 / 8 / 14 / 22 / full
--shadow: layered, low-opacity, warm; glow on gold for focus
--ease:   cubic-bezier(.22,1,.36,1)   /* "film" easing */
--dur:    120 / 200 / 320 / 600ms
```

### Brand motion language
Deliberate, weighty, cinematic. Cross-fades over slides. Letterbox reveals on heroes. Light "blooms" on the gold focus ring. Reduced-motion fully respected. Motion should *explain* (where did this come from, where did it go), never decorate.

### Component library (states-first)
Buttons (primary-gold/secondary/ghost/danger · default/hover/active/focus/loading/disabled), inputs & forms (with inline validation), cards (course/lesson/event/film/job), tables, charts, badges & role chips, avatars + presence dot, navigation (sidebar/topbar/tabbar/breadcrumbs/⌘K palette), dialogs/sheets/toasts, progress (bar/ring/steps), tabs, tooltips, menus, **empty / loading (skeleton) / error states for every surface.**

### Accessibility & quality bars
WCAG 2.2 AA contrast (all gold-on-dark pairs verified), full keyboard nav + visible focus, ARIA roles, semantic HTML, RTL parity, `prefers-reduced-motion`, `prefers-color-scheme`, 44px hit targets, captions/transcripts on all video. **Performance:** image/video lazy-load, route-level code-split, skeletons over spinners, < 2.5s LCP target.

---

## 10. Build Roadmap (quality-first, vertical slices)

Rather than build all 40+ screens thinly, we ship **deep, real vertical slices** that prove the system, then extend.

- **Phase 0 — Foundation:** design tokens + core component library + bilingual/RTL shell + role-routing scaffold. *(This doc + the system.)*
- **Phase 1 — The Pitch:** public **Home** + one **Program detail** + **Apply** flow. (Conversion + brand proof.)
- **Phase 2 — The Campus:** **Student dashboard** + **Course home** + **Lesson player**. (The daily loop.)
- **Phase 3 — Belonging:** **Community** (Spaces/Channels/Threads) + **Messaging**.
- **Phase 4 — The Stage:** **Live Classroom** + **Calendar**.
- **Phase 5 — Outcomes:** **Portfolio** + **Career Center** + **Certificates**.
- **Phase 6 — Run it:** **Instructor**, **Admissions**, **Content**, **Moderator**, **Admin/Super-Admin** consoles.

Each slice ships with empty/loading/error states, responsive + RTL, and is genuinely interactive — not a static mock.

---

*This is the spine. The UI is built from it, not the other way around.*
