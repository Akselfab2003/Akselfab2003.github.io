/* =================================================================
   CONFIG — edit these values once; every page updates itself.
   ================================================================= */
const CONFIG = {
  first: "Aksel",
  last: "Fabricius",
  location: "Denmark",
  status: "Open to new roles",
  email: "aksel.fabricius@northflow.dev",
  github: "https://github.com/Akselfab2003",
  linkedin: "https://www.linkedin.com/in/aksel-munch-fabricius-0432a821b",
  fraudRepo: "https://github.com/Akselfab2003/azure-fraud-detection-pipeline",
  cv: ""          // e.g. "cv.pdf" placed in the repo root. Empty = hidden.
};

/* Certifications — add one object per certificate.
   url: link to the verification page (e.g. Microsoft Learn credential). Empty = no link. */
const CERTS = [
  { code: "AZ-900", name: "Azure Fundamentals", issuer: "Microsoft", date: "October 2026", url: "https://learn.microsoft.com/api/credentials/share/en-us/AkselMunchFabricius-8017/206725A934A689A1?sharingId=22B7827C39204F3" }
];

/* Projects — order here drives "next / previous" links on case studies */
const PROJECTS = [
  { slug: "release-system", title: "Release system" },
  { slug: "legacy-modernisation", title: "Legacy modernisation" },
  { slug: "ccp", title: "CCP platform" },
  { slug: "fraud-pipeline", title: "Fraud detection pipeline" },
  { slug: "trading-bot", title: "Trading bot" }
];

/* ================================================================= */
const BASE = document.body.dataset.base || "";
const PAGE = document.body.dataset.page || "";
const NAME = `${CONFIG.first} ${CONFIG.last}`;
const INIT = (CONFIG.first[0] || "") + (CONFIG.last[0] || "");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- nav + footer ---------- */
const nav = $("#nav");
if (nav) nav.outerHTML = `
<a class="skip" href="#main">Skip to content</a>
<header class="nav"><div class="wrap">
  <a class="brand" href="${BASE}index.html" aria-label="${NAME} — home"><span class="mark">${INIT}</span><span>${NAME}</span></a>
  <ul>
    <li><a href="${BASE}index.html#work" ${PAGE === "work" ? 'aria-current="page"' : ""}>Work</a></li>
    <li><a href="${BASE}index.html#skills">Skills</a></li>
    <li><a href="${BASE}index.html#experience">Experience</a></li>
    <li><a href="${BASE}index.html#certifications">Certifications</a></li>
    <li><a href="${BASE}index.html#contact">Contact</a></li>
  </ul>
  <span class="status-pill"><i></i>${CONFIG.status}</span>
  <button class="theme" id="theme" aria-label="Toggle light / dark theme">
    <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
    <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
  </button>
</div></header>`;

const foot = $("#foot");
if (foot) foot.outerHTML = `
<footer class="foot"><div class="wrap">
  <div><span class="label">Get in touch</span><br><a class="big" href="mailto:${CONFIG.email}">${CONFIG.email}</a></div>
  <div class="links">
    <a href="${CONFIG.github}" target="_blank" rel="noopener">GitHub ↗</a>
    <a href="${CONFIG.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
    ${CONFIG.cv ? `<a href="${BASE}${CONFIG.cv}" target="_blank" rel="noopener">CV ↓</a>` : ""}
  </div>
  <div class="meta label"><span>© ${new Date().getFullYear()} ${NAME}</span><span>Hand-built · static · no trackers</span><span>${CONFIG.location}</span></div>
</div></footer>`;

/* config placeholders anywhere on the page */
const TEXT = { first: CONFIG.first, last: CONFIG.last, name: NAME, location: CONFIG.location, email: CONFIG.email, status: CONFIG.status };
const HREF = { mailto: `mailto:${CONFIG.email}`, github: CONFIG.github, linkedin: CONFIG.linkedin, fraudRepo: CONFIG.fraudRepo };
$$("[data-cfg]").forEach(el => el.textContent = TEXT[el.dataset.cfg] ?? "");
$$("[data-href]").forEach(el => el.href = HREF[el.dataset.href] || "#");
if (document.title.includes("{name}")) document.title = document.title.replace("{name}", NAME);

/* ---------- certifications ---------- */
const certList = $("#cert-list");
if (certList) certList.innerHTML = CERTS.map((c, i) => {
  const tag = c.url ? "a" : "div";
  const attrs = c.url ? ` href="${c.url}" target="_blank" rel="noopener"` : "";
  return `<${tag} class="cert rv${i % 3 ? " d" + (i % 3) : ""}"${attrs}>
    <div class="seal" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="sp${i}" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
      <circle cx="50" cy="50" r="47" class="ring"/><circle cx="50" cy="50" r="30" class="core"/>
      <text class="arc"><textPath href="#sp${i}" textLength="234" lengthAdjust="spacing">${(c.issuer + " · certified · " + c.code + " · ").toUpperCase()}</textPath></text>
      <text x="50" y="55" class="mid" text-anchor="middle">${c.code}</text></svg></div>
    <div class="cert-body">
      <span class="label">${c.issuer}</span>
      <div class="cert-code">${c.code}</div>
      <div class="cert-name">${c.name}</div>
      <div class="cert-meta"><span>Earned ${c.date}</span>${c.url ? `<span class="accent">Verify ↗</span>` : ""}</div>
    </div>
  </${tag}>`;
}).join("");

/* ---------- theme ---------- */
$("#theme")?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) { }
});

/* ---------- next / prev on case studies ---------- */
const nx = $("#next");
if (nx) {
  const i = PROJECTS.findIndex(p => p.slug === nx.dataset.slug);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
  nx.innerHTML = `
    <a href="${prev.slug}.html"><span class="label">← Previous</span><span class="display">${prev.title}</span></a>
    <a href="${next.slug}.html"><span class="label">Next →</span><span class="display">${next.title}</span></a>`;
}

/* ---------- reveal + count-up ---------- */
function countUp(el) {
  const to = +el.dataset.count, tail = el.querySelector("small")?.outerHTML || "";
  const fmt = n => n.toLocaleString("en-US");
  if (reduce || !to) { el.innerHTML = fmt(to) + tail; return; }
  const t0 = performance.now(), d = 1500;
  (function tick(t) {
    const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 4);
    el.innerHTML = fmt(Math.round(to * e)) + tail;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  $$("[data-count]", e.target).forEach(countUp);
  e.target.dispatchEvent(new CustomEvent("reveal"));
  io.unobserve(e.target);
}), { threshold: .15 });
$$(".rv").forEach(el => io.observe(el));

/* ---------- oscilloscope (home) ---------- */
(function () {
  const cv = $("#scope"); if (!cv) return;
  const cx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
  let W = 0, H = 0; const N = 480, buf = new Float32Array(N), flag = new Uint8Array(N);
  let i = 0, t = 0, anomaly = 0, freq = 1, tf = 1, amp = .3;
  const size = () => { const r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  new ResizeObserver(size).observe(cv); size();
  cv.parentElement.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); tf = .5 + 2.2 * ((e.clientX - r.left) / r.width); amp = .16 + .28 * (1 - (e.clientY - r.top) / r.height); });
  cv.parentElement.addEventListener("pointerleave", () => { tf = 1; amp = .3; });
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#FF5A1F";
  function sample() {
    t += .045 * freq;
    let y = Math.sin(t) * amp + Math.sin(t * 2.7 + 1) * amp * .28 + (Math.random() - .5) * .03, f = 0;
    if (anomaly <= 0 && Math.random() < .004) anomaly = 16;
    if (anomaly > 0) { const k = (16 - anomaly) / 16; y += Math.sin(k * Math.PI * 3) * (.5 - k * .2) * (k < .5 ? 1 : -1); anomaly--; f = 1; }
    return [y, f];
  }
  for (let s = 0; s < N; s++) { const [y, f] = sample(); buf[s] = y; flag[s] = 0; }
  function draw() {
    freq += (tf - freq) * .05;
    for (let s = 0; s < 3; s++) { const [y, f] = sample(); buf[i] = y; flag[i] = f; i = (i + 1) % N; }
    cx.clearRect(0, 0, W, H);
    cx.strokeStyle = "rgba(255,255,255,.06)"; cx.lineWidth = 1;
    for (let g = 1; g < 10; g++) { cx.beginPath(); cx.moveTo(g * W / 10, 0); cx.lineTo(g * W / 10, H); cx.stroke(); }
    for (let g = 1; g < 8; g++) { cx.beginPath(); cx.moveTo(0, g * H / 8); cx.lineTo(W, g * H / 8); cx.stroke(); }
    const X = k => k / (N - 1) * W, Y = v => H / 2 - v * H * .5;
    cx.lineWidth = 2; cx.strokeStyle = "#A6FF6E"; cx.shadowColor = "#A6FF6E"; cx.shadowBlur = 10;
    const segs = 24;
    for (let s = 0; s < segs; s++) {
      const a = Math.floor(s * N / segs), b = Math.floor((s + 1) * N / segs), age = ((i - b + N) % N) / N;
      cx.globalAlpha = Math.max(.07, 1 - age * 1.05); cx.beginPath();
      for (let k = a; k <= Math.min(b, N - 1); k++) k === a ? cx.moveTo(X(k), Y(buf[k])) : cx.lineTo(X(k), Y(buf[k]));
      cx.stroke();
    }
    cx.globalAlpha = 1; cx.shadowBlur = 0;
    cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(X((i - 1 + N) % N), Y(buf[(i - 1 + N) % N]), 2.6, 0, 7); cx.fill();
    let k = 0; const ac = accent();
    while (k < N) {
      if (flag[k]) {
        let e = k; while (e < N && flag[e]) e++;
        let mn = 1, mx = -1; for (let q = k; q < e; q++) { mn = Math.min(mn, buf[q]); mx = Math.max(mx, buf[q]); }
        const x0 = X(k) - 6, x1 = X(e) + 6, y0 = Y(mx) - 8, y1 = Y(mn) + 8;
        cx.strokeStyle = ac; cx.lineWidth = 1.25; cx.setLineDash([4, 3]); cx.strokeRect(x0, y0, x1 - x0, y1 - y0); cx.setLineDash([]);
        cx.font = "500 10px 'IBM Plex Mono', monospace"; const lbl = "ANOMALY", tw = cx.measureText(lbl).width + 10;
        const lx = Math.min(Math.max(x0, 4), W - tw - 4), ly = Math.max(y0 - 17, 4);
        cx.fillStyle = ac; cx.fillRect(lx, ly, tw, 14); cx.fillStyle = "#fff"; cx.fillText(lbl, lx + 5, ly + 10.5);
        k = e;
      } else k++;
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- skill gauge (home) ---------- */
const SKILLS = {
  "Backend": [["C#", "strong"], [".NET / ASP.NET Core", "strong"], ["Entity Framework Core", "strong"], ["SQL", "strong"], ["Python", "strong"], ["TypeScript", "strong"], ["Go", "strong"], ["Java", "familiar"]],
  "Cloud & DevOps": [["Azure", "strong"], ["Azure DevOps", "strong"], ["GitHub Actions", "strong"], ["Docker", "strong"], ["Jenkins", "strong"], ["Bicep", "working"], ["Ansible", "familiar"]],
  "Data & messaging": [["PostgreSQL", "strong"], ["MSSQL", "strong"], ["RabbitMQ", "strong"], ["Kafka", "strong"], ["Redis", "strong"], ["MongoDB", "working"], ["Spark / Hadoop", "familiar"]],
  "Security": [["OAuth2 / OIDC", "strong"], ["RBAC & AuthZ", "strong"], ["Secrets management", "strong"], ["Pentesting", "strong"], ["Web security", "strong"], ["Reverse engineering", "working"], ["Cryptography", "working"]],
  "Architecture": [["REST APIs", "strong"], ["Microservices", "strong"], ["gRPC", "strong"], ["CQRS", "strong"], ["SOAP / WCF", "strong"], ["OpenTelemetry", "strong"]],
  "AI": [["LLM integration", "strong"], ["RAG", "strong"], ["Ollama / llama.cpp", "strong"], ["Claude Code / Copilot", "strong"], ["Vector search", "working"]],
  "Frontend": [["Blazor / Razor", "strong"], ["Next.js", "strong"], ["HTML / CSS / JS", "strong"], ["React", "strong"], ["Angular", "familiar"]]
};
(function () {
  const svg = $("#gauge"); if (!svg) return;
  const C = 200, R = 160, A0 = -120, A1 = 120, LV = { familiar: .2, working: .52, strong: .86 };
  const ZONES = [["familiar", 0, .36, "var(--mute)"], ["working", .36, .7, "var(--ink-2)"], ["strong", .7, 1, "var(--accent)"]];
  const pol = (a, r) => { const t = (a - 90) * Math.PI / 180; return [C + r * Math.cos(t), C + r * Math.sin(t)] }, ang = v => A0 + (A1 - A0) * v;
  const arc = (v0, v1, r) => { const [x0, y0] = pol(ang(v0), r), [x1, y1] = pol(ang(v1), r); return `M${x0},${y0} A${r},${r} 0 ${ang(v1) - ang(v0) > 180 ? 1 : 0} 1 ${x1},${y1}` };
  const mk = (tag, a) => { const e = document.createElementNS("http://www.w3.org/2000/svg", tag); for (const k in a) e.setAttribute(k, a[k]); return e };
  const zg = $("#g-zones"), tg = $("#g-ticks"), zones = {};
  ZONES.forEach(([id, a, b, col]) => { const p = mk("path", { d: arc(a + .004, b - .004, R), class: "g-zone", stroke: col }); zg.append(p); zones[id] = p });
  for (let n = 0; n <= 50; n++) { const v = n / 50, maj = n % 10 === 0, [x0, y0] = pol(ang(v), R - 12), [x1, y1] = pol(ang(v), R - (maj ? 30 : 20)); tg.append(mk("line", { x1: x0, y1: y0, x2: x1, y2: y1, class: "g-tick", "stroke-width": maj ? 2 : 1 })) }
  [["0", 0], ["100", 1]].forEach(([s, v]) => { const [x, y] = pol(ang(v), R - 46); const t = mk("text", { x, y, class: "g-num", "text-anchor": "middle", "dominant-baseline": "middle" }); t.textContent = s; tg.append(t) });
  const needle = $("#g-needle"), gName = $("#g-name"), gCat = $("#g-cat");
  let angle = A0, vel = 0, target = A0, wob = 0;
  (function loop() {
    vel += (target - angle) * .035; vel *= .86; angle += vel; wob += .07;
    needle.style.transform = `rotate(${angle + (reduce ? 0 : Math.sin(wob) * .35 + Math.sin(wob * 3.1) * .2)}deg)`; requestAnimationFrame(loop);
  })();
  const wrap = $("#skill-list"), all = [];
  for (const [cat, list] of Object.entries(SKILLS)) {
    const g = document.createElement("div"); g.className = "sg"; g.innerHTML = `<h4>${cat}</h4><div class="btns"></div>`;
    list.forEach(([n, l]) => {
      const b = document.createElement("button"); b.className = "sk"; b.dataset.l = l; b.innerHTML = `<i></i>${n}`;
      const pick = () => { select(b, n, l, cat); stop() }; b.addEventListener("click", pick); b.addEventListener("mouseenter", pick); b.addEventListener("focus", pick);
      $(".btns", g).append(b); all.push([b, n, l, cat]);
    });
    wrap.append(g);
  }
  function select(b, n, l, cat) {
    all.forEach(([x]) => x.classList.remove("on")); b.classList.add("on"); target = ang(LV[l]);
    gName.textContent = n.length > 16 ? n.split(" /")[0].split(" &")[0] : n; gCat.textContent = `${cat} · ${l}`;
    for (const id in zones) zones[id].classList.toggle("on", id === l);
  }
  let ai = 0, timer = null, touched = false; const stop = () => { clearInterval(timer); timer = null; touched = true };
  new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !timer && !touched) { select(...all[0]); timer = setInterval(() => select(...all[++ai % all.length]), 1700); }
    else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }), { threshold: .3 }).observe(svg);
})();

console.log("%c Hi, fellow developer 👋 ", "background:#FF5A1F;color:#fff;font:600 13px monospace;padding:4px");
console.log("%cThis site is plain HTML, CSS and JS on GitHub Pages — no framework, no trackers. Say hi: " + CONFIG.email, "font:12px monospace");
