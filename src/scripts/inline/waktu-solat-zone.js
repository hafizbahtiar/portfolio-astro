(function () {
  var data = document.currentScript.dataset;
  try {
    const key = "waktu-solat-zone";
    if (data.pickedZone) localStorage.setItem(key, data.pickedZone);
    else {
      const saved = localStorage.getItem(key);
      if (saved && saved !== data.defaultZone && /^[A-Z]{3}\d{2}$/.test(saved))
        location.replace(`?zone=${saved}${location.hash}`);
    }
  } catch {
    // storage blocked: default zone
  }
})();
