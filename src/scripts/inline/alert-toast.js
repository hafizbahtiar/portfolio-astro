(function () {
  const alertId = document.currentScript.dataset.alertId;
  const root = document.getElementById(alertId);
  if (root) {
    const panel = root.querySelector("[data-alert-panel]");
    const icon = root.querySelector("[data-alert-icon]");
    const titleEl = root.querySelector("[data-alert-title]");
    const messageEl = root.querySelector("[data-alert-message]");
    const closeBtn = root.querySelector("[data-alert-close]");

    const panelVariants = {
      success: ["border-emerald-500/40"],
      error: ["border-red-500/40"],
      warning: ["border-amber-400/40"],
      info: ["border-sky-400/40"],
    };

    const iconVariants = {
      success: [
        "border-emerald-500/40",
        "text-emerald-600",
        "dark:text-emerald-400",
      ],
      error: ["border-red-500/40", "text-red-600", "dark:text-red-400"],
      warning: ["border-amber-400/40", "text-amber-700", "dark:text-amber-300"],
      info: ["border-sky-400/40", "text-sky-600", "dark:text-sky-300"],
    };

    const allPanelClasses = Object.values(panelVariants).flat();
    const allIconClasses = Object.values(iconVariants).flat();

    let hideTimer = null;
    let remaining = 0;
    let startedAt = 0;
    const startTimer = () => {
      if (remaining <= 0 || hideTimer) return;
      startedAt = Date.now();
      hideTimer = window.setTimeout(hide, remaining);
    };
    // Hovering or focusing the toast pauses the countdown, so a long error can be read.
    const pauseTimer = () => {
      if (!hideTimer) return;
      clearTimeout(hideTimer);
      hideTimer = null;
      remaining = Math.max(1000, remaining - (Date.now() - startedAt));
    };
    root.addEventListener("mouseenter", pauseTimer);
    root.addEventListener("focusin", pauseTimer);
    root.addEventListener("mouseleave", startTimer);
    root.addEventListener("focusout", startTimer);

    const hide = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      remaining = 0;
      root.classList.remove("opacity-100", "translate-y-0");
      root.classList.add("opacity-0", "-translate-y-2");
      window.setTimeout(() => {
        root.classList.add("hidden");
      }, 240);
    };

    const show = (options = {}) => {
      const {
        type = "info",
        title = "Notification",
        message = "Action completed.",
        duration = 2200,
      } = options;

      if (panel) {
        panel.classList.remove(...allPanelClasses);
        panel.classList.add(...(panelVariants[type] || panelVariants.info));
      }

      if (icon) {
        icon.classList.remove(...allIconClasses);
        icon.classList.add(...(iconVariants[type] || iconVariants.info));
        icon.textContent = type.toUpperCase();
      }

      if (titleEl) titleEl.textContent = title;
      if (messageEl) messageEl.textContent = message;

      root.classList.remove("hidden", "opacity-0", "-translate-y-2");
      root.classList.add("opacity-100", "translate-y-0");

      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = null;
      // Long messages stay long enough to read (~50 ms a character, up to 15 s).
      remaining =
        duration > 0
          ? Math.max(duration, Math.min(15000, 1500 + `${title} ${message}`.length * 50))
          : 0;
      startTimer();
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", hide);
    }

    window.__uiAlerts = window.__uiAlerts || {};
    window.__uiAlerts[alertId] = { show, hide };
  }
})();
