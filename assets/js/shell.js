/* ============================================================
   SOIC — App shell renderer (role-aware sidebar, topbar,
   notifications, tabbar, command palette). Injected into
   [data-sidebar] / [data-topbar] / [data-tabbar] / [data-palette-host].
   Page sets: <body data-role="student|instructor" data-active="key" data-title="...">
   ============================================================ */
(function () {
  /* --- Auth + role gate ---------------------------------------------------
     Presentational only: this shapes the UX flow (must "log in"; each role
     sees its own area). It is NOT a security boundary — anyone can edit
     localStorage. When a real backend exists, every protected action MUST be
     enforced server-side; never trust these client values.
  ------------------------------------------------------------------------ */
  try {
    var _auth = localStorage.getItem("soic-auth");
    var _role = localStorage.getItem("soic-role");
    if (_auth !== "1") { window.location.replace("login.html"); return; }
    var _pageRole = document.body.dataset.role; // set on role-specific pages
    if (_pageRole && _role && _pageRole !== _role) {
      window.location.replace(_role === "instructor" ? "instructor.html" : "app.html"); return;
    }
  } catch (e) { /* storage unavailable — cannot enforce, fall through to render */ }

  const I = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    live: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
    check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    people: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    case: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    grade: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    cert: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.5 17 22l-5-3-5 3 1.5-9.5"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6c.1-.3.1-.7.1-1z"/>'
  };
  const svg = (p) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' + p + '</svg>';
  // avatar inner = uploaded photo (if any) else initials; bg gradient only when there's no photo
  const avInner = (c) => c.avatar ? '<img src="' + c.avatar + '" alt="">' : c.initials;
  const avStyle = (c) => c.avatar ? '' : 'background:' + c.grad;

  const ROLES = {
    student: {
      name: "Layla Mansour", role: "Student", initials: "LM", grad: "linear-gradient(135deg,#2e2740,#181522)",
      groups: [
        { label: "Learn", items: [
          ["dashboard", "Dashboard", "app.html", I.grid],
          ["courses", "My Courses", "courses.html", I.book],
          ["live", "Live Classes", "live.html", I.live, "2"],
          ["assignments", "Assignments", "assignments.html", I.check, "3", true],
          ["calendar", "Calendar", "calendar.html", I.cal],
        ]},
        { label: "Create", items: [
          ["projects", "Projects", "projects.html", I.folder],
          ["portfolio", "Portfolio", "portfolio.html", I.user],
          ["showcase", "Showcase", "showcase-app.html", I.play],
        ]},
        { label: "Connect", items: [
          ["community", "Community", "community.html", I.people, "12"],
          ["messages", "Messages", "messages.html", I.chat, "5", true],
          ["career", "Career Center", "career.html", I.case],
        ]},
      ],
      tabbar: [["dashboard","Home","app.html",I.grid],["courses","Learn","courses.html",I.book],["live","Live","live.html",I.live],["community","Community","community.html",I.people],["messages","Messages","messages.html",I.chat]]
    },
    instructor: {
      name: "Dr. Mohamed Asser", role: "Instructor", initials: "MA", grad: "linear-gradient(135deg,#2b2622,#15130f)",
      groups: [
        { label: "Teach", items: [
          ["dashboard", "Dashboard", "instructor.html", I.grid],
          ["cohorts", "My Cohorts", "instructor.html", I.people],
          ["grading", "Grading Queue", "instructor.html", I.grade, "14", true],
          ["console", "Live Console", "instructor.html", I.live],
          ["content", "Content Studio", "instructor.html", I.edit],
          ["calendar", "Calendar", "instructor.html", I.cal],
        ]},
        { label: "Connect", items: [
          ["community", "Community", "community.html", I.people],
          ["messages", "Messages", "messages.html", I.chat, "7", true],
        ]},
      ],
      tabbar: [["dashboard","Home","instructor.html",I.grid],["grading","Grading","instructor.html",I.grade],["console","Live","instructor.html",I.live],["community","Community","community.html",I.people],["messages","Messages","messages.html",I.chat]]
    }
  };

  function getRole() {
    const want = document.body.dataset.role;
    if (want) return want;
    try { return localStorage.getItem("soic-role") || "student"; } catch (e) { return "student"; }
  }

  function buildSidebar(cfg, active) {
    let h = '<a href="index.html" class="brand"><img src="assets/img/logo-soic.png" alt="SOIC Campus" class="brand-logo" /></a>';
    cfg.groups.forEach(g => {
      h += '<div class="side-group"><div class="label" data-i18n="group.' + g.label.toLowerCase() + '">' + g.label + '</div>';
      g.items.forEach(it => {
        const [key, label, href, icon, count, alert] = it;
        const cls = "side-link" + (key === active ? " active" : "");
        const badge = count ? ' <span class="count' + (alert ? " alert" : "") + '">' + count + '</span>' : '';
        h += '<a href="' + href + '" class="' + cls + '">' + svg(icon) + ' <span data-i18n="side.' + key + '">' + label + '</span>' + badge + '</a>';
      });
      h += '</div>';
    });
    h += '<div class="side-foot"><a class="role-switch" href="profile.html">' +
      '<span class="avatar sm" style="' + avStyle(cfg) + '">' + avInner(cfg) + '</span>' +
      '<span class="meta"><span class="n">' + cfg.name + '</span><span class="r" data-i18n="role.' + cfg.role.toLowerCase() + '">' + cfg.role + '</span></span>' +
      '<span class="chev">' + svg('<path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>') + '</span></a></div>';
    return h;
  }

  function buildTopbar(cfg, title) {
    const liveBtn = (cfg.role === "Student")
      ? '<a href="live.html" class="btn btn-live btn-sm"><span style="width:7px;height:7px;border-radius:50%;background:#fff;display:inline-block"></span> Join live</a>'
      : '<a href="instructor.html" class="btn btn-live btn-sm"><span style="width:7px;height:7px;border-radius:50%;background:#fff;display:inline-block"></span> Go live</a>';
    return '<div class="crumbs"><a href="' + (cfg.role==="Student"?"app.html":"instructor.html") + '" class="muted">Campus</a><span class="sep">/</span><span class="page-title">' + title + '</span></div>' +
      '<div class="spacer"></div>' +
      '<button class="searchbox search-trigger" data-palette-open><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg> Search… <kbd>⌘K</kbd></button>' +
      liveBtn +
      '<div class="notif-wrap"><button class="icon-btn" data-notif aria-label="Notifications"><span class="dot"></span><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg></button>' + notifPanel() + '</div>' +
      '<button class="icon-btn" data-theme-toggle aria-label="Theme"><span data-theme-label>☀</span></button>' +
      '<button class="icon-btn" data-lang-toggle aria-label="Language" style="font-family:var(--font-mono);font-size:12px"><span data-lang-label>ع</span></button>' +
      '<a href="profile.html" class="avatar sm" title="My account" style="' + avStyle(cfg) + '">' + avInner(cfg) + '</a>';
  }

  function notifPanel() {
    const items = [
      ["live", "Color Grading goes live in 2h", "Dr. Yehia Fahmy · Live Stage 1", "now"],
      ["grade", "Your mood study was graded", "Dr. Mohamed Asser left a video critique", "1h"],
      ["people", "Karim mentioned you in #cohort-f26", "“need one more hand on the dolly”", "3h"],
      ["cert", "Certificate ready to download", "Editing · Module 2 complete", "1d"],
    ];
    let h = '<div class="notif-panel"><div class="notif-head">Notifications <a href="#" class="link t-xs">Mark all read</a></div>';
    items.forEach(it => {
      h += '<a href="#" class="notif-item"><span class="ic">' + svg(I[it[0]] || I.live) + '</span><span class="bd"><span class="t">' + it[1] + '</span><span class="s">' + it[2] + '</span></span><span class="w">' + it[3] + '</span></a>';
    });
    h += '<a href="#" class="notif-all">View all notifications</a></div>';
    return h;
  }

  function buildTabbar(cfg, active) {
    return cfg.tabbar.map(it => {
      const [key, label, href, icon] = it;
      return '<a href="' + href + '" class="' + (key === active ? "active" : "") + '">' + svg(icon) + label + '</a>';
    }).join("");
  }

  function paletteHTML() {
    const row = (icon, text) => '<div class="cmd-item">' + svg(icon) + ' ' + text + '</div>';
    return '<div class="palette" data-palette><div class="box"><input type="text" placeholder="Search lessons, people, channels, or run a command…" aria-label="Command palette" /><div class="list">' +
      '<a href="courses.html" class="cmd-item">' + svg(I.book) + ' Go to My Courses <kbd>↵</kbd></a>' +
      row(I.live, "Join live: Color Grading Masterclass") +
      row(I.people, "Open channel: # cohort-f26") +
      row(I.chat, "Message: Dr. Mohamed Asser") +
      '<a href="portfolio.html" class="cmd-item">' + svg(I.user) + ' Go to my portfolio</a>' +
      '<a href="login.html" class="cmd-item">' + svg(I.cog) + ' Switch role / log out</a>' +
      '</div></div></div>';
  }

  function initNotif() {
    const btn = document.querySelector("[data-notif]");
    const panel = document.querySelector(".notif-panel");
    if (!btn || !panel) return;
    btn.addEventListener("click", (e) => { e.stopPropagation(); panel.classList.toggle("open"); });
    document.addEventListener("click", (e) => { if (!panel.contains(e.target) && e.target !== btn) panel.classList.remove("open"); });
  }

  // ---- render ----
  const cfg = Object.assign({}, ROLES[getRole()] || ROLES.student);
  // overlay the logged-in user's name + photo (from login/signup), if present
  try {
    const _u = JSON.parse(localStorage.getItem("soic-user") || "null");
    if (_u) {
      if (_u.name) { cfg.name = _u.name; cfg.initials = _u.name.trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); }
      if (_u.avatar) cfg.avatar = _u.avatar;
    }
  } catch (e) {}
  const active = document.body.dataset.active || "dashboard";
  const title = document.body.dataset.title || "Dashboard";
  const sb = document.querySelector("[data-sidebar]"); if (sb) sb.innerHTML = buildSidebar(cfg, active);
  const tb = document.querySelector("[data-topbar]"); if (tb) tb.innerHTML = buildTopbar(cfg, title);
  const bb = document.querySelector("[data-tabbar]"); if (bb) bb.innerHTML = buildTabbar(cfg, active);
  const ph = document.querySelector("[data-palette-host]"); if (ph) ph.innerHTML = paletteHTML();
  document.addEventListener("DOMContentLoaded", initNotif);
  // expose current user for pages
  window.SOIC_USER = { name: cfg.name, role: cfg.role, initials: cfg.initials };
})();
