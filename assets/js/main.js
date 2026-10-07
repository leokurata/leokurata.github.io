/* Small progressive enhancements. Every page works without this file. */
(function () {
  "use strict";

  /* current year in the footer */
  var y = document.querySelector("[data-year]");
  if (y) { y.textContent = new Date().getFullYear(); }

  /* fade sections in as they scroll into view (see the end of style.css) */
  var sections = document.querySelectorAll(".intro, .page-head, .block");
  function show(el) { el.classList.add("in"); }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    sections.forEach(function (el) { io.observe(el); });
  } else {
    sections.forEach(show);
  }

  /* The site used to be a single page. Send old deep links such as
     /#publications or /ja/#teaching to the page that now holds them. */
  if (document.body.classList.contains("is-home")) {
    var moved = {
      research:      "research.html",
      publications:  "research.html#publications",
      working:       "research.html#working",
      presentations: "presentations.html",
      teaching:      "teaching.html",
      education:     "education.html"
    };
    var target = moved[location.hash.slice(1)];
    if (target) { location.replace(target); }
  }
})();
