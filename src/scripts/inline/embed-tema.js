(function () {
  var tema = document.currentScript.dataset.tema;
  if (tema === "gelap") document.documentElement.classList.add("dark");
  if (tema === "terang") document.documentElement.classList.remove("dark");
})();
