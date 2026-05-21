(function () {
  function buscar(texto) {
    var cards = document.querySelectorAll(".pg-card");
    texto = texto.toLowerCase();
    var firstVisible = null;

    cards.forEach(function (card) {
      var nombre = card.textContent.toLowerCase();
      if (nombre.includes(texto)) {
        card.style.display = "";
        if (!firstVisible) firstVisible = card;
      } else {
        card.style.display = "none";
      }
    });

    if (texto.trim() !== "" && firstVisible) {
      var yOffset = -120;
      var y =
        firstVisible.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (texto.trim() === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  var searchDesktop = document.getElementById("searchDesktop");
  if (searchDesktop) {
    searchDesktop.addEventListener("input", function () {
      buscar(this.value);
    });
  }
})();