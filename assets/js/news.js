/* =========================================================================
   Renders news from window.NEWS (see news-data.js).
   - On the home page: fills #news-latest with the single newest item.
   - On the archive page: fills #news-archive with all items, grouped by year.
   Language is chosen from <html lang="…">.
   ========================================================================= */
(function () {
  var items = window.NEWS || [];
  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ja" ? "ja" : "en";

  function itemHTML(it) {
    var body = it[lang] || it.en || "";
    return (
      '<div class="edu">' +
        '<div class="edu-date">' + (it.date || "") + "</div>" +
        "<div><p class=\"edu-note\">" + body + "</p></div>" +
      "</div>"
    );
  }

  // Home page: latest item only.
  var latest = document.getElementById("news-latest");
  if (latest) {
    latest.innerHTML = items.length ? itemHTML(items[0]) : "";
    return;
  }

  // Archive page: all items, grouped by year.
  var archive = document.getElementById("news-archive");
  if (archive) {
    var html = "";
    var lastYear = null;
    items.forEach(function (it) {
      var y = it.year || String(it.date || "").slice(0, 4);
      if (y !== lastYear) {
        html += '<h3 class="sub">' + y + "</h3>";
        lastYear = y;
      }
      html += itemHTML(it);
    });
    archive.innerHTML = html || '<p class="edu-note">—</p>';
  }
})();
