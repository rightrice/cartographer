(() => {
  const THEME_KEY = "site-theme"; // "light" | "dark"
  const root = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const themeName = document.getElementById("themeName");
  const themeBadge = document.getElementById("themeBadge");
  const year = document.getElementById("year");

  year.textContent = String(new Date().getFullYear());

  function prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function labelFor(theme) {
    return theme === "dark" ? "Moon" : "Sun";
  }

  function iconFor(theme) {
    return theme === "dark" ? "☾" : "☀";
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return prefersDark() ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    const label = labelFor(theme);
    const icon = iconFor(theme);
    const isDark = theme === "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      const iconEl = themeToggle.querySelector(".btn-icon");
      const textEl = themeToggle.querySelector(".btn-text");
      if (iconEl) iconEl.textContent = icon;
      if (textEl) textEl.textContent = label;
    }

    if (themeName) themeName.textContent = label;
    if (themeBadge) themeBadge.textContent = label;
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // Init
  applyTheme(getInitialTheme());

  // Click
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // Follow OS changes only if user hasn't chosen manually
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== "light" && saved !== "dark") {
      applyTheme(prefersDark() ? "dark" : "light");
    }
  });
})();