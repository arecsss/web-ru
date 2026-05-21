(function () {
  var cards = document.querySelectorAll(".pg-card");
  var sections = document.querySelectorAll(".pg-seccion");
  var navLinks = document.querySelectorAll(".pg-nav-link");
  var emptyEl = document.getElementById("pgEmpty");
  var searchDesktop = document.getElementById("searchDesktop");
  var toggle = document.getElementById("pgCategoriesToggle");
  var panel = document.getElementById("pgCategoriesPanel");
  var mobileQuery = window.matchMedia("(max-width: 1100px)");

  function getScrollOffset() {
    var sidebar = document.querySelector(".pg-sidebar");
    var nav = document.querySelector(".nav-header");
    var h = 100;
    if (sidebar) h = Math.max(h, sidebar.offsetHeight + 16);
    if (nav) h = Math.max(h, nav.offsetHeight + 12);
    return h;
  }

  function buscar(texto) {
    texto = texto.toLowerCase().trim();
    var visibleCount = 0;
    var firstVisible = null;

    cards.forEach(function (card) {
      var nombre = card.textContent.toLowerCase();
      var match = texto === "" || nombre.includes(texto);
      card.style.display = match ? "" : "none";
      if (match) {
        visibleCount += 1;
        if (!firstVisible) firstVisible = card;
      }
    });

    sections.forEach(function (section) {
      var sectionCards = section.querySelectorAll(".pg-card");
      var hasVisible = false;
      sectionCards.forEach(function (card) {
        if (card.style.display !== "none") hasVisible = true;
      });
      section.classList.toggle("is-hidden", texto !== "" && !hasVisible);
    });

    if (emptyEl) {
      var showEmpty = texto !== "" && visibleCount === 0;
      emptyEl.classList.toggle("is-visible", showEmpty);
      emptyEl.hidden = !showEmpty;
    }

    if (texto !== "" && firstVisible) {
      var y =
        firstVisible.getBoundingClientRect().top +
        window.scrollY -
        getScrollOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (texto === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (searchDesktop) {
    searchDesktop.addEventListener("input", function () {
      buscar(this.value);
    });
  }

  function isMobileNav() {
    return mobileQuery.matches;
  }

  function setCategoriesOpen(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.classList.toggle("is-open", open);
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      if (!isMobileNav()) return;
      setCategoriesOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.querySelectorAll(".pg-nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isMobileNav()) setCategoriesOpen(false);
      });
    });

    document.addEventListener("click", function (e) {
      if (!isMobileNav() || !panel.classList.contains("is-open")) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      setCategoriesOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setCategoriesOpen(false);
    });

    function syncLayout() {
      if (!isMobileNav()) {
        setCategoriesOpen(false);
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncLayout);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(syncLayout);
    }

    syncLayout();
  }

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var activeId = "";

    function setActiveNav(id) {
      if (!id || id === activeId) return;
      activeId = id;
      navLinks.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === "#" + id,
        );
      });
    }

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      {
        rootMargin: "-" + getScrollOffset() + "px 0px -55% 0px",
        threshold: 0.05,
      },
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    if (location.hash) {
      var hashId = location.hash.replace("#", "");
      if (hashId) setActiveNav(hashId);
    }
  }
})();
