(function () {
  var track = document.getElementById("carouselTrack");
  if (!track) return;

  var cards = track.querySelectorAll(".sys-news-card");
  var prevBtn = document.getElementById("carouselPrev");
  var nextBtn = document.getElementById("carouselNext");
  var dotsContainer = document.getElementById("carouselDots");
  var current = 0;
  var autoTimer;

  function getPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getPerView());
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    var total = getMaxIndex() + 1;
    for (var i = 0; i < total; i++) {
      var dot = document.createElement("span");
      dot.className = "sys-news-dot" + (i === current ? " active" : "");
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", function () {
        current = parseInt(this.getAttribute("data-index"), 10);
        update();
        restartAuto();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function update() {
    var perView = getPerView();
    var gap = 24;
    var cardEl = cards[0];
    var cardW = cardEl.offsetWidth + gap;
    track.style.transform = "translateX(-" + (current * cardW) + "px)";

    if (dotsContainer) {
      var allDots = dotsContainer.querySelectorAll(".sys-news-dot");
      allDots.forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
    }
  }

  function next() {
    current = current >= getMaxIndex() ? 0 : current + 1;
    update();
  }

  function prev() {
    current = current <= 0 ? getMaxIndex() : current - 1;
    update();
  }

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });

  buildDots();
  update();
  restartAuto();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (current > getMaxIndex()) current = getMaxIndex();
      buildDots();
      update();
    }, 150);
  });
})();

(function () {
  var items = document.querySelectorAll(".sys-card-reveal[data-reveal]");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
  );
  items.forEach(function (el) { obs.observe(el); });
})();