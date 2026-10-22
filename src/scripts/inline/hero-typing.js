(function () {
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("hero-typed")) return;
  } catch (e) {
    return;
  }
  var d = document.documentElement;
  d.dataset.heroTyping = "pending";
  setTimeout(function () {
    if (d.dataset.heroTyping === "pending") delete d.dataset.heroTyping;
  }, 5000);
})();
