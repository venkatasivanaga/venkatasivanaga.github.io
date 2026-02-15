(function () {
  const STORAGE_KEY = "theme"; // "light" | "dark"
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Sync checkbox UI if present
    const toggle = document.getElementById("themeToggle");
    if (toggle && toggle.type === "checkbox") {
      toggle.checked = theme === "light";
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;

    const systemPrefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    return systemPrefersLight ? "light" : "dark";
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getInitialTheme());

    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked ? "light" : "dark");
    });
  });
})();
