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

/* ---- Homepage video gallery (autoplay muted in view, mute + fullscreen) ---- */
function initVideos() {
  const cards = document.querySelectorAll("[data-vid]");
  if (!cards.length) return;
  // play / pause when in view
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const v = e.target.querySelector("video");
        if (!v) return;
        if (e.isIntersecting) { v.play().catch(() => {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.4 });
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

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  if (typeof initLang === "function") initLang();
  initReveals(); initNav(); initCounters(); initPalette(); initTabs();
  initTestimonials(); initVideos();
});
