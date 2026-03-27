// assets/js/header.js
(() => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  // Build nav links (anchors on home, normal links elsewhere)
  const onHome = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");

  const links = onHome
    ? `
      <a href="/projects">Projects</a>
      <a href="/#skills">Skills</a>
      <a href="/#education">Education</a>
      <a href="/#experience">Experience</a>
      <a href="/#contact">Contact</a>
    `
    : `
      <a href="/projects/">Projects</a>
      <a href="/#skills">Skills</a>
      <a href="/#education">Education</a>
      <a href="/#experience">Experience</a>
      <a href="/#contact">Contact</a>
    `;

  headerEl.innerHTML = `
    <nav class="nav">
      <a class="brand" href="/">Venkata Siva Reddy Naga</a>

      <div class="nav-links" id="navLinks">
        ${links}
      </div>

      <label class="theme-toggle" title="Toggle theme">
        <input id="themeToggle" type="checkbox" aria-label="Toggle theme" />
        <span class="track">
          <span class="icon sun">☀️</span>
          <span class="icon moon">🌙</span>
          <span class="thumb"></span>
        </span>
      </label>
    </nav>
  `;

  // Optional: mark active link (simple heuristic)
  const navLinks = headerEl.querySelectorAll(".nav-links a");
  const path = window.location.pathname;

  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const isProjects = href.startsWith("/projects");
    const onProjectsPage = path.startsWith("/projects");

    if (isProjects && onProjectsPage) a.classList.add("active");
    if (onHome && href.startsWith("/#")) a.classList.remove("active");
  });
})();
