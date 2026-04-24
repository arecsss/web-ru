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
  var userEmail = localStorage.getItem("userEmail") || "";
  var authButtonsNav = document.getElementById("auth-buttons-nav");

  if (logged && authButtonsNav) {
    var isLogoutLink = authButtonsNav.querySelector(".logout-link, #logout-btn-header");
    if (!isLogoutLink) {
      var buttonsHTML = "";
      
      var normalizedEmail = userEmail.toLowerCase().trim();
      // Si es el admin (jibarracuervo@gmail.com), agregar botón Admin
      if (normalizedEmail === "jibarracuervo@gmail.com") {
        buttonsHTML += '<a href="admin.html" class="btn-text admin-link" style="color: #ff6b00; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-right: 10px;">Admin</a>';
      }
      
      buttonsHTML += '<a href="#" id="logout-btn-header" class="btn-text logout-link">Cerrar sesión</a>';
      authButtonsNav.innerHTML = buttonsHTML;
      
      var logoutBtn = document.getElementById("logout-btn-header");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userName");
          location.reload();
        });
      }
    }
  }
});