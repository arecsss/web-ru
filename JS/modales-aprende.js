function aprende_openModal(modalId) {
  document.getElementById("aprende-modal-overlay").style.display = "block";
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function aprende_closeModal() {
  document.getElementById("aprende-modal-overlay").style.display = "none";
  var modals = document.querySelectorAll(".aprende-modal");
  modals.forEach(function (modal) { modal.style.display = "none"; });
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("aprende-modal-overlay");
  if (overlay) {
    overlay.addEventListener("click", aprende_closeModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      aprende_closeModal();
    }
  });

  var filterButtons = document.querySelectorAll(".aprende-filter-btn");
  var cards = document.querySelectorAll(".aprende-card");
  var searchInput = document.getElementById("aprende-search");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) { btn.classList.remove("active"); });
      this.classList.add("active");

      var category = this.getAttribute("data-category");

      cards.forEach(function (card) {
        if (category === "todos" || card.getAttribute("data-category") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      var searchTerm = this.value.toLowerCase();
      cards.forEach(function (card) {
        var title = card.querySelector(".aprende-card-title").textContent.toLowerCase();
        var desc = card.querySelector(".aprende-card-desc").textContent.toLowerCase();

        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});