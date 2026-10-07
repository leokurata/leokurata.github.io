/* =========================================================================
   Renders news from window.NEWS (see news-data.js).
   - Home page:    fills #news-latest with the single newest item.
   - Archive page: fills #news-archive with every item, one section per year.
   Language is taken from <html lang="…">.
   ========================================================================= */
(function () {
  var items = window.NEWS || [];
  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ja" ? "ja" : "en";

  function entry(it) {
    return (
      '<li class="entry">' +
        '<span class="entry-date">' + (it.date || "") + "</span>" +
        '<div><p class="entry-text">' + (it[lang] || it.en || "") + "</p></div>" +
      "</li>"
    );
  }

  var latest = document.getElementById("news-latest");
  if (latest) {
    latest.innerHTML = items.length ? '<ol class="entries">' + entry(items[0]) + "</ol>" : "";
    return;
  }

  var archive = document.getElementById("news-archive");
  if (archive) {
    var years = [];
    var byYear = {};
    items.forEach(function (it) {
      var y = it.year || String(it.date || "").slice(0, 4);
      if (!byYear[y]) { byYear[y] = []; years.push(y); }
      byYear[y].push(it);
    });
    archive.innerHTML = years.map(function (y) {
      return (
        '<section class="block dated">' +
          '<h2 class="block-title">' + y + "</h2>" +
          '<div class="block-body"><ol class="entries">' + byYear[y].map(entry).join("") + "</ol></div>" +
        "</section>"
      );
    }).join("");
  }
})();
