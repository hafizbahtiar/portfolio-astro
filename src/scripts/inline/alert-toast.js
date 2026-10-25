// One toast controller for every <AlertToast>. It looks the element up by id on every call, so a toast
// on a page reached by a ClientRouter swap works even when this inline script does not run again there
// (that is what silently swallowed toasts after navigating list -> edit).
(function () {
  if (window.__uiAlerts) return;

  const panelVariants = {
    success: ["border-emerald-500/40"],
    error: ["border-red-500/40"],
    warning: ["border-amber-400/40"],
    info: ["border-sky-400/40"],
  };
  const iconVariants = {
    success: ["border-emerald-500/40", "text-emerald-600", "dark:text-emerald-400"],
    error: ["border-red-500/40", "text-red-600", "dark:text-red-400"],
    warning: ["border-amber-400/40", "text-amber-700", "dark:text-amber-300"],
    info: ["border-sky-400/40", "text-sky-600", "dark:text-sky-300"],
  };
  const allPanelClasses = Object.values(panelVariants).flat();
  const allIconClasses = Object.values(iconVariants).flat();

  // Per toast element: its countdown, and its listeners bound once.
  const states = new WeakMap();
  const stateOf = (root) => {
    let s = states.get(root);
    if (s) return s;
    s = { hideTimer: null, remaining: 0, startedAt: 0 };
    states.set(root, s);
    const start = () => {
      if (s.remaining <= 0 || s.hideTimer) return;
      s.startedAt = Date.now();
      s.hideTimer = window.setTimeout(() => hide(root), s.remaining);
    };
    // Hovering or focusing the toast pauses the countdown, so a long error can be read.
    const pause = () => {
      if (!s.hideTimer) return;
      clearTimeout(s.hideTimer);
      s.hideTimer = null;
      s.remaining = Math.max(1000, s.remaining - (Date.now() - s.startedAt));
    };
    s.start = start;
    root.addEventListener("mouseenter", pause);
    root.addEventListener("focusin", pause);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusout", start);
    root.querySelector("[data-alert-close]")?.addEventListener("click", () => hide(root));
    return s;
  };

  const hide = (root) => {
    const s = stateOf(root);
    if (s.hideTimer) clearTimeout(s.hideTimer);
    s.hideTimer = null;
    s.remaining = 0;
    root.classList.remove("opacity-100", "translate-y-0");
    root.classList.add("opacity-0", "-translate-y-2");
    window.setTimeout(() => root.classList.add("hidden"), 240);
  };

  const show = (root, options = {}) => {
    const { type = "info", title = "Notification", message = "Action completed.", duration = 2200 } = options;
    const s = stateOf(root);
    const panel = root.querySelector("[data-alert-panel]");
    const icon = root.querySelector("[data-alert-icon]");
    panel?.classList.remove(...allPanelClasses);
    panel?.classList.add(...(panelVariants[type] || panelVariants.info));
    if (icon) {
      icon.classList.remove(...allIconClasses);
      icon.classList.add(...(iconVariants[type] || iconVariants.info));
      icon.textContent = type.toUpperCase();
    }
    const titleEl = root.querySelector("[data-alert-title]");
    const messageEl = root.querySelector("[data-alert-message]");
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;

    root.classList.remove("hidden", "opacity-0", "-translate-y-2");
    root.classList.add("opacity-100", "translate-y-0");

    if (s.hideTimer) clearTimeout(s.hideTimer);
    s.hideTimer = null;
    // Long messages stay long enough to read (~50 ms a character, up to 15 s).
    s.remaining =
      duration > 0 ? Math.max(duration, Math.min(15000, 1500 + `${title} ${message}`.length * 50)) : 0;
    s.start();
  };

  // window.__uiAlerts[id] -> { show, hide } for the element with that id now, or undefined.
  window.__uiAlerts = new Proxy(
    {},
    {
      get: (_, id) => {
        const root = typeof id === "string" ? document.getElementById(id) : null;
        return root ? { show: (o) => show(root, o), hide: () => hide(root) } : undefined;
      },
    },
  );
})();
