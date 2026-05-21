import { iniciarSesionConEmail } from './supabase.js';

// Si ya está autenticado, evitar acceder a esta página de login
if (localStorage.getItem("loggedIn") === "true") {
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // Muestra un mensaje si el usuario fue redirigido
  var params = new URLSearchParams(window.location.search);
  if (params.has("redirect")) {
    var msgEl = document.getElementById("redirect-message");
    if (msgEl) {
      msgEl.textContent = "Inicia sesión para acceder a las características.";
      msgEl.style.display = "block";
    }
  }

  var form = document.getElementById("login-form");
  var errorMsg = document.getElementById("error-message");
  var submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      errorMsg.style.display = "none";
      submitBtn.disabled = true;
      submitBtn.textContent = "Cargando...";

      var email = document.getElementById("email").value;
      var password = document.getElementById("passwordview").value;

      const { data, error } = await iniciarSesionConEmail(email, password);

      if (error) {
        errorMsg.textContent = "Error: " + error;
        errorMsg.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.textContent = "Entrar";
      } else {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        /* Guardar el nombre del usuario obtenido desde Supabase */
        if (data && data.userName) {
          localStorage.setItem("userName", data.userName);
        }

        var redirect = params.get("redirect");
        location.href = redirect ? redirect : "index.html";
      }
    });
  }
});
