/* ============================================================
   SOIC — Shared UI behaviours (public site + app shell)
   Theme · scroll reveals · nav · counters · marquee · palette
   ============================================================ */

/* ---- Theme ---- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("soic-theme", theme); } catch (e) {}
  document.querySelectorAll("[data-theme-label]").forEach(el => el.textContent = theme === "light" ? "☾" : "☀");
}
function initTheme() {
  let theme = "dark";
  try { theme = localStorage.getItem("soic-theme") || "dark"; } catch (e) {}
  applyTheme(theme);
  document.querySelectorAll("[data-theme-toggle]").forEach(btn =>
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      applyTheme(cur === "light" ? "dark" : "light");
    })
  );
}

/* ---- Scroll reveals ---- */
function initReveals() {
  const els = document.querySelectorAll(".reveal, .reveal-rise, [data-stagger]");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

/* ---- Sticky nav state ---- */
function initNav() {
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }
  const toggle = document.querySelector("[data-nav-toggle]");
  const drawer = document.querySelector("[data-nav-drawer]");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      drawer.classList.remove("open"); document.body.style.overflow = "";
    }));
  }
}

/* ---- Animated counters ---- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
      const dur = 1400, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ---- Command palette (⌘K) ---- */
function initPalette() {
  const palette = document.querySelector("[data-palette]");
  if (!palette) return;
  const open = () => { palette.classList.add("open"); palette.querySelector("input")?.focus(); };
  const close = () => palette.classList.remove("open");
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.classList.contains("open") ? close() : open(); }
    if (e.key === "Escape") close();
  });
  document.querySelectorAll("[data-palette-open]").forEach(b => b.addEventListener("click", open));
  palette.addEventListener("click", (e) => { if (e.target === palette) close(); });
  const input = palette.querySelector("input");
  const items = [...palette.querySelectorAll(".cmd-item")];
  input?.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    items.forEach(it => it.style.display = it.textContent.toLowerCase().includes(q) ? "" : "none");
  });
}

/* ---- Generic tab groups ---- */
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach(group => {
    const tabs = group.querySelectorAll(".tab");
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      if (!target) return;
      group.querySelectorAll("[data-panel]").forEach(p =>
        p.classList.toggle("hidden", p.dataset.panel !== target));
    }));
  });
}

/* ---- Student testimonials (3-row marquee) ---- */
function initTestimonials() {
  const host = document.querySelector("[data-testimonials]");
  if (!host || !window.SOIC_TESTIMONIALS) return;
  const data = window.SOIC_TESTIMONIALS, per = Math.ceil(data.length / 3);
  const card = (t) => {
    const init = t.n.split(" ").map(w => w[0]).slice(0, 2).join("");
    return `<figure class="testi-card"><div class="stars">★★★★★</div><p class="q">"${t.q}"</p>` +
      `<figcaption class="who"><span class="avatar sm" style="background:linear-gradient(135deg,#2a2230,#15151c)">${init}</span>` +
      `<span><span class="nm" style="display:block">${t.n}</span><span class="pr">${t.p}</span></span></figcaption></figure>`;
  };
  host.querySelectorAll(".testi-track").forEach((track, i) => {
    const group = data.slice(i * per, (i + 1) * per).map(card).join("");
    track.innerHTML = group + group; // duplicate for seamless loop
  });
}

/* ---- Seamless loop carousels (faculty, partners): duplicate children ---- */
function initLoops() {
  document.querySelectorAll("[data-loop]").forEach(t => { t.innerHTML += t.innerHTML; });
}

/* ---- Build the homepage video gallery (all 20 SOIC clips, single source of truth) ---- */
function buildVideoRail() {
  const rail = document.querySelector("[data-video-rail]");
  if (!rail) return;
  const videos = [
    ["vid-campus.mp4", "Inside the SOIC campus", "assets/img/campus-1.jpg"],
    ["vid-lighting.mp4", "Secrets of light intensity", "assets/img/prog-cinematography.jpeg"],
    ["vid-editing.mp4", "Editing & color lab", "assets/img/prog-editing.jpeg"],
    ["vid-camera.mp4", "Camera movement & light", "assets/img/prog-filmmaking.jpeg"],
    ["vid-workshop.mp4", "Commercial filming workshop", "assets/img/campus-2.jpg"],
    ["vid-malak.mp4", "Malak's Filmmaking story", "assets/img/show-2.jpeg"],
    ["vid-reem.mp4", "Reem from Bahrain", "assets/img/show-1.jpeg"],
    ["vid-omar.mp4", "Omar from Yemen", "assets/img/show-3.jpeg"],
    ["vid-certificate.mp4", "Your accredited certificate", "assets/img/prog-vfx.jpeg"],
    ["vid-activities.mp4", "Cinematography trainees at work", "assets/img/prog-cinematography.jpeg"],
    ["vid-makefilms.mp4", "Don't just watch — make films", "assets/img/prog-vfx.jpeg"],
    ["vid-learn-filmmaking.mp4", "Learn real, practical filmmaking", "assets/img/prog-filmmaking.jpeg"],
    ["vid-lightsetup.mp4", "Rigging the lights", "assets/img/prog-cinematography.jpeg"],
    ["vid-preshoot.mp4", "Steps before every shot", "assets/img/show-4.jpeg"],
    ["vid-editing-diploma.mp4", "Editing & color diploma", "assets/img/prog-editing.jpeg"],
    ["vid-underwater.mp4", "Underwater cinematography seminar", "assets/img/show-3.jpeg"],
    ["vid-seminar-pasha.mp4", "“Qasr El-Basha” film seminar", "assets/img/show-2.jpeg"],
    ["vid-shiko.mp4", "DoP Ahmed Bashary on campus", "assets/img/campus-1.jpg"],
    ["vid-reviews.mp4", "What our trainees say", "assets/img/show-1.jpeg"],
    ["vid-heba.mp4", "Media figure Heba Kamel on SOIC", "assets/img/campus-2.jpg"],
  ];
  const muteIco = '<svg class="i-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M11 5 6 9H2v6h4l5 4zM23 9l-6 6M17 9l6 6"/></svg><svg class="i-sound" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" style="display:none"><path d="M11 5 6 9H2v6h4l5 4zM19 12a4 4 0 0 0-2-3.5M22 12a8 8 0 0 0-4-7"/></svg>';
  const fullIco = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';
  rail.innerHTML = videos.map(([f, cap, poster]) =>
    `<figure class="vid-card" data-vid><video muted loop playsinline preload="none" poster="${poster}"><source src="assets/video/${f}" type="video/mp4" /></video>` +
    `<div class="vid-ctrls"><button class="vid-btn" data-mute aria-label="Toggle sound">${muteIco}</button><button class="vid-btn" data-full aria-label="Fullscreen">${fullIco}</button></div>` +
    `<figcaption class="vid-cap">${cap}</figcaption></figure>`).join("");
}

/* ---- Homepage video gallery (autoplay muted in view, mute + fullscreen) ---- */
function initVideos() {
  const cards = document.querySelectorAll("[data-vid]");
  if (!cards.length) return;
  // Auto-play only the clips currently in view; pause the rest (keeps it light)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const v = e.target.querySelector("video");
        if (!v) return;
        if (e.isIntersecting) { if (v.paused) v.play().catch(() => {}); }
        else { if (!v.paused) v.pause(); }
      });
    }, { threshold: 0.5 });
    cards.forEach(c => io.observe(c));
  } else {
    cards.forEach(c => c.querySelector("video")?.play().catch(() => {}));
  }
  // controls
  cards.forEach(card => {
    const v = card.querySelector("video");
    const muteBtn = card.querySelector("[data-mute]");
    const fullBtn = card.querySelector("[data-full]");
    const setIcons = () => {
      const m = muteBtn?.querySelector(".i-muted"), s = muteBtn?.querySelector(".i-sound");
      if (m && s) { m.style.display = v.muted ? "" : "none"; s.style.display = v.muted ? "none" : ""; }
      card.classList.toggle("is-playing-sound", !v.muted);
    };
    muteBtn?.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      v.muted = !v.muted;
      if (!v.muted) v.play().catch(() => {});
      setIcons();
    });
    card.addEventListener("click", () => { v.muted = !v.muted; if (!v.muted) v.play().catch(()=>{}); setIcons(); });
    fullBtn?.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      const el = v;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
    });
  });
}

/* ---- Public nav: when logged in, swap "Log in" for an avatar menu (Dashboard / Account / Log out) ---- */
function initAuthNav() {
  let authed = false, user = null, role = "student";
  try {
    authed = localStorage.getItem("soic-auth") === "1";
    user = JSON.parse(localStorage.getItem("soic-user") || "null");
    role = localStorage.getItem("soic-role") || "student";
  } catch (e) {}
  const loginLink = document.querySelector('.nav .actions a[href="login.html"]');
  if (!authed || !loginLink) return; // logged out -> leave the real "Log in" button in place
  const home = role === "instructor" ? "instructor.html" : "app.html";
  const name = (user && user.name) || "Member";
  const initials = name ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase() : "ME";
  const inner = (user && user.avatar) ? '<img src="' + user.avatar + '" alt="">' : initials;
  const style = (user && user.avatar) ? "" : "background:linear-gradient(135deg,#2e2740,#181522)";
  const wrap = document.createElement("div");
  wrap.className = "nav-user";
  wrap.innerHTML =
    '<button class="avatar sm" type="button" data-user-toggle title="' + name + '" style="' + style + '">' + inner + '</button>' +
    '<div class="user-menu">' +
      '<div class="user-menu-head"><span class="avatar sm" style="' + style + '">' + inner + '</span>' +
        '<div><div class="um-name">' + name + '</div><div class="um-role">' + (role === "instructor" ? "Instructor" : "Student") + '</div></div></div>' +
      '<a href="' + home + '">Dashboard</a>' +
      '<a href="profile.html">My account</a>' +
      '<button type="button" data-logout>Log out</button>' +
    '</div>';
  loginLink.replaceWith(wrap);
  const menu = wrap.querySelector(".user-menu");
  wrap.querySelector("[data-user-toggle]").addEventListener("click", (e) => { e.stopPropagation(); menu.classList.toggle("open"); });
  document.addEventListener("click", () => menu.classList.remove("open"));
  wrap.querySelector("[data-logout]").addEventListener("click", () => {
    try { ["soic-auth", "soic-role", "soic-user"].forEach(k => localStorage.removeItem(k)); } catch (e) {}
    window.location.href = "index.html";
  });
}

/* ---- Apply modal (overlay form) ---- */
function initApplyModal() {
  const modal = document.getElementById("applyModal");
  if (!modal) return;
  const open = (e) => { if (e) e.preventDefault(); modal.classList.add("open"); document.body.classList.add("modal-open"); modal.setAttribute("aria-hidden", "false"); };
  const close = () => { modal.classList.remove("open"); document.body.classList.remove("modal-open"); modal.setAttribute("aria-hidden", "true"); };
  document.querySelectorAll("[data-apply-open]").forEach(b => b.addEventListener("click", open));
  modal.querySelectorAll("[data-apply-close]").forEach(b => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });
  document.getElementById("applyModalForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.classList.add("hidden");
    document.getElementById("applyModalDone").classList.remove("hidden");
  });
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  if (typeof initLang === "function") initLang();
  initReveals(); initNav(); initCounters(); initPalette(); initTabs();
  initTestimonials(); initLoops(); buildVideoRail(); initVideos(); initApplyModal(); initAuthNav();
});
