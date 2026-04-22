(function () {
  var localTheme = localStorage.getItem("theme");
  var sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (localTheme === "dark-mode" || (!localTheme && sysTheme)) {
    document.body.classList.add("dark-mode");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  var toggleNav = document.getElementById("dark-mode-toggle-nav");
  if (document.body.classList.contains("dark-mode")) {
    if (toggleNav) toggleNav.checked = true;
  }

  if (toggleNav) {
    toggleNav.addEventListener("change", function (e) {
      var isDark = e.target.checked;
      if (isDark) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
      }
    });
  }

  var logged = localStorage.getItem("loggedIn") === "true";
  var authButtonsNav = document.getElementById("auth-buttons-nav");

  if (logged && authButtonsNav) {
    var isLogoutLink = authButtonsNav.querySelector(".logout-link, #logout-btn-header");
    if (!isLogoutLink) {
      authButtonsNav.innerHTML = '<a href="#" id="logout-btn-header" class="btn-text logout-link">Cerrar sesión</a>';
      var logoutBtn = document.getElementById("logout-btn-header");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("loggedIn");
          location.reload();
        });
      }
    }
  }
});