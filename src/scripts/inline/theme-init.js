(function () {
  function applyTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  applyTheme();
  document.addEventListener("astro:after-swap", applyTheme);
})();
(function () {
  if (!document?.documentElement) return;
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  if (!isDesktop) {
    document.documentElement.dataset.adminSidebar = "closed";
    return;
  }
  const storedState = localStorage.getItem("admin-sidebar-state");
  if (storedState === "open" || storedState === "closed" || storedState === "minimized") {
    document.documentElement.dataset.adminSidebar = storedState;
  } else {
    document.documentElement.dataset.adminSidebar = "open";
  }
})();
