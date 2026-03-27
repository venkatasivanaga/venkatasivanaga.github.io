async function loadProjects() {
  const res = await fetch("/data/projects.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load /data/projects.json");
  return await res.json();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function projectCard(p) {
  const card = document.createElement("div");
  card.className = "project";

  const titleRow = el("div", "project-title");
  titleRow.textContent = p.title || p.id || "Untitled";
  card.appendChild(titleRow);

  card.appendChild(el("div", "project-sub", p.subtitle || ""));

  const tags = el("div", "tags");
  (p.tags || []).forEach(t => tags.appendChild(el("span", "tag", t)));
  card.appendChild(tags);

  const actions = el("div", "actions");
  if (p.page !== false) {
    const details = document.createElement("a");
    details.className = "btn ghost";
    details.href = `/projects/${p.id}/`;
    details.textContent = "Details";
    actions.appendChild(details);
  }
  if (p.repo) {
    const repo = document.createElement("a");
    repo.className = "btn";
    repo.href = p.repo;
    repo.target = "_blank";
    repo.rel = "noreferrer";
    repo.textContent = "GitHub";
    actions.appendChild(repo);
  }
  if (p.demo) {
    const demo = document.createElement("a");
    demo.className = "btn";
    demo.href = p.demo;
    demo.target = "_blank";
    demo.rel = "noreferrer";
    demo.textContent = "Live Demo";
    actions.appendChild(demo);
  }
  if (actions.childNodes.length) card.appendChild(actions);

  // Make clicking the card go to details (but keep buttons working)
  card.addEventListener("click", () => {
    if (p.page !== false) window.location.href = `/projects/${p.id}/`;
  });

  return card;
}

async function main() {
  const list = document.getElementById("project-list");
  const status = document.getElementById("project-status");

  try {
    const projects = await loadProjects();
    list.innerHTML = "";
    projects.forEach(p => list.appendChild(projectCard(p)));
    status.textContent = `${projects.length} projects loaded`;
  } catch (e) {
    console.error(e);
    status.textContent = "Failed to load projects. Open DevTools → Console for the error.";
  }
}

document.addEventListener("DOMContentLoaded", main);
